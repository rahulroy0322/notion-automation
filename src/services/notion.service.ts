import type { CreatePageParameters } from '@notionhq/client';

import type {
  CreateQailyQuoteType,
  QuoteType,
} from '../@types/notion-db.types';
import {
  NOTION_DAILY_DB_KEY,
  NOTION_QUOTE_DB_KEY,
} from '../config/notion.config';
import { notion } from '../start/notion.start';

const fetchAllFromNotion = async <T extends Record<string, unknown>>(
  dbId: string
) => {
  let allPages = [] as T[];
  let hasMore = true;
  let nextCursor: string | undefined;

  try {
    while (hasMore) {
      const response = await notion.databases.query({
        database_id: dbId,
        start_cursor: nextCursor,
        page_size: 100,
      });

      allPages = allPages.concat(response.results as unknown as T[]);
      hasMore = response.has_more;

      nextCursor = response.next_cursor ?? undefined;
    }
    return {
      success: true,
      data: allPages,
    } as const;
  } catch (error) {
    return {
      success: false,
      error,
    } as const;
  }
};

const createPageToNotion = async <T extends Record<string, unknown>>(
  dbId: string,
  properties: CreatePageParameters['properties'],
  {
    cover = null,
    icon = null,
  }: {
    cover?: CreatePageParameters['cover'];
    icon?: CreatePageParameters['icon'];
  } = { cover: null, icon: null }
) => {
  try {
    const res = (await notion.pages.create({
      parent: {
        database_id: dbId,
        type: 'database_id',
      },
      cover,
      icon,
      properties,
    })) as unknown as T;

    return {
      success: true,
      data: res,
    } as const;
  } catch (error) {
    return {
      success: false,
      error,
    } as const;
  }
};

const createPageToQuoteDb = (quote: string, author: string) =>
  createPageToNotion<QuoteType>(NOTION_QUOTE_DB_KEY, {
    Author: {
      type: 'rich_text',
      rich_text: [
        {
          type: 'text',
          text: { content: author },
        },
      ],
    },
    Quote: {
      type: 'title',
      title: [
        {
          type: 'text',
          text: {
            content: quote,
          },
        },
      ],
    },
  });

const createPageToDailyDb = (
  quoteId: string,
  options: {
    cover?: CreatePageParameters['cover'];
    icon?: CreatePageParameters['icon'];
  } = { cover: null, icon: null }
) =>
  createPageToNotion<CreateQailyQuoteType>(
    NOTION_DAILY_DB_KEY,
    {
      quote: {
        type: 'relation',
        relation: [{ id: quoteId }],
      },
      ' ': {
        type: 'title',
        title: [
          {
            type: 'text',
            text: {
              content: 'Quote Of the Day',
            },
          },
        ],
      },
    },
    options
  );

export { fetchAllFromNotion, createPageToDailyDb, createPageToQuoteDb };
