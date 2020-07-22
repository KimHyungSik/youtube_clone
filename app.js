import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { localsMiddleware } from './middleware';
import routes from './routes';
import bodyParser from 'body-parser';
import apiRouter from './Router/apiRouter';
import userRouter from './Router/userRouter';
import videoRouter from './Router/videoRouter';
import globalRouter from './Router/globalRouter';
import './passport';

const app = express();

const CokieStore = MongoStore(session);

app.set('view engine', 'pug');
// app.set("view engine", "ejs");
// app.engine("html", require("ejs").renderFile);

app.use(helmet());
app.use('/uploads', express.static('uploads'));
app.use('/static', express.static('static'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.RANDOM_KEY,
    resave: true,
    saveUninitialized: false,
    store: new CokieStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware); //locals변수로 전역 변수 선언_middleware.js확인

app.use(routes.user, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.home, globalRouter);
app.use(routes.api, apiRouter);

export default app;
