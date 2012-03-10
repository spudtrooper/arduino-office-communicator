nameCtrl = null;
try {
  //
  // Allow to run on non-ActiveX browsers and use the buttons
  //
  nameCtrl = new ActiveXObject('Name.NameCtrl.1');
} catch (e) { /* ignore */ }

function Communicator(sipUri) {
  this.sipUri = sipUri;
  this.nameCtrl = nameCtrl;
  if (!!this.nameCtrl && this.nameCtrl.PresenceEnabled) {
    this.nameCtrl.GetStatus(this.sipUri, "1");
  }
}

Communicator.prototype = {
  
  showStatus: function() {
    if (!!this.nameCtrl) {
      this.nameCtrl.ShowOOUI(this.sipUri, 0, 15, 15);
    }
  },
  
  hideStatus: function() {
    if (!!this.nameCtrl) {
      this.nameCtrl.HideOOUI();
    }
  }
}

Communicator.Status = {
  Online: 0,
  Offline: 9,
  Away: 1,
  Busy: 2,
  BeRightBack: 2,
  OnThePhone: 2,
  OutToLunch: 2,
  DoNotDisturb: 8
};

/**
 * Returns the code sent to the serial port.
 */
function getStatusCode(status) {
  switch (parseInt(status)) {
  case Communicator.Status.Online:
    return 0;
  case Communicator.Status.Away:
  case Communicator.Status.BeRightBack:
    return 1;
  case Communicator.Status.OutToLunch:
  case Communicator.Status.Busy:
  case Communicator.Status.OnThePhone:
    return 2;
  case Communicator.Status.DoNotDisturb:
    return 8;
  case Communicator.Status.Offline:
    return 9;
  }
  return 2;
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