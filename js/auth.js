function doLogin()
{
	window.userId = 0;
	window.firstName = "";
	window.lastName = "";
	
	let login = document.getElementById("loginName").value;
	let password = document.getElementById("loginPassword").value;
	//	var hash = md5( password );

	document.getElementById("loginResult").innerHTML = "";

	let tmp = {login:login,password:password};
	//	var tmp = {login:login,password:hash};
	let jsonPayload = JSON.stringify( tmp );

	let url = window.urlBase + '/Login' + window.extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				window.userId = jsonObject.id;
				
				if( window.userId < 1 )
				{		
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}
				
				window.firstName = jsonObject.firstName;
				window.lastName = jsonObject.lastName;

				saveCookie();
				
				window.location.href = "index.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}
}

function doLogout()
{
	window.userId = 0;
	window.firstName = "";
	window.lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "login.html";
}
