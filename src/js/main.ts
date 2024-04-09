document.addEventListener("DOMContentLoaded", (event) => {
    // Definition of the Credential interface, specifying the structure of credential objects.
    interface Credential {
        id: string;
        url: string;
        username: string;
        password: string;
        hidden: boolean;
    }

    // Retrieve credentials from local storage or initialize an empty array if there are none.
    let credentials: Credential[] = JSON.parse(localStorage.getItem('credentials') || '[]');

    // Class definition for EventListener, which encapsulates event listener functions for various elements.
    class EventListener {
        credential: Credential;
        constructor(credential: Credential) {
            this.credential = credential;
        }

        // Method to add event listener for the show button.
        addListenerShowButton() {
            // Retrieve elements and attach event listener to show/hide password.
            const showButtonId = `generated-button-show-${this.credential.id}`;
            const passwordField = document.getElementById(`generated-field-pw-${this.credential.id}`) as HTMLInputElement | null; 
            const showButton = document.getElementById(showButtonId) as HTMLButtonElement | null;

            if(!passwordField){
                return;
            }

            showButton?.addEventListener("click", () => {
                // Toggle password visibility and update credential object accordingly.
                if (passwordField.type === 'password'){
                    passwordField.type = 'text';
                    this.credential.hidden = false;
                    showButton.innerText = 'Hide'
                } else{
                    passwordField.type = 'password';
                    this.credential.hidden = true;
                    showButton.innerText = 'Show'
                }
                // Save updated credentials to local storage.
                saveCredentials();
            });
        }
        
        // Method to add event listener for the delete button.
        addListenerDeleteButton() {
            // Retrieve delete button element and attach event listener to delete credential.
            const deleteButtonId = `generated-button-delete-${this.credential.id}`;
            const deleteButton = document.getElementById(deleteButtonId);  

            deleteButton?.addEventListener("click", () => {
                // Remove credential from DOM and update credentials array, then save to local storage.
                const listItem = document.getElementById(this.credential.id);
                listItem?.remove();    
                credentials = credentials.filter(cred => cred.id !== this.credential.id);
                saveCredentials();
            });
        }

        // Method to add event listener for the password field, updating credentials on keyup.
        addListenerPasswordField(){
            const passwordField = document.getElementById(`generated-field-pw-${this.credential.id}`) as HTMLInputElement | null; 

            passwordField?.addEventListener('keyup', ()=>{
                this.credential.password = passwordField.value
                saveCredentials();
            })
        }
    }

    // Event listener for toggling card layout orientation.
    const footerButton = document.getElementById("script--button-footer") as HTMLButtonElement | null;
    const cards = document.getElementsByClassName("cards");
    const card = cards[0] as HTMLElement;
    card.style.flexDirection = 'row';
    footerButton?.addEventListener('click', () =>{ 
        if(card.style.flexDirection === "row"){
            card.style.flexDirection = "row-reverse"; 
        } else {
            card.style.flexDirection = 'row'
        }
    })

    // Event listener for toggling password visibility for all credentials.
    const showAllButton = document.getElementById("script--button-show-all") as HTMLButtonElement | null;
    let iterator = 0;
    showAllButton?.addEventListener('click', () =>{
        console.log('clicked')
        credentials.forEach(credential => {
            changeInputType(credential)
        });
        iterator += 1;
    })

    // Event listener for toggling password visibility for a single credential.
    const showButton = document.getElementById("script--button-show") as HTMLButtonElement | null;
    showButton?.addEventListener('click', () =>{
        if (!passwordElement){
            return;
        }
        if (passwordElement.type === "text") {
            passwordElement.type = "password";
            showButton.innerText = 'Show'
        } else {
            passwordElement.type = "text";
            showButton.innerText = 'Hide'
        }
    })
    
    // Function to toggle password visibility for all credentials.
    function changeInputType(credential:Credential){
        const passwordField = document.getElementById(`generated-field-pw-${credential.id}`) as HTMLInputElement | null;
        const showButton = document.getElementById(`generated-button-show-${credential.id}`) as HTMLButtonElement | null;
        if (!passwordField || !showButton){
            return;
        }
        if(iterator % 2 == 0){
            passwordField.type = 'text';
            credential.hidden = false;
            if(showAllButton) {
                showAllButton.innerText = 'Hide All';
            } 
        } else {
            passwordField.type = 'password';
            credential.hidden = true;
            if(showAllButton) {
                showAllButton.innerText = 'Show All';
            } 
        }
        showButton.innerText = credential.hidden ? "Show" : "Hide"
        console.log(iterator)
        saveCredentials();
    }
    
    // Event listener for detecting Enter key press to initiate credential creation.
    document.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            initiateCredential();
            console.log('test')
        }
    });

    // Event listener for appending a new credential.
    const appendButton = document.getElementById("script--button-append") as HTMLButtonElement | null;
    appendButton?.addEventListener("click", () => {
        initiateCredential();
    });

    // Function to save credentials to local storage.
    function saveCredentials() {
        localStorage.setItem('credentials', JSON.stringify(credentials));
    }

    // Retrieve input elements for username, URL, and password.
    const usernameElement = document.getElementById("script--credential-username") as HTMLInputElement | null;
    const urlElement = document.getElementById("script--credential-URL") as HTMLInputElement | null;
    const passwordElement = document.getElementById("script--credential-pw") as HTMLInputElement | null;

    // Function to initiate credential creation.
    function initiateCredential(){
        if (!urlElement || !usernameElement || !passwordElement) {
            return;
        }

        // Retrieve input values and validate them.
        let urlValue = urlElement.value; 
        let usernameValue = usernameElement.value; 
        let passwordValue = passwordElement.value;

        if (urlValue === '' || usernameValue === '' || passwordValue === '') {
            return;
        }

        // Create credential object and add it to the credentials array.
        let url: string = urlValue;
        let username: string = usernameValue;
        let password: string = passwordValue;
        let hidden = true;

        const credential: Credential = {
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
        usernameValue ='';
        passwordValue ='';
    }

    // Function to create DOM elements representing a credential and attach event listeners to them.
    function createCredential(credential: Credential){
    // Retrieve the <ul> element for credentials list.
    const ulElement = document.getElementById("script--credentials-ul") as HTMLUListElement | null;
    // Create a <li> element to hold the credential details and set its id to the credential's id.
    const liElement = document.createElement('li') as HTMLLIElement;
    liElement.id = credential.id;
    // Append the <li> element to the <ul> element.
    ulElement?.appendChild(liElement);
    
    // Retrieve the newly created <li> element.
    const list = document.getElementById(credential.id) as HTMLLIElement | null;

    // Create a <div> element to hold the username and URL.
    const divElementHead = document.createElement("div") as HTMLDivElement;
    divElementHead.className = "credential-field-head"

    // Create a <span> element to display the username.
    const spanElement = document.createElement('span') as HTMLSpanElement;
    spanElement.innerHTML = credential.username

    // Create an <a> element to display and link to the URL.
    const anchorElement = document.createElement('a') as HTMLAnchorElement;
    anchorElement.innerHTML = credential.url;
    anchorElement.target = "_blank"; 
    anchorElement.href = credential.url.startsWith('http') ? credential.url : `https://${credential.url}`;

    // Append the username and URL elements to the <div> element.
    divElementHead.appendChild(spanElement); divElementHead.appendChild(anchorElement);

    // Create a <div> element to hold the password input field and action buttons.
    const divElementFoot = document.createElement("div") as HTMLDivElement;
    divElementFoot.className = "credential-field-foot";

    // Create an <input> element for the password field and set its value and type.
    const inputElement = document.createElement('input') as HTMLInputElement;
    inputElement.value = credential.password
    inputElement.id = `generated-field-pw-${credential.id}`
    inputElement.type = credential.hidden ? 'password' : 'text';
    inputElement.className = 'input-field-password'

    // Create a <button> element to show/hide the password.
    const showButtonElement = document.createElement('button') as HTMLButtonElement;
    showButtonElement.id = `generated-button-show-${credential.id}`
    showButtonElement.className = "button button-small";
    showButtonElement.innerHTML = 'Show';

    // Create a <button> element to delete the credential.
    const deleteButtonElement = document.createElement('button') as HTMLButtonElement;
    deleteButtonElement.id = `generated-button-delete-${credential.id}`;
    deleteButtonElement.className = "button button-small";
    deleteButtonElement.innerHTML = credential.hidden ? 'Delete' : "Show"

    // Create a <div> element to hold the action buttons.
    const divElementButtons = document.createElement('div') as HTMLDivElement;
    divElementButtons.className = "credential-field-buttons";

    // Append the action buttons to the <div> element.
    divElementButtons.appendChild(showButtonElement); divElementButtons.appendChild(deleteButtonElement);

    // Append the password input field and action buttons to the <div> element.
    divElementFoot.appendChild(inputElement); divElementFoot.appendChild(divElementButtons);

    // Append the username/URL and password elements to the <li> element.
    list?.append(divElementHead); list?.append(divElementFoot); 
    
    // Instantiate EventListener object for the new credential and attach event listeners.
    const listener = new EventListener(credential);
    listener.addListenerShowButton();
    listener.addListenerDeleteButton();
    listener.addListenerPasswordField();
}


    // Iterate through existing credentials and create DOM elements for each.
    credentials.forEach(credential => createCredential(credential));
});