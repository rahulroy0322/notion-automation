import type { RequestHandler } from 'express';

import { STATUS } from '../constants/status.constants';
import { DBError, ValueError } from '../error/app.error';
import logger from '../logger/log';
import { createQuoteSchema } from '../schema/quote.schema';
import { createPageToQuoteDb } from '../services/notion.service';

const createQuoteController: RequestHandler = async (req, res) => {
  const {
    warning,
    error,
    value: body,
  } = createQuoteSchema.validate(req.body, {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true,
  });

  if (warning) {
    logger.warn(warning, 'warning in create quote schema');
  }
  if (error) {
    logger.error(error, 'warning in create quote schema');
    throw new ValueError(error.details.map((e) => e.message).join(', '));
  }

  const newQuote = await createPageToQuoteDb(body.quote, body.author);

  if (!newQuote.success) {
    logger.error({ error: newQuote.error }, 'Error in creating new Quote');
    throw new DBError((newQuote.error as Error)?.message ?? newQuote.error);
  }

  res.status(STATUS.CREATED).json({
    success: true,
    data: {
      id: newQuote.data.id,
    },
  });
};

export { createQuoteController };
