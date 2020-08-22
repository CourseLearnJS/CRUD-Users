const bcrypt = require('bcryptjs')
const mongoose = require('mongoose');
const { isEmail } = require('validator');
const Schema = mongoose.Schema;
const saltRounds = 10;

const UserSchema = new Schema({
    username: {
        type: String, 
        validate: [isEmail, 'Invalid email'],
        createIndexes: { unique: true },
        required: "Enter the username please."
    },
    password : {
        type: String,
        minlength: 6,
        required: "Enter password please."
    },
},  {timestamps: true})


UserSchema.pre('save', async function save(next) {
   
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      this.password = await bcrypt.hash(this.password, salt);
      return next();
    } catch (err) {
      return next(err);
    }
  });

  
UserSchema.methods.validatePassword = async function validatePassword(data) {
    return bcrypt.compare(data, this.password);
  };

module.exports = mongoose.model('User', UserSchema)