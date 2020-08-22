module.exports = (app) => {

    const user = require('../controllers/userController')

    app.route('/users')
        .get(user.allUsers)
        .post(user.postUser)

    
    app.route('/user/:userId')
        .get(user.oneUser)
        .put(user.updateUser)
        .delete(user.deleteUser)
}