const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVQXYZ";
const NUMBERS = "0123456789";

class LayoutTestEvent {
	constructor() {
		this.eventTime = getCurrentUnixTime();
		this.eventType = "LayoutTest";
		this.Text = "Lorem ipsum dolor sit amet";
	}
}

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

class NumberPlate {
	constructor() {
		this.packetCounter = "5846207";
		this.capture_timestamp = Date.now(); //Unix time in milliseconds?
		this.frame_timestamp = "0";
		this.capture_ts = "1632487717667000000";
		this.current_ts = "343347456943191";
		this.current_ts2 = "1632487728494066161";
		this.datetime = "20210924 144848000";
		this.regUTF8 = "(null)";
		this.regionUTF8 = "(null)";
		this.plateCountry = "SWE";
		this.plateConfidence = "0.803737";
		this.carState = "lost";
		this.roiID = "1";
		this.geotag = {
			lat: 59.406249,
			lon: 17.954855
		};
		this.imageType = "plate";
		this.plateImageType = "png";
		this.plateImageSize = "0";
		this.carMoveDirection = "in";
		this.timeProcessing = "0";
		this.plateCoordinates = [611, 41, 132, 28];
		this.plateCoordinatesRelative = [0, 0, 0, 0];
		this.carID = "765101";
		this.GEOtarget = "Camera";
		this.camera_info = {
			SerialNumber: "B8A44F15FF5B",
			ProdShortName: "AXIS Q1700-LE",
			MACAddress: "B8:A4:4F:15:FF:5B"
		};
		this.sensorProviderID = "an0001_c1";
		this.type_class = "I";
		this.vehicle_type = "PB";
		this.colour = "SVART";
		this.city = "FAKESVILLE, Sweden";
		this.owner_type = null;
		this.vehicle_name = "VOLVO D + XC60";
		this.vehicle_purchase_type = "XC60";
		this.year_made = null;
		this.total_weight = randomInt(1000, 3000);
		this.emission_class = null;
		this.nr_passengers = 4;
		this.height = 1713;
		this.fuel_1_sound_level = 73;
		this.fuel_1_co2 = 73;
		this.post_code = "17270";
		this.county = null;
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
		else if (eventType === "Number plate") {
			eventData = new NumberPlate();
        }
		else{
			eventData = new LayoutTestEvent();
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
