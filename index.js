function getComString() {
    return "<img style='display:none' id='com_img'></img>";
}

function writeComString() {
    document.write(getComString());
}

function writeFormString(name,num) {
    document.write(getFormString(name,num));
}

function writeFormStrings(names) {
    for (var i=0; i<names.length; i++) {
	writeFormString(names[i],i);
    }
}

function getFormString(name,num) {
    if (name.indexOf("@") == -1) {
	name += "@audible.com";
    }
    var s = "";
    s += "<div>\n";
    s += "<p>\n";
    s += "<img id='main_image" + num + "'></img>\n";
    s += "<form>\n";
    s += "<input id='main_user" + num + "' name='main_user" + num + "' value='" + name + "'></input>\n";
    s += "<button onclick='changeStatus(Communicator.Status.Online," + num + "); return false;'>\n";
    s += "<img src='images/Online.png' /> Online\n";
    s += "</button>\n";
    s += "<button onclick='changeStatus(Communicator.Status.Offline," + num + "); return false;'>\n";
    s += "<img src='images/Offline.png' /> Offline\n";
    s += "</button>\n";
    s += "<button onclick='changeStatus(Communicator.Status.Away," + num + "); return false;'>\n";
    s += "<img src='images/Away.png' /> Away\n";
    s += "</button>\n";
    s += "<button onclick='changeStatus(Communicator.Status.Busy," + num + "); return false;'>\n";
    s += "<img src='images/Busy.png' /> Busy\n";
    s += "</button>\n";
    s += "<button onclick='changeStatus(Communicator.Status.BeRightBack," + num + "); return false;'>\n";
    s += "<img src='images/BeRightBack.png' /> BeRightBack\n";
    s += "</button>\n";
    s += "<button onclick='changeStatus(Communicator.Status.DoNotDisturb," + num + "); return false;'>\n";
    s += "<img src='images/DoNotDisturb.png' /> DoNotDisturb\n";
    s += "</button>\n";
    s += "Last changed on <em><span id='last_changed" + num + "'></span></em>\n";
    s += "</form>\n";
    s += "</p>\n";
    s += "</div>\n";
    return s;
}

function changeStatus(status,num) {

    // num defaults to 0
    num = num || 0;

    // Send the message
    var s = document.getElementById('com_img');
    var url = '/StatusUpdate?status=' + getStatusCode(status)
	+ '&_rand=' + Math.random();
    s.src = url;

    // Change the image
    var img = getStatusImage(status);
    if (!!img) {
	el = document.getElementById('main_image' + num);
	if (!!el) {
	    el.src = img;
	}
    }
    // Change the date
    var el = document.getElementById('last_changed' + num);
    if (!!el) {
	el.innerHTML = new Date();
    }
}

function createUser(i) {
    var user = document.getElementById('main_user' + i).value;
    if (!!nameCtrl) {
	if (nameCtrl.PresenceEnabled) {
	    nameCtrl.OnStatusChange = function(name,status,id) {
		if (name == user) {
		    changeStatus(status,i);
		}
	    };
	    nameCtrl.GetStatus(user, '1');
	}
    } else {
	changeStatus(Communicator.Status.Online,i);
    }
}
function onLoad(names) {
    var n = null;
    try {
	n = parseInt(names);
    } catch (e) {}
    if (!n) {
	n = names ? names.length : 1;
    }
    //
    // Grab the user from the url
    //
    var match = /main_user=(.*)/.exec(String(document.location));
    if (match) {
	document.getElementById('main_user').value = match[1];
    }
    for (var i=0; i<n; i++) {
	createUser(i);
    }
}