import express from 'express';
import routes from '../routes';
import {
  user,
  user_detail,
  edit_profile,
  change_password,
} from '../controller/userController';

const userRouter = express.Router();

userRouter.get(routes.edit_profile, edit_profile);
userRouter.get(routes.change_password, change_password);
userRouter.get(routes.user_detail(), user_detail);

export default userRouter;
