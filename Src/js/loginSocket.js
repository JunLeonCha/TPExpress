let socket = io();

//Gestion des événements
//Connexion de l'utilisateur
//Uniquement si le username n'est pas vide et n'existe pas encore
const submitUsername = document.querySelector("#form-username");
submitUsername.addEventListener("submit", function (e) {
    e.preventDefault();
    const usernameInput = document.querySelector("#username");
    const username = usernameInput.value.trim();
    console.log(username)
    if (username.length > 0) {
        const user = { username: username };
        socket.emit("user-login", user, function (success) {
            if (success) {
                window.location.assign("/chat")
            }
        });
    }
});