class UserModel {
    constructor() {
        this.users = []
    }

    addUser(user) {
        this.users.push(user)
    }

    getUsers() {
        return this.users;
    }
}
export default new UserModel()