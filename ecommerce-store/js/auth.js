// ================= USER SIGNUP =================

const signupForm = document.getElementById("signup-form");

if(signupForm){

signupForm.addEventListener("submit",function(e){

e.preventDefault();

const name =
document.getElementById("signup-name").value.trim();

const email =
document.getElementById("signup-email").value.trim().toLowerCase();

const password =
document.getElementById("signup-password").value;

const confirm =
document.getElementById("signup-confirm").value;

if(password !== confirm){

alert("Passwords do not match!");

return;

}

let users =
JSON.parse(localStorage.getItem("users")) || [];

let exists =
users.find(user => user.email === email);

if(exists){

alert("Email already registered!");

return;

}

users.push({

id:Date.now(),

name:name,

email:email,

password:password

});

localStorage.setItem(
"users",
JSON.stringify(users)
);

alert("Account created successfully!");

window.location.href="login.html";

});

}



// ================= USER LOGIN =================

const loginForm =
document.getElementById("login-form");

if(loginForm){

loginForm.addEventListener("submit",function(e){

e.preventDefault();

const email =
document.getElementById("login-email").value.trim().toLowerCase();

const password =
document.getElementById("login-password").value;

let users =
JSON.parse(localStorage.getItem("users")) || [];

let user =
users.find(u =>
u.email === email &&
u.password === password
);

if(!user){

alert("Invalid email or password!");

return;

}

localStorage.setItem(
"userLogin",
"true"
);

localStorage.setItem(
"currentUser",
JSON.stringify(user)
);

alert("Login Successful!");

window.location.href="index.html";

});

}



// ================= LOGOUT =================

function userLogout(){

localStorage.removeItem("userLogin");

localStorage.removeItem("currentUser");

window.location.href="login.html";

}
