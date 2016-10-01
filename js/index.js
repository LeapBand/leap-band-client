var instruments = new Instruments();

Leap.loop(function(frame){

    frame.hands.forEach(function(hand, index) {
        instruments[0].process(hand, index);
    });

});
