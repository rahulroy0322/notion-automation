import type { CreatePageParameters } from '@notionhq/client';

type QuoteType = {
  object: 'page';
  id: string;
  created_time: string;
  last_edited_time: string;
  // TODO !
  cover: null | {
    type: 'external';
    external: { url: string };
  };
  icon: null | { type: 'emoji'; emoji: '😅' };
  parent: {
    type: string;
    database_id: string;
  };
  properties: {
    Author: {
      id: string;
      type: string;
      rich_text: {
        type: string;
        text: { content: string; link: null | string };
        plain_text: string;
        href: null;
      }[];
    };
    Quote: {
      id: string;
      type: string;
      title: {
        type: string;
        text: { content: string; link: null | string };
        plain_text: string;
        href: null;
      }[];
    };
  };
  url: string;
  public_url: null | string;
};

type CreateQailyQuoteType = {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: { object: string; id: string };
  last_edited_by: { object: string; id: string };
  cover: CreatePageParameters['cover'];
  icon: CreatePageParameters['icon'];
  parent: {
    type: string;
    database_id: string;
  };
  archived: false;
  in_trash: false;
  is_locked: false;
  properties: {
    thought: {
      id: string;
      type: string;
      formula: { type: string; string: string };
    };
    quote: {
      id: string;
      type: string;
      relation: [{ id: string }];
      has_more: boolean;
    };
    'Created At': {
      id: string;
      type: string;
      created_time: string;
    };
    author: {
      id: string;
      type: string;
      formula: { type: string; string: string };
    };
    ' ': { id: 'title'; type: 'title'; title: [] };
  };
  url: string;
  public_url: null;
  request_id: string;
};

export type { QuoteType, CreateQailyQuoteType };
