document.addEventListener("DOMContentLoaded", function (event) {
    // Retrieve credentials from localStorage or initialize an empty array if none exist
    var credentials = JSON.parse(localStorage.getItem('credentials') || '[]');
    // Class to manage event listeners for credential items
    var EventListener = /** @class */ (function () {
        function EventListener(credential) {
            this.credential = credential;
        }
        // Add event listener for showing or hiding a password
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
                    showButton.innerText = 'Hide';
                }
                else {
                    passwordField.type = 'password';
                    _this.credential.hidden = true;
                    showButton.innerText = 'Show';
                }
                // Save any changes to credentials in local storage
                saveCredentials();
            });
        };
        // Add event listener for deleting a credential
        EventListener.prototype.addListenerDeleteButton = function () {
            var _this = this;
            var deleteButtonId = "generated-button-delete-".concat(this.credential.id);
            var deleteButton = document.getElementById(deleteButtonId);
            deleteButton === null || deleteButton === void 0 ? void 0 : deleteButton.addEventListener("click", function () {
                var listItem = document.getElementById(_this.credential.id);
                listItem === null || listItem === void 0 ? void 0 : listItem.remove();
                // Filter out the deleted credential and save the update
                credentials = credentials.filter(function (cred) { return cred.id !== _this.credential.id; });
                saveCredentials();
            });
        };
        // Add event listener to update password in the credential object on keyup
        EventListener.prototype.addListenerPasswordField = function () {
            var _this = this;
            var passwordField = document.getElementById("generated-field-pw-".concat(this.credential.id));
            passwordField === null || passwordField === void 0 ? void 0 : passwordField.addEventListener('keyup', function () {
                _this.credential.password = passwordField.value;
                // Save any changes to credentials in local storage
                saveCredentials();
            });
        };
        return EventListener;
    }());
    // Event listener for changing the layout orientation of the credential cards
    var footerButton = document.getElementById("script--button-footer");
    var cards = document.getElementsByClassName("cards");
    var card = cards[0];
    var direction = JSON.parse(localStorage.getItem('direction') || '[]');
    card.style.flexDirection = direction ? 'row' : 'row-reverse';
    var row;
    footerButton === null || footerButton === void 0 ? void 0 : footerButton.addEventListener('click', function () {
        if (card.style.flexDirection === "row") {
            card.style.flexDirection = "row-reverse";
            row = false;
        }
        else {
            card.style.flexDirection = 'row';
            row = true;
        }
        // Save the new direction setting to local storage
        saveDirection(row);
    });
    // Save layout direction to local storage
    function saveDirection(boolean) {
        localStorage.setItem('direction', JSON.stringify(boolean));
    }
    // Event listener to toggle password visibility for all credentials
    var showAllButton = document.getElementById("script--button-show-all");
    var iterator = 0;
    showAllButton === null || showAllButton === void 0 ? void 0 : showAllButton.addEventListener('click', function () {
        console.log('clicked');
        credentials.forEach(function (credential) {
            changeInputType(credential);
        });
        iterator += 1;
    });
    var showButton = document.getElementById("script--button-show");
    showButton === null || showButton === void 0 ? void 0 : showButton.addEventListener('click', function () {
        if (!passwordElement) {
            return;
        }
        if (passwordElement.type === "text") {
            passwordElement.type = "password";
            showButton.innerText = 'Show';
        }
        else {
            passwordElement.type = "text";
            showButton.innerText = 'Hide';
        }
    });
    // Toggle password visibility for all credentials and update button text accordingly
    function changeInputType(credential) {
        var passwordField = document.getElementById("generated-field-pw-".concat(credential.id));
        var showButton = document.getElementById("generated-button-show-".concat(credential.id));
        if (!passwordField || !showButton) {
            return;
        }
        if (iterator % 2 == 0) {
            passwordField.type = 'text';
            credential.hidden = false;
            if (showAllButton) {
                showAllButton.innerText = 'Hide All';
            }
        }
        else {
            passwordField.type = 'password';
            credential.hidden = true;
            if (showAllButton) {
                showAllButton.innerText = 'Show All';
            }
        }
        showButton.innerText = credential.hidden ? "Show" : "Hide";
        console.log(iterator);
        // Save any changes to credentials in local storage
        saveCredentials();
    }
    // Event listener to create a new credential on Enter key press
    document.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            initiateCredential();
            console.log('test');
        }
    });
    // Event listener for adding a new credential
    var appendButton = document.getElementById("script--button-append");
    appendButton === null || appendButton === void 0 ? void 0 : appendButton.addEventListener("click", function () {
        initiateCredential();
    });
    // Save credentials to local storage
    function saveCredentials() {
        localStorage.setItem('credentials', JSON.stringify(credentials));
    }
    // Retrieve input elements for new credential creation
    var usernameElement = document.getElementById("script--credential-username");
    var urlElement = document.getElementById("script--credential-URL");
    var passwordElement = document.getElementById("script--credential-pw");
    // Function to create a new credential object and add it to the array
    function initiateCredential() {
        if (!urlElement || !usernameElement || !passwordElement) {
            return;
        }
        if (urlElement.value === '' || usernameElement.value === '' || passwordElement.value === '') {
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
        credentials.push(credential);
        createCredential(credential);
        // Save updated credentials array to local storage
        saveCredentials();
        // Reset input fields after adding the credential
        urlElement.value = '';
        usernameElement.value = '';
        passwordElement.value = '';
    }
    // Function to create DOM elements for a credential and attach event listeners
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
        anchorElement.href = credential.url.indexOf('http') > -1 ? credential.url : "https://".concat(credential.url);
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
        showButtonElement.innerText = credential.hidden ? 'Show' : "Hide";
        var deleteButtonElement = document.createElement('button');
        deleteButtonElement.id = "generated-button-delete-".concat(credential.id);
        deleteButtonElement.className = "button button-small";
        deleteButtonElement.innerText = 'Delete';
        var divElementButtons = document.createElement('div');
        divElementButtons.className = "credential-field-buttons";
        divElementButtons.appendChild(showButtonElement);
        divElementButtons.appendChild(deleteButtonElement);
        divElementFoot.appendChild(inputElement);
        divElementFoot.appendChild(divElementButtons);
        list === null || list === void 0 ? void 0 : list.append(divElementHead);
        list === null || list === void 0 ? void 0 : list.append(divElementFoot);
        // Attach event listeners to new credential elements
        var listener = new EventListener(credential);
        listener.addListenerShowButton();
        listener.addListenerDeleteButton();
        listener.addListenerPasswordField();
    }
    // Iterate over existing credentials and create their DOM elements
    credentials.forEach(function (credential) { return createCredential(credential); });
});
