import mongoose from 'mongoose';
import passportLoclMongoose from 'passport-local-mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  facebook: Number,
  githubId: Number,
});

UserSchema.plugin(passportLoclMongoose, { usernameField: 'email' });

const model = mongoose.model('User', UserSchema);

export default model;
