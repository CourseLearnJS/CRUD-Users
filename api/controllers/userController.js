const mongoose = require('mongoose');
const User = mongoose.model('User');


exports.allUsers = (req, res) => {
    User.find({}, (err, user) => {
        if (err)
           res.status(400).json('Error:' + err);
        res.json(user);
      });
  };
  
  
  
  
  exports.postUser = (req, res) => {
    const newUser = new User(req.body);
    newUser.save( (err, user) => {
        if (err)
          res.status(400).json('Error:' + err);
        res.json(user);
    });
  };
  
  
  exports.oneUser = (req, res) => {
    User.findById(req.params.userId, function(err, user) {
      if (err)
        res.status(400).json('Error:' + err);
      res.json(user);
    });
  };
  
  
  exports.updateUser = (req, res) => {
    User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, (err, updatedUser) => {
      if (err)
        res.status(400).json('Error:' + err);
      updatedUser.save( (error, user) => {
        if (error)
          res.status(400).json('Error:' + error);
        res.json(user);
     });
    });
  };
  
  
  exports.deleteUser = (req, res) => {
  
    User.deleteOne({_id: req.params.userId}, (err, user) => {
      if (err)
        res.status(400).json('Error:' + err);
      res.json({ message: 'User deleted' });
    });
  };
  