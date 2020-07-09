import routes from '../routes';
import User from '../models/User';
import passport from 'passport';

//=============================Join=============================
export const getjoin = (req, res) => {
  res.render('join', { pageTitle: 'join' });
};

export const postjoin = async (req, res, next) => {
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
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.join);
    }
  }
};

//=============================Login=============================
export const getlogin = (req, res) => {
  //To Do Process Log Out
  res.render('login', { pageTitle: 'login' });
};

export const postlogin = passport.authenticate('local', {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

//==========================================================
export const logout = (req, res) => {
  req.logout();
  req.session.destroy((err) => {
    res.redirect(routes.home);
  });
};

export const user_detail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id);
    res.render('user_detail', { pageTitle: 'User Detail', user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const me = (req, res) => {
  console.log(req.loggedUser);
  res.render('user_detail', {
    pageTitle: 'user_detail',
    loggedUser: req.loggedUser,
  });
};

export const get_edit_profile = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user_ = await User.findById(id);
    console.log(user_);
    res.render('edit_profile', { pageTitle: `${user_.id} edit`, user_ });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const post_edit_profile = async (req, res) => {
  console.log(req);
  const {
    params: { id },
    body: { name, email },
    file: { path },
  } = req;
  try {
    await User.findOneAndUpdate(
      { _id: id },
      { $set: { avatarUrl: path, name, email } }
    );
    res.redirect(routes.user_detail(id));
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const change_password = (req, res) =>
  res.render('change_password', { pageTitle: 'change_password' });
