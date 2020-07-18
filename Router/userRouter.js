import express from 'express';
import routes from '../routes';
import {
  user,
  user_detail,
  get_edit_profile,
  getchange_password,
  post_edit_profile,
  postChange_password,
} from '../controller/userController';
import { onlyPrivate, uploadImg } from '../middleware';

const userRouter = express.Router();

userRouter.get(routes.edit_profile(), onlyPrivate, get_edit_profile);
userRouter.post(
  routes.edit_profile(),
  onlyPrivate,
  uploadImg,
  post_edit_profile
);

userRouter.get(routes.change_password, onlyPrivate, getchange_password);
userRouter.post(routes.change_password, postChange_password);
userRouter.get(routes.user_detail(), user_detail);

export default userRouter;
