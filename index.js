var user = 'jpalm@audible.com';
var port = 8123;

/**
 * Returns the code sent to the serial port.
 */
function getStatusCode(status) {
  switch (parseInt(status)) {
  case Communicator.Status.Online:
    return 0;
  case Communicator.Status.BeRightBack:
  case Communicator.Status.Busy:
    return 1;
  case Communicator.Status.Away:
  case Communicator.Status.OutToLunch:
    return 2;
  case Communicator.Status.OnThePhone:
  case Communicator.Status.Offline:
  case Communicator.Status.DoNotDisturb:
    return 3;
  }
  return 4;
}

function getStatusImage(status) {
  switch (parseInt(status)) {
  case Communicator.Status.Online:
    return 'images/Available.png';
  case Communicator.Status.Offline:
    return 'images/NotAvailable.png';
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
  if (!!nameCtrl) {
    if (nameCtrl.PresenceEnabled) {
      nameCtrl.OnStatusChange = function(name,status,id) {
	changeStatus(status);
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