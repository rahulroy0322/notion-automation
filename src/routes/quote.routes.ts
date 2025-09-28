import { Router } from 'express';

import { createQuoteController } from '../controllers/quote.controller';

const quoteRouter: Router = Router();

quoteRouter.post('/', createQuoteController);

export default quoteRouter;
