import routes from '../routes.js';
import Video from '../models/Video';

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render('home', { pageTitle: 'Home', videos });
  } catch (error) {
    console.log(error);
    res.render('home', { pageTitle: 'Home', videos: [] });
  }
};

//Search Video
export const search = async (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  let video_ = [];
  try {
    //MongoDB regex search type
    //find words included in title
    //opions => i == insensitive(not case-insensitive)
    video_ = await Video.find({
      title: { $regex: searchingBy, $options: 'i' },
    });
  } catch (error) {
    console.log(`${error}, Search Error`);
  }
  res.render('search', { pageTitle: 'Search', searchingBy, video_ });
};

//Upload
export const getupload = (req, res) =>
  res.render('upload', { pageTitle: 'upload' });

export const postupload = async (req, res) => {
  console.log(req);
  const {
    body: { title, description },
    file: { path },
  } = req;
  //Create to MongoDB
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
  });
  console.log(newVideo);
  //To Do: Upload and save video
  res.redirect(routes.video_detail(newVideo.id));
};

//Detail
export const video_detail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video_ = await Video.findById(id);
    console.log(video_);
    res.render('video_detail', { pageTitle: `${video_.title} Detail`, video_ });
  } catch (error) {
    res.redirect(routes.home);
  }
};

//Edit
export const get_edit_video = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video_ = await Video.findById(id);
    res.render('edit_video', { pageTitle: `Edit ${video_.title}`, video_ });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const post_edit_video = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  console.log(req);
  try {
    //Update to data in MongoDB
    await Video.findOneAndUpdate({ _id: id }, { $set: { title, description } });
    res.redirect(routes.video_detail(id));
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const delete_video = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    //Delete to data in MongoDB
    await Video.findOneAndDelete({ _id: id });
  } catch (error) {
    console.log(`${error}, delete Error`);
  }
  res.redirect(routes.home);
};