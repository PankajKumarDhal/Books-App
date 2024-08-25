// Wait for the page to load before running our code
document.addEventListener('DOMContentLoaded', () => {
    // Get important elements
    let modeToggle = document.getElementById('toggle-switch');
    let signupButton = document.querySelector(".signup");

    // Set up dark mode toggle
    modeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
        saveModePreference();
        toggleSignupSigninSections();
    });

    // Load saved mode preference
    loadModePreference();

    // Set up signup button
    signupButton.addEventListener("click", showSignupForm);
});

// Save user's mode preference
function saveModePreference() {
    let mode = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('mode', mode);
}

// Load user's saved mode preference
function loadModePreference() {
    if (localStorage.getItem('mode') === 'dark') {
        document.body.classList.add('dark-mode');
        document.getElementById('toggle-switch').checked = true;
        toggleSignupSigninSections();
    }
}

// Show signup form
function showSignupForm() {
    let signupForm = createSignupForm();
    document.querySelector(".container").appendChild(signupForm);
    hideMainContent();
    setupFormEventListeners(signupForm);
}

// Create signup form HTML
function createSignupForm() {
    let form = document.createElement("div");
    form.classList.add("signup_section");
    form.innerHTML = `
        <div class="signup_panel">
            <form action="" method="post" class="signup_form">
                <span class="del_btn"><button type="button" class="close_btn">X</button></span>
                <span class="input_name rotate"><input type="text" name="name" class="name" placeholder="NAME" required></span>
                <span class="input_email rotate"><input type="email" name="email" class="email" placeholder="EMAIL" required></span>
                <span class="input_password rotate"><input type="password" name="password" class="password" placeholder="PASSWORD" required></span>
                <span class="sign_btn rotate"><button type="submit" class="signup_btn">SIGN UP</button></span>
                <span class="link_tab">
                    <button type="button" class="signup_link_btn">SIGN UP</button>  
                    <button type="button" class="signin_btn">SIGN IN</button>
                </span>
            </form>
        </div>
    `;
    return form;
}

// Hide main content
function hideMainContent() {
    document.querySelector(".left").style.display = "none";
    document.querySelector(".right").style.display = "none";
}

// Setup form event listeners
function setupFormEventListeners(form) {
    form.querySelector(".close_btn").addEventListener("click", closeForm);
    form.querySelector(".signup_form").addEventListener("submit", handleSignup);
    form.querySelector(".signin_btn").addEventListener("click", showSigninForm);
}

// Close form
function closeForm() {
    document.querySelector(".signup_section, .signin_section").remove();
    document.querySelector(".left").style.display = "block";
    document.querySelector(".right").style.display = "block";
}

// Handle signup
function handleSignup(event) {
    event.preventDefault();
    let form = event.target;
    let name = form.querySelector(".name").value;
    let email = form.querySelector(".email").value;
    let password = form.querySelector(".password").value;

    if (name && email && password) {
        let userData = { name, email, password };
        localStorage.setItem("userData", JSON.stringify(userData));
        alert("Sign up successful!");
        closeForm();
    } else {
        alert("Please fill in all fields.");
    }
}

// Show signin form
function showSigninForm() {
    let signin_container = document.createElement("div");
    signin_container.classList.add("signin_section");

    signin_container.innerHTML = `
        <div class="signin_panel">
            <form action="" method="post" class="signin_form">
                <span class="del_btn"><button type="button" class="close_btn">X</button></span>
                <span class="input_email rotate"><input type="email" name="email" class="email" placeholder="EMAIL" required></span>
                <span class="input_password rotate"><input type="password" name="password" class="password" placeholder="PASSWORD" required></span>
                <span class="sign_btn"><button type="submit" class="signin_btn">SIGN IN</button></span>
                <span class="link_tab">
                    <button type="button" class="signup_link_btn">SIGN UP</button>  
                    <button type="button" class="signin_link_btn">SIGN IN</button>
                </span>
            </form>
        </div>
    `;

    document.querySelector(".container").appendChild(signin_container);
    hideMainContent();
    setupSigninFormEventListeners(signin_container);
}

function setupSigninFormEventListeners(container) {
    container.querySelector(".close_btn").addEventListener("click", closeForm);
    container.querySelector(".signin_form").addEventListener("submit", handleSignin);
    container.querySelector(".signup_link_btn").addEventListener("click", () => {
        closeForm();
        showSignupForm();
    });
}

function handleSignin(event) {
    event.preventDefault();
    let form = event.target;
    let email = form.querySelector(".email").value;
    let password = form.querySelector(".password").value;

    let storedData = JSON.parse(localStorage.getItem("userData"));

    if (storedData && storedData.email === email && storedData.password === password) {
        alert("Sign in successful!");
        closeForm();
    } else {
        alert("Invalid email or password.");
    }
}

function toggleSignupSigninSections() {
    document.querySelectorAll('.signup_section, .signin_section').forEach(section => {
        section.classList.toggle('dark-mode-bg');
    });
}