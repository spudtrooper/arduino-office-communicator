
/**
 * Returns the code sent to the serial port.
 */
function getStatusCode(status) {
  switch (parseInt(status)) {
  case Communicator.Status.Online:
    return 0;
  case Communicator.Status.Busy:
    return 2;
  case Communicator.Status.BeRightBack:
  case Communicator.Status.Away:
  case Communicator.Status.OutToLunch:
    return 1;
  case Communicator.Status.OnThePhone:
  case Communicator.Status.DoNotDisturb:
    return 3;
  case Communicator.Status.Offline:
    return 4;
  }
  return 4;
}

function getStatusImage(status) {
  switch (parseInt(status)) {
  case Communicator.Status.Online:
    return 'images/Online.png';
  case Communicator.Status.Offline:
    return 'images/Offline.png';
  case Communicator.Status.Busy:
    return 'images/Busy.png';
  case Communicator.Status.BeRightBack:
    return 'images/BeRightBack.png';
  case Communicator.Status.OnThePhone:
  case Communicator.Status.DoNotDisturb:
    return 'images/DoNotDisturb.png';
  case Communicator.Status.Away:
  case Communicator.Status.OutToLunch:
    // pass
  }
  return 'images/Away.png';
}

function changeStatus(status) {

  // Send the message
  var s = document.getElementById('com_img');
  var url = '/StatusUpdate?status=' + getStatusCode(status)
    + '&_rand=' + Math.random();
  s.src = url;

  // Change the image
  var img = getStatusImage(status);
  if (!!img) {
    el = document.getElementById('main_image');
    if (!!el) {
      el.src = img;
    }
  }
  // Change the date
  var el = document.getElementById('last_changed');
  if (!!el) {
    el.innerHTML = new Date();
  }
}

function onLoad() {
  //
  // Grab the user from the url
  //
  var loc = String(document.location);
  var match = /main_user=(.*)/.exec(loc);
  if (match) {
    document.getElementById('main_user').value = match[1];
  }
  var user = document.getElementById('main_user').value;
  if (!!nameCtrl) {
    if (nameCtrl.PresenceEnabled) {
      nameCtrl.OnStatusChange = function(name,status,id) {
	if (name == user) {
	  changeStatus(status);
	}
      };
      nameCtrl.GetStatus(user, '1');
    }
  } else {
    changeStatus(Communicator.Status.Online);
  }
  var el = document.getElementById('main_user');
  if (!!el) {
    el.innerHTML = user;
  }
}