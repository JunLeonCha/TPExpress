import { Server } from "socket.io";

const createSocketServer = (httpServer) => {
    const io = new Server(httpServer);

    let i;
    let users = [];
    let messages = [];
    let typingUsers = [];

    io.on("connection", function (socket) {
        let loggedUser;
        for (i = 0; i < users.length; i++) {
            socket.emit("user-login", users[i]);
        }

        for (i = 0; i < messages.length; i++) {
            if (messages[i].username !== undefined) {
                messages[i].timestamp = new Date(messages[i].timestamp).toISOString();
                socket.emit("chat-message", messages[i]);
            } else {
                socket.emit("service-message", messages[i]);
            }
        }

        socket.on("disconnect", function () {
            if (loggedUser) {
                let serviceMessage = {
                    text: loggedUser.username + " vient de se déconnecter.",
                    type: "logout",
                };
                socket.broadcast.emit("service-message", serviceMessage);
                let userIndex = users.indexOf(loggedUser);
                if (userIndex !== -1) {
                    users.splice(userIndex, 1);
                }

                messages.push(serviceMessage);
                io.emit("user-logout", loggedUser);
                let typingUserIndex = typingUsers.indexOf(loggedUser);
                if (typingUserIndex !== -1) {
                    typingUsers.splice(typingUserIndex, 1);
                }
            }
        });

        socket.on("user-login", function (user, callback) {
            let userIndex = -1;
            for (i = 0; i < users.length; i++) {
                if (users[i].username === user.username) {
                    userIndex = i;
                }
            }
            if (user !== undefined && userIndex === -1) {
                loggedUser = user;
                users.push(loggedUser);
                let userServiceMessage = {
                    text: loggedUser.username + " vient de se connecter.",
                    type: "login",
                };
                let broadcastedServiceMessage = {
                    text: loggedUser.username + " vient de se connecter.",
                    type: "login",
                };
                socket.emit("service-message", userServiceMessage);
                socket.broadcast.emit("service-message", broadcastedServiceMessage);
                messages.push(broadcastedServiceMessage);
                io.emit("user-login", loggedUser);
                console.log(loggedUser)
                callback(true);
            } else {
                callback(false);
            }
        });

        const forbiddenWords = ["Putain", "Merde", "Connard", "Fais chier"];

        function censorMessage(message) {
            let censoredMessage = message;
            forbiddenWords.forEach((word) => {
                const regexp = new RegExp(word, "gi");
                censoredMessage = censoredMessage.replace(
                    regexp,
                    "*".repeat(word.length)
                );
            });
            return censoredMessage;
        }
        
        socket.on("chat-message", function (message) {
            if (loggedUser == undefined) {
                return
            } else {
                message.username = loggedUser.username;
                message.timestamp = new Date().toISOString();
                const censoredMessage = censorMessage(message.text);
                message.text = censoredMessage;
                io.emit("chat-message", message);
                messages.push(message);
                if (messages.length > 150) {
                    messages.splice(0, 1);
                }
            }
        });
        socket.on("start-typing", function () {
            if (typingUsers.indexOf(loggedUser) === -1) {
                typingUsers.push(loggedUser);
            }
            io.emit("update-typing", typingUsers);
        });
        socket.on("stop-typing", function () {
            let typingUserIndex = typingUsers.indexOf(loggedUser);
            if (typingUserIndex !== -1) {
                typingUsers.splice(typingUserIndex, 1);
            }
            io.emit("update-typing", typingUsers);
        });
    });

    return io;
}

export default createSocketServer