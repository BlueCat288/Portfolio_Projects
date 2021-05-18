window.onload = function() {
    loadLogin();
}

function loadLogin() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && xhr.status === 200) {
            //buttons
            document.getElementById('serv').innerHTML = xhr.responseText;
            document.getElementById("LogIn").addEventListener('click', login);
            //document.getElementById("Register").addEventListener('click', loadRegister);

        }
    }
    xhr.open("GET", "login.serv", true);
    xhr.send();

}
function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var xhr = new XMLHttpRequest();
    var obj = {
        userName: username,
        passWord: password
    }
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
            var user = JSON.parse(xhr.responseText);
            if (user === null) {
                loadError();
            }
            else if (user.userRole == 1) {
                loadEmpNav();
                loadEmp();
            }
            else {
                loadManNav();
                loadManager();
            }
        }
    }
    var toSend = JSON.stringify(obj);
    xhr.open("POST","login",true);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(toSend);
}

function loadError() {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById('serv').innerHTML = xhr.responseText;
            document.getElementById('Return').addEventListener('click', loadLogin);
        }
    }
    xhr.open("GET", "loginError.serv", true);
    xhr.send();

}

function logout() {
    removeAll();
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && xhr.status === 200) {
            loadLogin();
        }
    }
    xhr.open("GET", "logout", true);
    xhr.send();
}

function loadEmpNav() {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && xhr.status === 200) {
            //do stuff
            document.getElementById('Navigator').innerHTML = xhr.responseText;
            document.getElementById('fileRemb').addEventListener('click', loadFileRemb);
            document.getElementById('viewPast').addEventListener('click', loadPass);
            document.getElementById('logOut').addEventListener('click', logout);
        }
    }
    xhr.open("GET", "employeeNav.serv", true);
    xhr.send();

}

function loadManNav() {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && xhr.status === 200) {
            //do stuff
            document.getElementById('Navigator').innerHTML = xhr.responseText;
            document.getElementById('pendingNav').addEventListener('click', loadPending);
            document.getElementById('oldNav').addEventListener('click', loadOld);
            document.getElementById("Register").addEventListener('click', loadRegister);
            document.getElementById('logoutNav').addEventListener('click',logout);
        }
    }
    xhr.open("GET", "managerNav.serv", true);
    xhr.send();
}

function removeAll() {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById('serv').innerHTML = xhr.responseText;
            document.getElementById('Navigator').innerHTML = xhr.responseText;
        }
    }
    xhr.open("GET", "removeAll.serv", true);
    xhr.send();
}

function loadRegister() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && xhr.status === 200) {
            //do stuff
            document.getElementById('serv').innerHTML = xhr.responseText;
            document.getElementById('RegisterNew').addEventListener('click', register);
            document.getElementById('Return').addEventListener('click', loadManager);
        }
    }
    xhr.open("GET", "register.serv", true);
    xhr.send();

}

function register () {
    var username = document.getElementById('newUsername').value;
    var email = document.getElementById('newEmail').value;
    var password = document.getElementById('newPassword').value;
    var firstname = document.getElementById('newFirst').value;
    var lastname = document.getElementById('newLast').value;
    var xhr = new XMLHttpRequest();
    var obj = {
        userName: username,
        email: email,
        passWord: password,
        firstName: firstname,
        lastName: lastname,
    }
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
            loadManager();
        }
    }
    var toSend = JSON.stringify(obj);
    xhr.open("POST","register");
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(toSend);
}

function loadManager() {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && xhr.status === 200) {

            document.getElementById('serv').innerHTML = xhr.responseText;

        }
    }
    xhr.open("GET", "manager.serv", true);
    xhr.send();
}

function loadPending() {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {

            document.getElementById('serv').innerHTML = xhr.responseText;
            loadPendingRembs();

        }
    }
    xhr.open("GET", "pending.serv", true);
    xhr.send();

}
////
//
//
//
//
//

//
//
function loadPendingRembs(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && xhr.status === 200) {
            let rembs = JSON.parse(xhr.responseText);
            for (let r of rembs) {
                let am = r.amount;
                if (r.type === 1) {
                    var rType = "Lodging"
                }
                else if(r.type === 2) {
                    var rType = "Travel"

                }
                else {
                    var rType = "Food"

                }
                var th = $(`<tr class="table-light">
					<td>${r.authorln}</td>
					<td>${rType}</td>
					<td>${r.description}</td>
					<td>$${r.amount}</td>
					<td>
					<button value ="${am}" class = "approve btn btn-success">Approve</button>
					<button value ="${am}" class = "deny btn btn-danger">Deny</button>
					</td>
					</tr>`);
                /*var th = '<tr class="table-light">' +
					'<td>' + r.authorln + '</td>' +
					'<td>'+ date + '</td>' +
					'<td>' + r.description +'</td>' +
					'<td>' + r.amount + '</td>' +
					'<td>'+
					'<button value =' + r.id + ' class = "approveR btn btn-success">Approve</button>' +
					'<button value =' + r.id + ' class = "deny btn btn-danger">Deny</button>' +
					'</td>' +
					'</tr>'*/
                //document.getElementById("block").innerHTML = th;
                $('#pendRembList tr:last').after(th);
            }
            $('.approve').on('click',approveRemb);
            $('.deny').on('click',denyRemb);
        }
    }
    xhr.open("GET","pending");
    xhr.send();
}

function approveRemb() {
    var xhr = new XMLHttpRequest();
    //var id = $(this).val();
    var obj = {
        amount: $(this).val(),
        status: 2
    }

    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
            document.getElementById('serv').innerHTML = xhr.responseText;
            loadPending();
        }
    }
    var toSend = JSON.stringify(obj);
    xhr.open("POST","pending",true);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(toSend);
}

function denyRemb() {
    var xhr = new XMLHttpRequest();
    //var id = this.value;
    var obj = {
        amount: $(this).val(),
        status: 3
    }
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
            document.getElementById('serv').innerHTML = xhr.responseText;
            loadPending();
        }
    }
    var toSend = JSON.stringify(obj);
    xhr.open("POST","pending",true)
    xhr.setRequestHeader("Content-type","application/json")
    xhr.send(toSend);
}

function loadOld() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById('serv').innerHTML = xhr.responseText;
            loadOldRembs();
        }
    }
    xhr.open("GET", "old.serv", true);
    xhr.send();

}

function loadOldRembs(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && xhr.status === 200) {
            let rembs = JSON.parse(xhr.responseText);
            for (let r of rembs) {
                if (r.type === 1) {
                    var rType = "Lodging"
                }
                else if(r.type === 2) {
                    var rType = "Travel"

                }
                else {
                    var rType = "Food"

                }
                if (r.status === 2) {
                    var status = "Approved";
                    var th = $(`<tr class="table-success">
							<td>${r.authorln}</td>
							<td>${rType}</td>
							<td>${r.description}</td>
							<td>$${r.amount}</td>
							<td>${status}</td>
							</tr>`);
                }
                else {
                    var status = "Denied";
                    var th = $(`<tr class="table-danger">
							<td>${r.authorln}</td>
							<td>${2}</td>
							<td>${r.description}</td>
							<td>$${r.amount}</td>
							<td>${status}</td>
							</tr>`);
                }
                $('#oldRembList tr:last').after(th);
            }
        }
    }
    xhr.open("GET","old");
    xhr.send();
}


function loadEmp() {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById('serv').innerHTML = xhr.responseText;
        }
    }
    xhr.open("GET", "employee.serv", true);
    xhr.send();
}

function loadFileRemb() {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById('serv').innerHTML = xhr.responseText;
            document.getElementById('submit').addEventListener('click', addRemb);
        }
    }
    xhr.open("GET", "remb.serv", true);
    xhr.send();

}

function addRemb() {
    var amount = document.getElementById('Amount').value;
    var type = document.getElementById('rembType').value;
    var description = document.getElementById('Desc').value;
    if (type === "1") {
        var type_id = 1;
    }
    else if (type === "2") {
        var type_id = 2;
    }
    else {
        var type_id = 3;
    }

    var obj = {
        amount: amount,
        type: type_id,
        description: description
    };
    var toSend = JSON.stringify(obj);

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            loadFileRemb();
        }
    }
    xhr.open("POST","remb");
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(toSend);

}

function loadPass() {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById('serv').innerHTML = xhr.responseText;
            loadRembs();
        }
    }
    xhr.open("GET", "pass.serv", true);
    xhr.send();

}

function loadRembs(){
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && xhr.status === 200) {
            let rembs = JSON.parse(xhr.responseText);
            for (let r of rembs) {
                if (r.type === 1) {
                    var rType = "Lodging"
                }
                else if(r.type === 2) {
                    var rType = "Travel"

                }
                else {
                    var rType = "Food"

                }
                if (r.status === 1) {
                    var status = "Pending";
                    var th = $(`<tr class="table-success">
							<td>${rType}</td>
							<td>${r.description}</td>
							<td>$${r.amount}</td>
							<td>${status}</td>
							</tr>`);
                }
                else if (r.status === 2) {
                    var status = "Approved";
                    var th = $(`<tr class="table-success">
							<td>${rType}</td>
							<td>${r.description}</td>
							<td>$${r.amount}</td>
							<td>${status}</td>
							</tr>`);
                }
                else {
                    var status = "Denied";
                    var th = $(`<tr class="table-danger">
							<td>${rType}</td>
							<td>${r.description}</td>
							<td>$${r.amount}</td>
							<td>${status}</td>
							</tr>`);
                }
                $('#rembList tr:last').after(th);
            }
        }
    }
    xhr.open("GET","pass");
    xhr.send();
}