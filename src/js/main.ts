document.addEventListener("DOMContentLoaded", (event) => {
    // Define the structure of a credential object
    interface Credential {
        id: string;
        url: string;
        username: string;
        password: string;
        hidden: boolean;
    }

    // Retrieve credentials from localStorage or initialize an empty array if none exist
    let credentials: Credential[] = JSON.parse(localStorage.getItem('credentials') || '[]');

    // Class to manage event listeners for credential items
    class EventListener {
        credential: Credential;
        constructor(credential: Credential) {
            this.credential = credential;
        }

        // Add event listener for showing or hiding a password
        addListenerShowButton() {
            const showButtonId = `generated-button-show-${this.credential.id}`;
            const passwordField = document.getElementById(`generated-field-pw-${this.credential.id}`) as HTMLInputElement | null; 
            const showButton = document.getElementById(showButtonId) as HTMLButtonElement | null;

            if(!passwordField){
                return;
            }

            showButton?.addEventListener("click", () => {
                if (passwordField.type === 'password'){
                    passwordField.type = 'text';
                    this.credential.hidden = false;
                    showButton.innerText = 'Hide'
                } else{
                    passwordField.type = 'password';
                    this.credential.hidden = true;
                    showButton.innerText = 'Show'
                }
                // Save any changes to credentials in local storage
                saveCredentials();
            });
        }
        
        // Add event listener for deleting a credential
        addListenerDeleteButton() {
            const deleteButtonId = `generated-button-delete-${this.credential.id}`;
            const deleteButton = document.getElementById(deleteButtonId);  

            deleteButton?.addEventListener("click", () => {
                const listItem = document.getElementById(this.credential.id);
                listItem?.remove();    
                // Filter out the deleted credential and save the update
                credentials = credentials.filter(cred => cred.id !== this.credential.id);
                saveCredentials();
            });
        }

        // Add event listener to update password in the credential object on keyup
        addListenerPasswordField(){
            const passwordField = document.getElementById(`generated-field-pw-${this.credential.id}`) as HTMLInputElement | null; 

            passwordField?.addEventListener('keyup', ()=>{
                this.credential.password = passwordField.value
                // Save any changes to credentials in local storage
                saveCredentials();
            })
        }
    }

    // Event listener for changing the layout orientation of the credential cards
    const footerButton = document.getElementById("script--button-footer") as HTMLButtonElement | null;
    const cards = document.getElementsByClassName("cards");
    const card = cards[0] as HTMLElement;

    let direction: Boolean = JSON.parse(localStorage.getItem('direction') || '[]')
    card.style.flexDirection = direction ? 'row' : 'row-reverse'

    let row: Boolean;
    footerButton?.addEventListener('click', () =>{ 
        if(card.style.flexDirection === "row"){
            card.style.flexDirection = "row-reverse";
            row = false;
        } else {
            card.style.flexDirection = 'row'
            row = true;
        }
        // Save the new direction setting to local storage
        saveDirection(row)
    })

    // Save layout direction to local storage
    function saveDirection(boolean:Boolean){
        localStorage.setItem('direction', JSON.stringify(boolean))
    }

    // Event listener to toggle password visibility for all credentials
    const showAllButton = document.getElementById("script--button-show-all") as HTMLButtonElement | null;
    let iterator = 0;
    showAllButton?.addEventListener('click', () =>{
        console.log('clicked')
        credentials.forEach(credential => {
            changeInputType(credential)
        });
        iterator += 1;
    })

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
    
    // Toggle password visibility for all credentials and update button text accordingly
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
        // Save any changes to credentials in local storage
        saveCredentials();
    }
    
    // Event listener to create a new credential on Enter key press
    document.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            initiateCredential();
            console.log('test')
        }
    });

    // Event listener for adding a new credential
    const appendButton = document.getElementById("script--button-append") as HTMLButtonElement | null;
    appendButton?.addEventListener("click", () => {
        initiateCredential();
    });

    // Save credentials to local storage
    function saveCredentials() {
        localStorage.setItem('credentials', JSON.stringify(credentials));
    }

    // Retrieve input elements for new credential creation
    const usernameElement = document.getElementById("script--credential-username") as HTMLInputElement | null;
    const urlElement = document.getElementById("script--credential-URL") as HTMLInputElement | null;
    const passwordElement = document.getElementById("script--credential-pw") as HTMLInputElement | null;

    // Function to create a new credential object and add it to the array
    function initiateCredential(){
        if (!urlElement || !usernameElement || !passwordElement) {
            return;
        }

        if (urlElement.value === '' || usernameElement.value === '' || passwordElement.value === '') {
            return;
        }

        let url: string = urlElement.value;
        let username: string = usernameElement.value;
        let password: string = passwordElement.value;
        let hidden = true;

        const credential: Credential = {
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
    function createCredential(credential: Credential){
    
        const ulElement = document.getElementById("script--credentials-ul") as HTMLUListElement | null;
        const liElement = document.createElement('li') as HTMLLIElement;
        liElement.id = credential.id;
        ulElement?.appendChild(liElement);
        
        const list = document.getElementById(credential.id) as HTMLLIElement | null;

        const divElementHead = document.createElement("div") as HTMLDivElement;
        divElementHead.className = "credential-field-head"

        const spanElement = document.createElement('span') as HTMLSpanElement;
        spanElement.innerHTML = credential.username

        const anchorElement = document.createElement('a') as HTMLAnchorElement;
        anchorElement.innerHTML = credential.url;
        anchorElement.target = "_blank"; 
        anchorElement.href = credential.url.indexOf('http') > -1 ? credential.url : `https://${credential.url}`;

        divElementHead.appendChild(spanElement); divElementHead.appendChild(anchorElement);

        const divElementFoot = document.createElement("div") as HTMLDivElement;
        divElementFoot.className = "credential-field-foot";

        const inputElement = document.createElement('input') as HTMLInputElement;
        inputElement.value = credential.password
        inputElement.id = `generated-field-pw-${credential.id}`
        inputElement.type = credential.hidden ? 'password' : 'text';
        inputElement.className = 'input-field-password'

        const showButtonElement = document.createElement('button') as HTMLButtonElement;
        showButtonElement.id = `generated-button-show-${credential.id}`
        showButtonElement.className = "button button-small";
        showButtonElement.innerText = credential.hidden ? 'Show' : "Hide"

        const deleteButtonElement = document.createElement('button') as HTMLButtonElement;
        deleteButtonElement.id = `generated-button-delete-${credential.id}`;
        deleteButtonElement.className = "button button-small";
        deleteButtonElement.innerText = 'Delete';

        const divElementButtons = document.createElement('div') as HTMLDivElement;
        divElementButtons.className = "credential-field-buttons";

        divElementButtons.appendChild(showButtonElement); divElementButtons.appendChild(deleteButtonElement);

        divElementFoot.appendChild(inputElement); divElementFoot.appendChild(divElementButtons);

        list?.append(divElementHead); list?.append(divElementFoot); 
        
        // Attach event listeners to new credential elements
        const listener = new EventListener(credential);
        listener.addListenerShowButton();
        listener.addListenerDeleteButton();
        listener.addListenerPasswordField();
    }


    // Iterate over existing credentials and create their DOM elements
    credentials.forEach(credential => createCredential(credential));
});
