import routes from '../routes';
import User from '../models/User';

export const getjoin = (req, res) => {
  res.render('join', { pageTitle: 'join' });
};

export const postjoin = async (req, res) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password != password2) {
    res.status(400);
    res.render('join', { pageTitle: 'join' });
  } else {
    // To Do: Register User
    try {
      const user = await User({ name, email });
      await User.register(user, password);
    } catch (error) {
      console.log(error);
    }
    res.redirect(routes.home);
  }
};

export const getlogin = (req, res) => {
  //To Do Process Log Out
  res.render('login', { pageTitle: 'login' });
};

export const postlogin = (req, res) => {
  const {
    body: { email, password },
  } = req;
  res.redirect(routes.home);
};

export const logout = (req, res) =>
  res.render('logout', { pageTitle: 'logout' });
export const user_detail = (req, res) =>
  res.render('user_detail', { pageTitle: 'user_detail' });
export const edit_profile = (req, res) =>
  res.render('edit_profile', { pageTitle: 'edit_profile' });
export const change_password = (req, res) =>
  res.render('change_password', { pageTitle: 'change_password' });
