function distance(pos1, pos2) {
	return Math.sqrt(Math.pow((pos2[2] - pos1[2]), 2) + Math.pow((pos2[1] - pos1[1]), 2) + Math.pow((pos2[0] - pos1[0]), 2));
}

function averageFingerDistance(fingers) {
	var sumDistances = 0;
	for (i = 1; i < fingers.length; ++i) {
		sumDistances = sumDistances + distance(fingers[i].tipPosition, fingers[0].tipPosition);
	}
	return sumDistances / (fingers.length - 1);
}

// E.g.: scale(50, 400, 0, 800, 217)
//		=> ~400
// Note: Input values out of range will be clamped to their boundaries
function scale(inputMin, inputMax, outputMin, outputMax, value) {
	value = clamp(inputMin, inputMax, value);
	var inputRange = inputMax - inputMin;
	var outputRange = outputMax - outputMin;
	return (((value - inputMin) / inputRange) * outputRange) + outputMin;
}
