import userModel from "../Models/UserModel.js"

class UserController {
    addUsers(req, res) {
        userModel.addUser(req.body);
        console.log(req.body)
        res.render("../Src/Render/Pages/socket/socket.ejs", { user: req.body.pseudo })
    }
    getUsers(req, res) {
        res.render("index.ejs", { users: userModel.getUsers() })
    }
    deleteUsers(req, res) {
        res.render("index.ejs", { users: userModel.deleteUsers() })
    }
}

export default new UserController();