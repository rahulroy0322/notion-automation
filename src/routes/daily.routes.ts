import { Router } from 'express';

import { dailyController } from '../controllers/daily.controller';

const dailyRouter: Router = Router();

dailyRouter.get('/random', dailyController);

export default dailyRouter;
