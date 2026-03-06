/***********************************************************
 **************** Homework for March      ******************
 ****************       33th session      ******************
 ***********************************************************/

// Get DOM elements
const loginForm = document.getElementById("loginForm");
const messageDiv = document.getElementById("message");

// Array of valid usernames and passwords
const validAccounts = [
    { id: 1, username: "admin", password: "admin123" },
    { id: 2, username: "user01", password: "user01@123" },
    { id: 3, username: "f8student", password: "f8learning" },
    { id: 4, username: "c", password: "c" },
];
let islogging = false;
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (islogging) return;
    islogging = true;

    messageDiv.innerText = "Đang gửi request đăng nhập...";

    const formData = new FormData(loginForm);

    const inputUsername = formData.get("username");
    const inputPassword = formData.get("password");

    // Send login data
    const loginPromise = login(inputUsername, inputPassword);

    loginPromise
        .then(function (authenticatedUser) {
            messageDiv.innerText = `Đăng nhập thành công: ${authenticatedUser.username}`;
            console.log(authenticatedUser);
            islogging = false;
        })
        .catch(function (errorMessage) {
            messageDiv.innerText = `Đăng nhập thất bại: ${errorMessage}`;
            console.log(errorMessage);
            islogging = false;
        });
});

// Simulate server-side processing
function login(username, password) {
    return new Promise(function (resolve, reject) {
        // prettier-ignore
        const matchedAccount = validAccounts.find
        (
            (account) => account.username === username && account.password === password
        );

        setTimeout(() => {
            if (matchedAccount) resolve(matchedAccount);
            else reject("Sai tài khoản hoặc mật khẩu");
        }, 2000);
    });
}
