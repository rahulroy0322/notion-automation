import type { RequestHandler } from 'express';

import type { QuoteType } from '../@types/notion-db.types';
import { NOTION_QUOTE_DB_KEY } from '../config/notion.config';
import { STATUS } from '../constants/status.constants';
import { DBError, ServerError } from '../error/app.error';
import logger from '../logger/log';
import {
  createPageToDailyDb,
  fetchAllFromNotion,
} from '../services/notion.service';

const dailyController: RequestHandler = async (_req, res) => {
  const data = await fetchAllFromNotion<QuoteType>(NOTION_QUOTE_DB_KEY);

  if (!data.success) {
    logger.error({ error: data.error }, 'Error in gatting pages from quote db');
    throw new DBError((data.error as Error)?.message ?? data.error);
  }

  const quotes = data.data;

  const toDayQuoteIndex = Math.floor(Math.random() * quotes.length);

  const toDayQuote = quotes[toDayQuoteIndex];

  if (!toDayQuote) {
    logger.error(
      { toDayQuote, toDayQuoteIndex, quotesLength: quotes.length },
      'Error random index generation'
    );
    throw new ServerError();
  }

  const newDailyQuote = await createPageToDailyDb(toDayQuote.id, {
    cover: toDayQuote.cover,
  });

  if (!newDailyQuote.success) {
    logger.error(
      { error: newDailyQuote.error },
      'Error in creating new page in daily db'
    );
    throw new DBError(
      (newDailyQuote.error as Error)?.message ?? newDailyQuote.error
    );
  }

  res.status(STATUS.CREATED).json({
    success: true,
    data: {
      id: newDailyQuote.data.id,
    },
  });
};

export { dailyController };
