document.addEventListener("DOMContentLoaded", function (event) {
    console.log("Hello, World!");
    var usernameElement = document.getElementById("script--credential-username");
    var showButton = document.getElementById("script--button-show");
    var urlElement = document.getElementById("script--credential-URL");
    var passwordElement = document.getElementById("script--credential-pw");
    var appendButton = document.getElementById("script--button-append");
    var footerButton = document.getElementById("script--button-footer");
    if (appendButton) {
        appendButton.addEventListener("click", function () {
            if (!urlElement || !usernameElement || !passwordElement) {
                console.log("One or more elements are missing, returning out of function");
                return;
            }
            var url = urlElement.value;
            var username = usernameElement.value;
            var password = passwordElement.value;
            var hidden = true;
            var credential = {
                id: Date.now().toString(),
                url: url,
                username: username,
                password: password,
                hidden: hidden,
            };
            console.log(credential);
        });
    }
});
