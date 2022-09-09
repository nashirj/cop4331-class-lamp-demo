function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + window.firstName + ",lastName=" + window.lastName + ",userId=" + window.userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			window.firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			window.lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			window.userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( window.userId < 0 )
	{
		if (window.location.pathname.split("/").pop() !== "login.html") {
			window.location.href = "login.html";
		}
	}
	else
	{
		if (window.location.pathname.split("/").pop() !== "index.html") {
			window.location.href = "index.html";
		}
		document.getElementById("userName").innerHTML = "Logged in as " + window.firstName + " " + window.lastName;
	}
}
