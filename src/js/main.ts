document.addEventListener("DOMContentLoaded", (event) => {
    console.log("Hello, World!");

    interface Credentials {
        id: string;
        url: string;
        username: string;
        password: string;
        hidden: boolean;
    }

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

    if (appendButton) {
        appendButton.addEventListener("click", () => {
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

            console.log(credential);
        });
    }
});
