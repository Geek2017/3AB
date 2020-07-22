function jmbotdetector(args) {

    var self = this;
    self.isBot = false;
    self.tests = {};



    var selectedTests = args.tests || [];
    if (selectedTests.length == 0 || selectedTests.indexOf(jmbotdetector.Tests.SCROLL) != -1) {
        self.tests[jmbotdetector.Tests.SCROLL] = function() {
            var e = function() {
                self.tests[jmbotdetector.Tests.SCROLL] = true;
                self.update()
                self.unbindEvent(window, jmbotdetector.Tests.SCROLL, e)
                self.unbindEvent(document, jmbotdetector.Tests.SCROLL, e)
            };
            self.bindEvent(window, jmbotdetector.Tests.SCROLL, e);
            self.bindEvent(document, jmbotdetector.Tests.SCROLL, e);
        };
    }


    if (selectedTests.length == 0 || selectedTests.indexOf(jmbotdetector.Tests.MOUSE) != -1) {
        self.tests[jmbotdetector.Tests.MOUSE] = function() {
            var e = function() {
                self.tests[jmbotdetector.Tests.MOUSE] = true;
                self.update();
                self.unbindEvent(window, jmbotdetector.Tests.MOUSE, e);
            }
            self.bindEvent(window, jmbotdetector.Tests.MOUSE, e);
        };
    }
    if (selectedTests.length == 0 || selectedTests.indexOf(jmbotdetector.Tests.KEYUP) != -1) {
        self.tests[jmbotdetector.Tests.KEYUP] = function() {
            var e = function() {
                self.tests[jmbotdetector.Tests.KEYUP] = true;
                self.update();
                self.unbindEvent(window, jmbotdetector.Tests.KEYUP, e);
            }
            self.bindEvent(window, jmbotdetector.Tests.KEYUP, e);
        };
    }



    if (selectedTests.length == 0 || selectedTests.indexOf(jmbotdetector.Tests.SWIPE) != -1) {
        self.tests[jmbotdetector.Tests.SWIPE_TOUCHSTART] = function() {
            var e = function() {
                self.tests[jmbotdetector.Tests.SWIPE_TOUCHSTART] = true;
                self.update();
                self.unbindEvent(document, jmbotdetector.Tests.SWIPE_TOUCHSTART);
            }
            self.bindEvent(document, jmbotdetector.Tests.SWIPE_TOUCHSTART);
        }
    }
    if (selectedTests.length == 0 || selectedTests.indexOf(jmbotdetector.Tests.DEVICE_MOTION) != -1) {
        self.tests[jmbotdetector.Tests.DEVICE_MOTION] = function() {
            var e = function(event) {
                if (event.rotationRate.alpha || event.rotationRate.beta || event.rotationRate.gamma) {
                    var userAgent = navigator.userAgent.toLowerCase();
                    var isAndroid = userAgent.indexOf('android') != -1;
                    var beta = isAndroid ? event.rotationRate.beta : Math.round(event.rotationRate.beta / 10) * 10;
                    var gamma = isAndroid ? event.rotationRate.gamma : Math.round(event.rotationRate.gamma / 10) * 10;
                    if (!self.lastRotationData) {
                        self.lastRotationData = {
                            beta: beta,
                            gamma: gamma
                        };
                    } else {
                        var movement = beta != self.lastRotationData.beta || gamma != self.lastRotationData.gamma;
                        if (isAndroid) {
                            movement = movement && (beta > 0.2 || gamma > 0.2);
                        }
                        var args = { beta: beta, gamma: gamma }
                        self.tests[jmbotdetector.Tests.DEVICE_MOTION] = movement;
                        self.update();
                        if (movement) {
                            self.unbindEvent(window, jmbotdetector.Tests.DEVICE_MOTION, e);
                        }
                    }
                } else {
                    self.tests[jmbotdetector.Tests.DEVICE_MOTION] = false;
                }

            }
            self.bindEvent(window, jmbotdetector.Tests.DEVICE_MOTION, e);
        }
    }
    if (selectedTests.length == 0 || selectedTests.indexOf(jmbotdetector.Tests.DEVICE_ORIENTATION) != -1) {
        self.tests[jmbotdetector.Tests.DEVICE_ORIENTATION] = function() {
            var e = function() {
                self.tests[jmbotdetector.Tests.DEVICE_ORIENTATION] = true;
                self.update();
                self.unbindEvent(window, jmbotdetector.Tests.DEVICE_ORIENTATION, e);
            }
            self.bindEvent(window, jmbotdetector.Tests.DEVICE_ORIENTATION);
        }
    }
    if (selectedTests.length == 0 || selectedTests.indexOf(jmbotdetector.Tests.DEVICE_ORIENTATION_MOZ) != -1) {
        self.tests[jmbotdetector.Tests.DEVICE_ORIENTATION_MOZ] = function() {
            var e = function() {
                self.tests[jmbotdetector.Tests.DEVICE_ORIENTATION_MOZ] = true;
                self.update();
                self.unbindEvent(window, jmbotdetector.Tests.DEVICE_ORIENTATION_MOZ);
            }
            self.bindEvent(window, jmbotdetector.Tests.DEVICE_ORIENTATION_MOZ);
        }
    }
    if (selectedTests.length == 0 || selectedTests.indexOf(jmbotdetector.Tests.MOUSE) != -1) {
        function detectWebcam(callback) {
            let md = navigator.mediaDevices;
            if (!md || !md.enumerateDevices) return callback(false);
            md.enumerateDevices().then(devices => {
                callback(devices.some(device => 'videoinput' === device.kind));
            })
        }

        detectWebcam(function(hasWebcam) {
            console.log('Webcam: ' + (hasWebcam ? 'yes' : 'no'));
            if (hasWebcam) {
                self.tests[jmbotdetector.Tests.CAMSENSOR] = true;
            }
        })

    }



    self.cases = {};
    self.timeout = args.timeout || 1000;
    self.callback = args.callback || null;
    self.detected = false;
}

jmbotdetector.Tests = {
    CAMSENSOR: 'camsensor',
    KEYUP: 'keyup',
    MOUSE: 'mousemove',
    SWIPE: 'swipe',
    SWIPE_TOUCHSTART: 'touchstart',
    SWIPE_TOUCHMOVE: 'touchmove',
    SWIPE_TOUCHEND: 'touchend',
    SCROLL: 'scroll',
    GESTURE: 'gesture',
    GYROSCOPE: 'gyroscope',
    DEVICE_MOTION: 'devicemotion',
    DEVICE_ORIENTATION: 'deviceorientation',
    DEVICE_ORIENTATION_MOZ: 'MozOrientation'
};
jmbotdetector.prototype.update = function(notify) {
    var self = this;
    var count = 0;
    var tests = 0;
    for (var i in self.tests) {
        if (self.tests.hasOwnProperty(i)) {
            self.cases[i] = self.tests[i] === true;
            if (self.cases[i] === true) {
                count++;
            }
        }
        tests++;
    }
    self.isBot = count == 0;
    self.allMatched = count == tests;
    if (notify !== false) {
        self.callback(self);
    }
}

jmbotdetector.prototype.bindEvent = function(e, type, handler) {
    if (e.addEventListener) {
        e.addEventListener(type, handler, false);
    } else if (e.attachEvent) {
        e.attachEvent("on" + type, handler);
    }
};

jmbotdetector.prototype.unbindEvent = function(e, type, handle) {
    if (e.removeEventListener) {
        e.removeEventListener(type, handle, false);
    } else {
        var evtName = "on" + type;
        if (e.detachEvent) {
            if (typeof e[evtName] === 'undefined') {
                e[type] = null
            }
            e.detachEvent(evtName)
        }
    }
};
jmbotdetector.prototype.monitor = function() {
    var self = this;
    for (var i in this.tests) {
        if (this.tests.hasOwnProperty(i)) {
            this.tests[i].call();
        }
    }
    this.update(false);
    setTimeout(function() {
        self.update(true);
    }, self.timeout);
};