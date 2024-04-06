document.addEventListener("DOMContentLoaded", function (event) {
    console.log("Hello, World!");
    var EventListener = /** @class */ (function () {
        function EventListener(credential) {
            this.credential = credential;
        }
        // This is an instance method, not static
        EventListener.prototype.addListenerShowButton = function () {
            var _this = this;
            var showButtonId = "generated-button-show-".concat(this.credential.id);
            var listItem = document.getElementById(this.credential.id);
            var showButton = document.getElementById(showButtonId);
            if (showButton) {
                showButton.addEventListener("click", function () {
                    console.log("Show button for ".concat(_this.credential.id, " clicked"));
                    if (listItem) {
                        listItem.remove();
                    }
                });
            }
            else {
                console.log("Button with ID ".concat(showButtonId, " not found."));
            }
        };
        EventListener.prototype.addListenerDeleteButton = function () {
            var _this = this;
            var deleteButtonId = "generated-button-delete-".concat(this.credential.id);
            var deleteButton = document.getElementById(deleteButtonId);
            if (deleteButton) {
                deleteButton.addEventListener("click", function () {
                    var listItem = document.getElementById(_this.credential.id);
                    if (listItem) {
                        listItem.remove();
                        console.log("Credential ".concat(_this.credential.id, " deleted."));
                    }
                    else {
                        console.log("List item for credential ".concat(_this.credential.id, " not found."));
                    }
                });
            }
            else {
                console.log("Button with ID ".concat(deleteButtonId, " not found."));
            }
        };
        return EventListener;
    }());
    var credentials = [];
    var usernameElement = document.getElementById("script--credential-username");
    var showButton = document.getElementById("script--button-show");
    var urlElement = document.getElementById("script--credential-URL");
    var passwordElement = document.getElementById("script--credential-pw");
    var appendButton = document.getElementById("script--button-append");
    var footerButton = document.getElementById("script--button-footer");
    var ulElement = document.getElementById("script--credentials-ul");
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
            credentials.push(credential);
            createCredential(credential);
            //console.log(credentials);
        });
    }
    function createCredential(credential) {
        var liElement = document.createElement('li');
        liElement.id = credential.id;
        ulElement === null || ulElement === void 0 ? void 0 : ulElement.appendChild(liElement);
        var list = document.getElementById(credential.id);
        var divElementHead = document.createElement("div");
        divElementHead.className = "credential-field-head";
        var spanElement = document.createElement('span');
        spanElement.innerHTML = credential.username;
        var aElement = document.createElement('a');
        aElement.innerHTML = credential.url;
        aElement.href = credential.url;
        divElementHead.appendChild(spanElement);
        divElementHead.appendChild(aElement);
        var divElementFoot = document.createElement("div");
        divElementFoot.className = "credential-field-foot";
        var inputElement = document.createElement('input');
        inputElement.value = credential.password;
        inputElement.id = "generated-field-pw-".concat(credential.id);
        inputElement.type = 'password';
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
    }
});
