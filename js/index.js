var instruments = new Instruments();

Leap.loop(function(frame){
	instruments.process(frame);
});
