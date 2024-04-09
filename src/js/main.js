document.addEventListener("DOMContentLoaded", function (event) {
    // Retrieve credentials from local storage or initialize an empty array if there are none.
    var credentials = JSON.parse(localStorage.getItem('credentials') || '[]');
    // Class definition for EventListener, which encapsulates event listener functions for various elements.
    var EventListener = /** @class */ (function () {
        function EventListener(credential) {
            this.credential = credential;
        }
        // Method to add event listener for the show button.
        EventListener.prototype.addListenerShowButton = function () {
            var _this = this;
            // Retrieve elements and attach event listener to show/hide password.
            var showButtonId = "generated-button-show-".concat(this.credential.id);
            var passwordField = document.getElementById("generated-field-pw-".concat(this.credential.id));
            var showButton = document.getElementById(showButtonId);
            if (!passwordField) {
                return;
            }
            showButton === null || showButton === void 0 ? void 0 : showButton.addEventListener("click", function () {
                // Toggle password visibility and update credential object accordingly.
                if (passwordField.type === 'password') {
                    passwordField.type = 'text';
                    _this.credential.hidden = false;
                }
                else {
                    passwordField.type = 'password';
                    _this.credential.hidden = true;
                }
                // Save updated credentials to local storage.
                saveCredentials();
            });
        };
        // Method to add event listener for the delete button.
        EventListener.prototype.addListenerDeleteButton = function () {
            var _this = this;
            // Retrieve delete button element and attach event listener to delete credential.
            var deleteButtonId = "generated-button-delete-".concat(this.credential.id);
            var deleteButton = document.getElementById(deleteButtonId);
            deleteButton === null || deleteButton === void 0 ? void 0 : deleteButton.addEventListener("click", function () {
                // Remove credential from DOM and update credentials array, then save to local storage.
                var listItem = document.getElementById(_this.credential.id);
                listItem === null || listItem === void 0 ? void 0 : listItem.remove();
                credentials = credentials.filter(function (cred) { return cred.id !== _this.credential.id; });
                saveCredentials();
            });
        };
        // Method to add event listener for the password field, updating credentials on keyup.
        EventListener.prototype.addListenerPasswordField = function () {
            var _this = this;
            var passwordField = document.getElementById("generated-field-pw-".concat(this.credential.id));
            passwordField === null || passwordField === void 0 ? void 0 : passwordField.addEventListener('keyup', function () {
                _this.credential.password = passwordField.value;
                saveCredentials();
            });
        };
        return EventListener;
    }());
    // Event listener for toggling card layout orientation.
    var footerButton = document.getElementById("script--button-footer");
    var cards = document.getElementsByClassName("cards");
    var card = cards[0];
    card.style.flexDirection = 'row';
    footerButton === null || footerButton === void 0 ? void 0 : footerButton.addEventListener('click', function () {
        if (card.style.flexDirection === "row") {
            card.style.flexDirection = "row-reverse";
        }
        else {
            card.style.flexDirection = 'row';
        }
    });
    // Event listener for toggling password visibility for all credentials.
    var showAllButton = document.getElementById("script--button-show-all");
    var iterator = 0;
    showAllButton === null || showAllButton === void 0 ? void 0 : showAllButton.addEventListener('click', function () {
        console.log('clicked');
        credentials.forEach(function (credential) {
            changeInputType(credential);
        });
        iterator += 1;
    });
    // Event listener for toggling password visibility for a single credential.
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
    // Function to toggle password visibility for all credentials.
    function changeInputType(credential) {
        var passwordField = document.getElementById("generated-field-pw-".concat(credential.id));
        if (!passwordField) {
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
        // Log iterator for debugging purposes.
        console.log(iterator);
        saveCredentials();
    }
    // Event listener for detecting Enter key press to initiate credential creation.
    document.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            initiateCredential();
            console.log('test');
        }
    });
    // Event listener for appending a new credential.
    var appendButton = document.getElementById("script--button-append");
    appendButton === null || appendButton === void 0 ? void 0 : appendButton.addEventListener("click", function () {
        initiateCredential();
    });
    // Function to save credentials to local storage.
    function saveCredentials() {
        localStorage.setItem('credentials', JSON.stringify(credentials));
    }
    // Retrieve input elements for username, URL, and password.
    var usernameElement = document.getElementById("script--credential-username");
    var urlElement = document.getElementById("script--credential-URL");
    var passwordElement = document.getElementById("script--credential-pw");
    // Function to initiate credential creation.
    function initiateCredential() {
        if (!urlElement || !usernameElement || !passwordElement) {
            return;
        }
        // Retrieve input values and validate them.
        var urlValue = urlElement.value;
        var usernameValue = usernameElement.value;
        var passwordValue = passwordElement.value;
        if (urlValue === '' || usernameValue === '' || passwordValue === '') {
            return;
        }
        // Create credential object and add it to the credentials array.
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
        // Create DOM elements for the new credential.
        createCredential(credential);
        // Save updated credentials to local storage.
        saveCredentials();
        // Clear input values after creating the credential.
        urlValue = '';
        usernameValue = '';
        passwordValue = '';
    }
    // Function to create DOM elements representing a credential and attach event listeners to them.
    function createCredential(credential) {
        // Retrieve the <ul> element for credentials list.
        var ulElement = document.getElementById("script--credentials-ul");
        // Create a <li> element to hold the credential details and set its id to the credential's id.
        var liElement = document.createElement('li');
        liElement.id = credential.id;
        // Append the <li> element to the <ul> element.
        ulElement === null || ulElement === void 0 ? void 0 : ulElement.appendChild(liElement);
        // Retrieve the newly created <li> element.
        var list = document.getElementById(credential.id);
        // Create a <div> element to hold the username and URL.
        var divElementHead = document.createElement("div");
        divElementHead.className = "credential-field-head";
        // Create a <span> element to display the username.
        var spanElement = document.createElement('span');
        spanElement.innerHTML = credential.username;
        // Create an <a> element to display and link to the URL.
        var anchorElement = document.createElement('a');
        anchorElement.innerHTML = credential.url;
        anchorElement.target = "_blank";
        anchorElement.href = credential.url.startsWith('http') ? credential.url : "https://".concat(credential.url);
        // Append the username and URL elements to the <div> element.
        divElementHead.appendChild(spanElement);
        divElementHead.appendChild(anchorElement);
        // Create a <div> element to hold the password input field and action buttons.
        var divElementFoot = document.createElement("div");
        divElementFoot.className = "credential-field-foot";
        // Create an <input> element for the password field and set its value and type.
        var inputElement = document.createElement('input');
        inputElement.value = credential.password;
        inputElement.id = "generated-field-pw-".concat(credential.id);
        inputElement.type = credential.hidden ? 'password' : 'text';
        inputElement.className = 'input-field-password';
        // Create a <button> element to show/hide the password.
        var showButtonElement = document.createElement('button');
        showButtonElement.id = "generated-button-show-".concat(credential.id);
        showButtonElement.className = "button button-small";
        showButtonElement.innerHTML = 'Show';
        // Create a <button> element to delete the credential.
        var deleteButtonElement = document.createElement('button');
        deleteButtonElement.id = "generated-button-delete-".concat(credential.id);
        deleteButtonElement.className = "button button-small";
        deleteButtonElement.innerHTML = "Delete";
        // Create a <div> element to hold the action buttons.
        var divElementButtons = document.createElement('div');
        divElementButtons.className = "credential-field-buttons";
        // Append the action buttons to the <div> element.
        divElementButtons.appendChild(showButtonElement);
        divElementButtons.appendChild(deleteButtonElement);
        // Append the password input field and action buttons to the <div> element.
        divElementFoot.appendChild(inputElement);
        divElementFoot.appendChild(divElementButtons);
        // Append the username/URL and password elements to the <li> element.
        list === null || list === void 0 ? void 0 : list.append(divElementHead);
        list === null || list === void 0 ? void 0 : list.append(divElementFoot);
        // Instantiate EventListener object for the new credential and attach event listeners.
        var listener = new EventListener(credential);
        listener.addListenerShowButton();
        listener.addListenerDeleteButton();
        listener.addListenerPasswordField();
    }
    // Iterate through existing credentials and create DOM elements for each.
    credentials.forEach(function (credential) { return createCredential(credential); });
});
