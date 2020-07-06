import express from "express";
import routes from "../routes";
import {
  getupload,
  postupload,
  video_detail,
  post_edit_video,
  delete_video,
  get_edit_video,
} from "../controller/videoControllers";
import { uploadVideo } from "../middleware";

const videoRouter = express.Router();

//Upload
videoRouter.get(routes.upload, getupload);
videoRouter.post(routes.upload, uploadVideo, postupload);

//Detail
videoRouter.get(routes.video_detail(), video_detail);

//Edit
videoRouter.get(routes.edit_video(), get_edit_video);
videoRouter.post(routes.edit_video(), post_edit_video);

//Delete
videoRouter.get(routes.delete_video(), delete_video);

export default videoRouter;
