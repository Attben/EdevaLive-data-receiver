const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVQXYZ";
const NUMBERS = "0123456789";

class Axle{
	constructor(){
        this.axleId = "16060021-" + (1632134211000000 + randomInt(0, 1000000));
        this.distance = randomInt(300, 1000);
        this.t1 = getCurrentUnixTime() * 1000000; //Multiplied by 1 million to pretend it's in microseconds
        this.speed = randomInt(1,10);
        this.weight = randomInt(400, 1000);
        this.peakElapsedRatio = Math.random();
	}
}

class ClassEvent{
	constructor(){
		this.eventType = "class";
		this.mode = "active";
		this.vehicleClassCombo = 20;
		this.axles = [];
		for(let n = 0; n < randomInt(2, 4); ++n){
			this.axles.push(new Axle());
		}
		this.actibumpId = "16060021";
		this.totalWeight = 0;
		this.axles.forEach(axle => this.totalWeight += axle.weight);
		this.avgSpeed = 10;
		this.signpostSpeed = 40;
		this.nrAxles = this.axles.length;
		this.classdVersion = "1.14";
		this.totalDistance = 1661;
		this.vehicleClass = 9;
		this.eventTime = 1632134211;
		this.groundFloor = 13927;
		this.gapTime = 7755;
		this.hatchLength = 0.46;
		this.gapDistance = 646;
		this.voltageToMassRatio = 2
	}
}

class Vehicle{
	constructor(){
		this.actibumpID = randomNumberString(12);
		this.eventTime = getCurrentUnixTime();
		this.queue = randomInt(0, 5);
		this.eventType = "vehicle";
		this.node = "active";
		this.vehicleNr = randomInt(1, 999);
		this.sensor4 = 0;
		this.signpostSpeed = randomInt(30, 70);
		this.sensor3 = 1000000;
		this.speedLimit = this.signpostSpeed;
		this.tzOffset = "+7200";
		this.gapTime = 20000 + randomInt(0, 10000);
		this.speed = [];
		for(let n = 0; n < 20; ++n){
			this.speed.push(randomInt(20,35));
		}
		this.tripFrequency = 100;
		this.transponder = [];
		this.sensor1 = 2000 + randomInt(0, 600);
		this.action = 0;
		this.sensor2 = 2553;
		this.trigIndex = 0;
		this.versionFartd = "4.10";
		this.inhibitTime = 6000 + randomInt(0, 1000);
		this.hatchTime = 0;
		this.driveCurrent = 1.2;
	}
}

function getCurrentUnixTime(){
	return Math.floor(Date.now()/1000);
}

//returns integer in the range [min, max] (both inclusive)
function randomInt(min, max){
	min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomNumberString(len){
	let string = "";
	for(let n = 0; n < len; ++n){
		string += NUMBERS[randomInt(0, NUMBERS.length-1)];
	}
	return string;
}

function randomString(len){
	let string = "";
	for(let n = 0; n < len; ++n){
		string += ALPHABET[randomInt(0, ALPHABET.length-1)];
	}
	return string;
}

function generateEvents(){
	let url = document.getElementById('VehicleURL').value;
	let repetitions = +document.getElementById('Repetitions').value;
	let eventType = document.getElementById('EventTypes').value;
	
	for(let n = 0; n < repetitions; ++n){
		if(eventType === "Axle"){
			eventData = new Axle();
		}
		else if(eventType === "Class"){
			eventData = new ClassEvent();
		}
		else if(eventType === "Vehicle"){
			eventData = new Vehicle();
		}
		else{
			eventData = {Text: "null object"};
		}
		sendPOST(url, eventData);
	}
}

function sendPOST(url, dataToSend){
	fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(dataToSend)
	});
}
