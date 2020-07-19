import routes from '../routes';
import User from '../models/User';
import passport from 'passport';

//=============================Join=============================
export const getjoin = (req, res) => {
  res.render('join', { pageTitle: 'join' });
};

export const postjoin = async (req, res, next) => {
  const avatarUrl = 'uploads\\imgs\\firsting_img.PNG';
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password != password2) {
    res.status(400);
    res.render('join', { pageTitle: 'join' });
  } else {
    // To Do: Register User
    try {
      const user = await User({
        name,
        email,
        avatarUrl,
      });
      await User.register(user, password, avatarUrl);
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
    const user = await User.findById(id).populate('videos');
    console.log(user);
    res.render('user_detail', { pageTitle: 'User Detail', user });
  } catch (error) {
    res.redirect(routes.home);
  }
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
    file,
  } = req;
  try {
    await User.findOneAndUpdate(
      { _id: id },
      {
        $set: { avatarUrl: file ? file.path : req.user.avatarUrl, name, email },
      }
    );
    res.redirect(routes.user_detail(id));
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getchange_password = (req, res) =>
  res.render('change_password', { pageTitle: 'change_password' });

export const postChange_password = async (req, res) => {
  console.log(req);
  const {
    user: { _id },
    body: { oldPasswod, newPassword, newPassword1 },
  } = req;
  try {
    if (newPassword !== newPassword1) {
      res.status(400);
      res.redirect(`/users/${routes.change_password}`);
      return;
    }
    console.log(_id);
    await req.user.changePassword(oldPasswod, newPassword);
    res.redirect(routes.edit_profile(_id));
  } catch (error) {
    res.render(routes.change_password);
  }
};
