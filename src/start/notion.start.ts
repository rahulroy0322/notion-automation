import { Client } from '@notionhq/client';

import { NOTION_API_KEY } from '../config/notion.config';

const notion = new Client({
  auth: NOTION_API_KEY,
});

export { notion };
