function SmartHouse(name) {
    this.name = name;
    this.devices = [];
}

SmartHouse.prototype.addDevice = function(device) {
    this.devices.push(device);
};

SmartHouse.prototype.getDevices = function() {
    return this.devices;
};

SmartHouse.prototype.getDeviceByName = function(name) {
    for (var i = 0; i < this.devices.length; i++) {
        if (this.devices[i].name === name) {
            return this.devices[i];
        }
    }
    return null;
};

SmartHouse.prototype.offAllDevice = function() {
    for (var i = 0; i < this.devices.length; i++) {
        this.devices[i].off();
    }
};

// Базовий пристрій
function Device(name) {
    this.name = name;
    this.status = false;
}

Device.prototype.on = function() {
    this.status = true;
    console.log(this.name + " is ON");
};

Device.prototype.off = function() {
    this.status = false;
    console.log(this.name + " is OFF");
};

Device.prototype.getStatus = function() {
    return this.status ? "Увімкнено" : "Вимкнено";
};

// Кавоварка
function CoffeeMachine(name) {
    Device.call(this, name);
}

CoffeeMachine.prototype = Object.create(Device.prototype);
CoffeeMachine.prototype.constructor = CoffeeMachine;

CoffeeMachine.prototype.brew = function(callback) {
    if (!this.status) return callback("Кавоварка вимкнена");
    setTimeout(function() {
        callback(null, "Кава готова!");
    }, 2000);
};

// Очищувач
function AirPurifier(name) {
    Device.call(this, name);
}

AirPurifier.prototype = Object.create(Device.prototype);
AirPurifier.prototype.constructor = AirPurifier;

AirPurifier.prototype.purify = function(callback) {
    if (!this.status) return callback("Очищувач вимкнено");
    setTimeout(function() {
        callback(null, "Повітря очищено");
    }, 1500);
};

// Музична система
function MusicSystem(name) {
    Device.call(this, name);
    this.volume = 5;
}

MusicSystem.prototype = Object.create(Device.prototype);
MusicSystem.prototype.constructor = MusicSystem;

MusicSystem.prototype.play = function(callback) {
    if (!this.status) return callback("Музика не відтворюється, система вимкнена");
    setTimeout(function() {
        callback(null, "Відтворення музики...");
    }, 1000);
};

MusicSystem.prototype.setVolume = function(level) {
    this.volume = level;
};

// Ініціалізація
var house = new SmartHouse("Мій Дім");
var coffee = new CoffeeMachine("Кавоварка");
var air = new AirPurifier("Очищувач повітря");
var music = new MusicSystem("Музична система");

house.addDevice(coffee);
house.addDevice(air);
house.addDevice(music);

// Вивід
var devicesDiv = document.getElementById("devices");
var devices = house.getDevices();

for (var i = 0; i < devices.length; i++) {
    (function(device) {
        var div = document.createElement("div");
        div.className = "device";

        var title = document.createElement("h3");
        title.textContent = device.name;
        div.appendChild(title);

        var status = document.createElement("p");
        status.textContent = "Статус: " + device.getStatus();
        div.appendChild(status);

        var onBtn = document.createElement("button");
        onBtn.textContent = "Увімкнути";
        onBtn.onclick = function() {
            device.on();
            status.textContent = "Статус: " + device.getStatus();
        };
        div.appendChild(onBtn);

        var offBtn = document.createElement("button");
        offBtn.textContent = "Вимкнути";
        offBtn.onclick = function() {
            device.off();
            status.textContent = "Статус: " + device.getStatus();
        };
        div.appendChild(offBtn);

        if (device instanceof CoffeeMachine) {
            var brewBtn = document.createElement("button");
            brewBtn.textContent = "Зварити каву";
            brewBtn.onclick = function() {
                device.brew(function(err, msg) {
                    alert(err || msg);
                });
            };
            div.appendChild(brewBtn);
        }

        if (device instanceof AirPurifier) {
            var purifyBtn = document.createElement("button");
            purifyBtn.textContent = "Очищення повітря";
            purifyBtn.onclick = function() {
                device.purify(function(err, msg) {
                    alert(err || msg);
                });
            };
            div.appendChild(purifyBtn);
        }

        if (device instanceof MusicSystem) {
            var playBtn = document.createElement("button");
            playBtn.textContent = "Відтворити музику";
            playBtn.onclick = function() {
                device.play(function(err, msg) {
                    alert(err || msg);
                });
            };
            div.appendChild(playBtn);
        }

        devicesDiv.appendChild(div);
    })(devices[i]);
}
