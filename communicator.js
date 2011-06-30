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
  Offline: 1,
  Away: 2,
  Busy: 3,
  BeRightBack: 4,
  OnThePhone: 5,
  OutToLunch: 6,
  DoNotDisturb: 9
};