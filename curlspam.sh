#!/bin/bash
for i in {1..10}
do
	curl --header "Content-type: application/json"\
	--request POST\
	--data '{
    "eventType": "class",
    "mode": "active",
    "vehicleClassCombo": 20,
    "axles": [{
        "axleId": "16060021-1632134211598655",
        "distance": 646,
        "t1": 1632134211598655,
        "speed": 1,
        "weight": 602,
        "peakElapsedRatio": 0.4939846098423
    }, {
        "axleId": "16060021-1632134221778753",
        "distance": 688,
        "t1": 1632134221778753,
        "speed": 7,
        "weight": 432,
        "peakElapsedRatio": 0.44690781831741
    }, {
        "axleId": "16060021-1632134224233812",
        "distance": 692,
        "t1": 1632134224233812,
        "speed": 17,
        "weight": 520,
        "peakElapsedRatio": 0.41237112879753
    }, {
        "axleId": "16060021-1632134224826812",
        "distance": 281,
        "t1": 1632134224826812,
        "speed": 17,
        "weight": 324,
        "peakElapsedRatio": 0.41752576828003
    }],
    "actibumpId": "16060021",
    "totalWeight": 1878,
    "avgSpeed": 10,
    "signpostSpeed": 40,
    "nrAxles": 4,
    "classdVersion": "1.14",
    "totalDistance": 1661,
    "vehicleClass": 9,
    "eventTime": 1632134211,
    "groundFloor": 13927,
    "gapTime": 7755,
    "hatchLength": 0.46,
    "gapDistance": 646,
    "voltageToMassRatio": 2
	}'\
	http://localhost:8080/AddVehicle
done
