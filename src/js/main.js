document.addEventListener("DOMContentLoaded", function (event) {
    var credentials = JSON.parse(localStorage.getItem('credentials') || '[]');
    var EventListener = /** @class */ (function () {
        function EventListener(credential) {
            this.credential = credential;
        }
        // This is an instance method, not static
        EventListener.prototype.addListenerShowButton = function () {
            var _this = this;
            var showButtonId = "generated-button-show-".concat(this.credential.id);
            var passwordField = document.getElementById("generated-field-pw-".concat(this.credential.id));
            var showButton = document.getElementById(showButtonId);
            if (!passwordField) {
                return;
            }
            showButton === null || showButton === void 0 ? void 0 : showButton.addEventListener("click", function () {
                if (passwordField.type === 'password') {
                    passwordField.type = 'text';
                    _this.credential.hidden = false;
                }
                else {
                    passwordField.type = 'password';
                    _this.credential.hidden = true;
                }
                saveCredentials();
            });
        };
        EventListener.prototype.addListenerDeleteButton = function () {
            var _this = this;
            var deleteButtonId = "generated-button-delete-".concat(this.credential.id);
            var deleteButton = document.getElementById(deleteButtonId);
            deleteButton === null || deleteButton === void 0 ? void 0 : deleteButton.addEventListener("click", function () {
                var listItem = document.getElementById(_this.credential.id);
                listItem === null || listItem === void 0 ? void 0 : listItem.remove();
                credentials = credentials.filter(function (cred) { return cred.id !== _this.credential.id; });
                saveCredentials();
            });
        };
        EventListener.prototype.addListenerPasswordField = function () {
            var _this = this;
            var passwordField = document.getElementById("generated-field-pw-".concat(this.credential.id));
            if (!passwordField) {
                return;
            }
            passwordField.addEventListener('keyup', function () {
                _this.credential.password = passwordField.value;
                console.log(passwordField.value);
                saveCredentials();
            });
        };
        return EventListener;
    }());
    var footerButton = document.getElementById("script--button-footer");
    var cards = document.getElementsByClassName("cards");
    var card = cards[0];
    card.style.flexDirection = 'row';
    footerButton === null || footerButton === void 0 ? void 0 : footerButton.addEventListener('click', function () {
        if (card.style.flexDirection === "row") {
            card.style.flexDirection = "row-reverse"; // Change the flex direction here
        }
        else {
            card.style.flexDirection = 'row';
        }
    });
    var showAllButton = document.getElementById("script--button-show-all");
    console.log('check');
    showAllButton === null || showAllButton === void 0 ? void 0 : showAllButton.addEventListener('click', function () {
        console.log('clicked');
        credentials.forEach(function (credential) {
            changeInputType(credential);
        });
    });
    var showButton = document.getElementById("script--button-show");
    showButton === null || showButton === void 0 ? void 0 : showButton.addEventListener('click', function () {
        if (!passwordElement) {
            return;
        }
        if (passwordElement.type === "text") {
            passwordElement.type = "password";
        }
        else {
            passwordElement.type = "text";
        }
    });
    function changeInputType(credential) {
        var passwordField = document.getElementById("generated-field-pw-".concat(credential.id));
        if (!passwordField) {
            return;
        }
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            credential.hidden = false;
        }
        else {
            passwordField.type = 'password';
            credential.hidden = true;
        }
        saveCredentials();
    }
    document.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            initiateCredential();
            console.log('test');
        }
    });
    var appendButton = document.getElementById("script--button-append");
    appendButton === null || appendButton === void 0 ? void 0 : appendButton.addEventListener("click", function () {
        initiateCredential();
    });
    function saveCredentials() {
        localStorage.setItem('credentials', JSON.stringify(credentials));
    }
    var usernameElement = document.getElementById("script--credential-username");
    var urlElement = document.getElementById("script--credential-URL");
    var passwordElement = document.getElementById("script--credential-pw");
    function initiateCredential() {
        if (!urlElement || !usernameElement || !passwordElement) {
            return;
        }
        var urlValue = urlElement.value;
        var usernameValue = usernameElement.value;
        var passwordValue = passwordElement.value;
        if (urlValue === '' || usernameValue === '' || passwordValue === '') {
            return;
        }
        var url = urlValue;
        var username = usernameValue;
        var password = passwordValue;
        var hidden = true;
        var credential = {
            id: Date.now().toString(),
            url: url,
            username: username,
            password: password,
            hidden: hidden,
        };
        credentials.push(credential);
        createCredential(credential);
        saveCredentials();
        urlValue = '';
        usernameValue = '';
        passwordValue = '';
        //console.log(credentials);
    }
    function createCredential(credential) {
        var ulElement = document.getElementById("script--credentials-ul");
        var liElement = document.createElement('li');
        liElement.id = credential.id;
        ulElement === null || ulElement === void 0 ? void 0 : ulElement.appendChild(liElement);
        var list = document.getElementById(credential.id);
        var divElementHead = document.createElement("div");
        divElementHead.className = "credential-field-head";
        var spanElement = document.createElement('span');
        spanElement.innerHTML = credential.username;
        var anchorElement = document.createElement('a');
        anchorElement.innerHTML = credential.url;
        anchorElement.target = "_blank";
        anchorElement.href = credential.url.startsWith('http') ? credential.url : "https://".concat(credential.url);
        divElementHead.appendChild(spanElement);
        divElementHead.appendChild(anchorElement);
        var divElementFoot = document.createElement("div");
        divElementFoot.className = "credential-field-foot";
        var inputElement = document.createElement('input');
        inputElement.value = credential.password;
        inputElement.id = "generated-field-pw-".concat(credential.id);
        inputElement.type = credential.hidden ? 'password' : 'text';
        inputElement.className = 'input-field-password';
        var showButtonElement = document.createElement('button');
        showButtonElement.id = "generated-button-show-".concat(credential.id);
        showButtonElement.className = "button button-small";
        showButtonElement.innerHTML = 'Show';
        var deleteButtonElement = document.createElement('button');
        deleteButtonElement.id = "generated-button-delete-".concat(credential.id);
        deleteButtonElement.className = "button button-small";
        deleteButtonElement.innerHTML = "Delete";
        var divElementButtons = document.createElement('div');
        divElementButtons.className = "credential-field-buttons";
        divElementButtons.appendChild(showButtonElement);
        divElementButtons.appendChild(deleteButtonElement);
        divElementFoot.appendChild(inputElement);
        divElementFoot.appendChild(divElementButtons);
        list === null || list === void 0 ? void 0 : list.append(divElementHead);
        list === null || list === void 0 ? void 0 : list.append(divElementFoot);
        var listener = new EventListener(credential);
        listener.addListenerShowButton();
        listener.addListenerDeleteButton();
        listener.addListenerPasswordField();
    }
    credentials.forEach(function (credential) { return createCredential(credential); });
});
