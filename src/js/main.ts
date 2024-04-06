document.addEventListener("DOMContentLoaded", (event) => {
    console.log("Hello, World!");

    interface Credentials {
        id: string;
        url: string;
        username: string;
        password: string;
        hidden: boolean;
    }

    class EventListener {
        credential: Credentials;

        constructor(credential: Credentials) {
            this.credential = credential;
        }

        // This is an instance method, not static
        addListenerShowButton() {
            const showButtonId = `generated-button-show-${this.credential.id}`;
            const passwordField = document.getElementById(
                `generated-field-pw-${this.credential.id}`
            ) as HTMLInputElement | null ; 
            const showButton = document.getElementById(
                showButtonId
            ) as HTMLButtonElement | null;
            if (showButton) {
                showButton.addEventListener("click", () => {
                    console.log(
                        `Show button for ${this.credential.id} clicked`
                    );
                    if (passwordField !== null && passwordField.type === 'password'){
                        passwordField.type = 'text';
                    } else if(passwordField) {
                        passwordField.type = 'password';
                    }

                });
            } else {
                console.log(`Button with ID ${showButtonId} not found.`);
            }
        }
        addListenerDeleteButton() {
            const deleteButtonId = `generated-button-delete-${this.credential.id}`;
            const deleteButton = document.getElementById(deleteButtonId);

            if (deleteButton) {
                deleteButton.addEventListener("click", () => {
                    const listItem = document.getElementById(
                            this.credential.id
                    );
                    if (listItem) {
                        listItem.remove();
                        console.log(
                            `Credential ${this.credential.id} deleted.`
                        );
                    } else {
                        console.log(
                            `List item for credential ${this.credential.id} not found.`
                        );
                    }
                });
            } else {
                console.log(`Button with ID ${deleteButtonId} not found.`);
            }
        }
    }


    let credentials: Credentials[] = [];

    const usernameElement = document.getElementById(
        "script--credential-username"
    ) as HTMLInputElement | null;
    const showButton = document.getElementById(
        "script--button-show"
    ) as HTMLButtonElement | null;
    const urlElement = document.getElementById(
        "script--credential-URL"
    ) as HTMLInputElement | null;
    const passwordElement = document.getElementById(
        "script--credential-pw"
    ) as HTMLInputElement | null;
    const appendButton = document.getElementById(
        "script--button-append"
    ) as HTMLButtonElement | null;
    const footerButton = document.getElementById(
        "script--button-footer"
    ) as HTMLButtonElement | null;
    const ulElement = document.getElementById(
        "script--credentials-ul"
    ) as HTMLUListElement | null;
    const showAllButton = document.getElementById(
        "script--button-show-all"
    ) as HTMLButtonElement | null;

    if (footerButton) {
        footerButton.addEventListener('click', () =>{
            const cards = document.getElementsByClassName("cards");
            for (let i = 0; i < cards.length; i++) {
                const card = cards[i] as HTMLElement;
                if(card.style.flexDirection === "row"){
                    card.style.flexDirection = "row-reverse"; // Change the flex direction here
                } else {
                    card.style.flexDirection = 'row'
                }
            }
        })
    }

    if(showAllButton){
        console.log('check')
        showAllButton.addEventListener('click', () =>{
            console.log('clicked')
            credentials.forEach(credentials => {
                changeInputType(credentials)
            });
        })
    }

    if(showButton){
        showButton.addEventListener('click', () =>{
            if (passwordElement !== null && passwordElement.type === "text") {
                passwordElement.type = "password";
            } else if (passwordElement) {
                passwordElement.type = "text";
            }
        })
    }



    function changeInputType(credential:Credentials){
        const passwordField = document.getElementById(
        `generated-field-pw-${credential.id}`
            ) as HTMLInputElement | null ;
        if (passwordField !== null && passwordField.type === 'password'){
                passwordField.type = 'text';
        } else if(passwordField) {
                passwordField.type = 'password';
        }
    }
    
    document.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            initiateCredential();
            console.log('test')
        }
    });

    if (appendButton) {
        appendButton.addEventListener("click", () => {
          initiateCredential();
        });

    }

    function initiateCredential(){
        if (!urlElement || !usernameElement || !passwordElement) {
            console.log(
                "One or more elements are missing, returning out of function"
            );
            return;
        }
        let url: string = urlElement.value;
        let username: string = usernameElement.value;
        let password: string = passwordElement.value;
        let hidden = true;

        const credential: Credentials = {
            id: Date.now().toString(),
            url: url,
            username: username,
            password: password,
            hidden: hidden,
        };

        credentials.push(credential);
        createCredential(credential);
        //console.log(credentials);
    }

    function createCredential(credential: Credentials){

        const liElement = document.createElement('li') as HTMLLIElement;
        liElement.id = credential.id;
        ulElement?.appendChild(liElement);
        const list = document.getElementById(credential.id) as HTMLLIElement | null;

        const divElementHead = document.createElement("div") as HTMLDivElement;
        divElementHead.className = "credential-field-head"

        const spanElement = document.createElement('span') as HTMLSpanElement;
        spanElement.innerHTML = credential.username

        const aElement = document.createElement('a') as HTMLAnchorElement;
        aElement.innerHTML = credential.url;
        aElement.target = "_blank"; 
        if(credential.url.indexOf('https') > -1){
            aElement.href = credential.url;
        }else {
            aElement.href = `https://${credential.url}`
        }
        
        // Set the target attribute to "_blank" to open the link in a new tab

        divElementHead.appendChild(spanElement); divElementHead.appendChild(aElement);

        const divElementFoot = document.createElement("div") as HTMLDivElement;
        divElementFoot.className = "credential-field-foot";

        const inputElement = document.createElement('input') as HTMLInputElement;
        inputElement.value = credential.password
        inputElement.id = `generated-field-pw-${credential.id}`
        inputElement.type = 'password'
        inputElement.className = 'input-field-password'


        const showButtonElement = document.createElement('button') as HTMLButtonElement;
        showButtonElement.id = `generated-button-show-${credential.id}`
        showButtonElement.className = "button button-small";
        showButtonElement.innerHTML = 'Show';

        const deleteButtonElement = document.createElement('button') as HTMLButtonElement;
        deleteButtonElement.id = `generated-button-delete-${credential.id}`;
        deleteButtonElement.className = "button button-small";
        deleteButtonElement.innerHTML = "Delete";

        const divElementButtons = document.createElement('div') as HTMLDivElement;
        divElementButtons.className = "credential-field-buttons";

        divElementButtons.appendChild(showButtonElement); divElementButtons.appendChild(deleteButtonElement);

        divElementFoot.appendChild(inputElement); divElementFoot.appendChild(divElementButtons);


        list?.append(divElementHead); list?.append(divElementFoot); 
        
        const listener = new EventListener(credential);
        listener.addListenerShowButton();
        listener.addListenerDeleteButton();
    }
});
