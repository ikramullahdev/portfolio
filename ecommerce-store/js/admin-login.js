const loginBtn = document.getElementById("login-btn");


if(loginBtn){


loginBtn.addEventListener("click",()=>{


    const username =
    document.getElementById("admin-username").value;


    const password =
    document.getElementById("admin-password").value;



    // Admin credentials

    if(username === "admin" && password === "12345"){


        localStorage.setItem(
            "adminLogin",
            "true"
        );


        window.location.href="admin.html";


    }


    else{


        document.getElementById("login-error").innerText =
        "Invalid username or password";


    }


});


}
