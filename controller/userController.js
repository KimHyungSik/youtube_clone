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

export const user_detail = (req, res) =>
  res.render('user_detail', { pageTitle: 'user_detail' });

export const me = (req, res) => {
  console.log(req.loggedUser);
  res.render('user_detail', {
    pageTitle: 'user_detail',
    loggedUser: req.loggedUser,
  });
};

export const edit_profile = (req, res) =>
  res.render('edit_profile', { pageTitle: 'edit_profile' });
export const change_password = (req, res) =>
  res.render('change_password', { pageTitle: 'change_password' });
