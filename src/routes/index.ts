import { Router } from 'express';

import dailyRouter from './daily.routes';
import quoteRouter from './quote.routes';

const apiRouter: Router = Router();

apiRouter.use(dailyRouter);
apiRouter.use('/quote', quoteRouter);

export default apiRouter;
