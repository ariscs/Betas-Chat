//CONSTANTS
const btnLogin = document.getElementById('login');
const user = document.getElementById('user');
const password = document.getElementById('password');

//FUNCTIONS
const getData = () => {
    const data = {
        user: user.value,
        password: password.value
    }

    return data;
}