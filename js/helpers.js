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
