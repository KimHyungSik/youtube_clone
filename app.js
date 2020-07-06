import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { localsMiddleware } from './middleware';
import routes from './routes';
import bodyParser from 'body-parser';
import userRouter from './Router/userRouter';
import videoRouter from './Router/videoRouter';
import globalRouter from './Router/globalRouter';

const app = express();

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
app.use(localsMiddleware); //locals변수로 전역 변수 선언_middleware.js확인

app.use(routes.user, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.home, globalRouter);

export default app;
