document.addEventListener("DOMContentLoaded", (event) => {
    interface Credential {
        id: string;
        url: string;
        username: string;
        password: string;
        hidden: boolean;
    }

    class EventListener {
        credential: Credential;
        constructor(credential: Credential) {
            this.credential = credential;
        }

        // This is an instance method, not static
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
                } else{
                    passwordField.type = 'password';
                }
            });
            
                
        }
        addListenerDeleteButton() {
            const deleteButtonId = `generated-button-delete-${this.credential.id}`;
            const deleteButton = document.getElementById(deleteButtonId);  

            deleteButton?.addEventListener("click", () => {
                const listItem = document.getElementById(this.credential.id);
                listItem?.remove();    
            });
        }
    }


    let credentials: Credential[] = [];


    const footerButton = document.getElementById("script--button-footer") as HTMLButtonElement | null;
    const cards = document.getElementsByClassName("cards");
    const card = cards[0] as HTMLElement;
    card.style.flexDirection = 'row';
    footerButton?.addEventListener('click', () =>{ 
        if(card.style.flexDirection === "row"){
            card.style.flexDirection = "row-reverse"; // Change the flex direction here
        } else {
            card.style.flexDirection = 'row'
        }
    })

    const showAllButton = document.getElementById("script--button-show-all") as HTMLButtonElement | null;
    console.log('check')
    showAllButton?.addEventListener('click', () =>{
        console.log('clicked')
        credentials.forEach(credential => {
            changeInputType(credential)
        });
    })

    const showButton = document.getElementById("script--button-show") as HTMLButtonElement | null;
    showButton?.addEventListener('click', () =>{
        if (!passwordElement){
            return;
        }
        if (passwordElement.type === "text") {
            passwordElement.type = "password";
        } else {
            passwordElement.type = "text";
        }
    })
    



    function changeInputType(credential:Credential){
        const passwordField = document.getElementById(`generated-field-pw-${credential.id}`) as HTMLInputElement | null;
        if (!passwordField){
            return;
        }
        if (passwordField.type === 'password'){
            passwordField.type = 'text';
        } else {
            passwordField.type = 'password';
        }
    }
    
    document.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            initiateCredential();
            console.log('test')
        }
    });


    const appendButton = document.getElementById("script--button-append") as HTMLButtonElement | null;
    appendButton?.addEventListener("click", () => {
        initiateCredential();
    });


    
    const usernameElement = document.getElementById("script--credential-username") as HTMLInputElement | null;
    const urlElement = document.getElementById("script--credential-URL") as HTMLInputElement | null;
    const passwordElement = document.getElementById("script--credential-pw") as HTMLInputElement | null;
    function initiateCredential(){
        if (!urlElement || !usernameElement || !passwordElement) {
            return;
        }

        let urlValue = urlElement.value; let usernameValue = usernameElement.value; let passwordValue = passwordElement.value;

        if (urlValue === '' || usernameValue === '' || passwordValue === '') {
            return;
        }

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
        createCredential(credential);
        urlValue = '';
        usernameValue ='';
        passwordValue ='';
        //console.log(credentials);
    }

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
        if(credential.url.indexOf('http') > -1){
            anchorElement.href = credential.url;
        }else {
            anchorElement.href = `https://${credential.url}`
        }

        divElementHead.appendChild(spanElement); divElementHead.appendChild(anchorElement);

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
