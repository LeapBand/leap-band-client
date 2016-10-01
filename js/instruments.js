var handOnCooldown = {};

function toggleCooldown(hand) {
    handOnCooldown[hand] = !handOnCooldown[hand];
}


var drums = function(){
    this.process = function(hand, index){
        if (hand.palmVelocity[1] < -400) {
            if (!handOnCooldown[hand.id]){
                var handX = hand.palmPosition[0],
                    handZ = hand.palmPosition[2];
                var data = {
                    instrument: "drums", 
                    volume: hand.palmVelocity[1]
                };
                if (handX > 0 && handZ > 0){
                        //bottom right
                        data.type = "kick";
                }
                else if (handX > 0 && handZ < 0){
                        data.type = "hiHat";
                }
                else if (handX < 0 && handZ > 0){
                    //Bottom Left Drum
                    data.type = "snare";
                }
                else if (handX < 0 && handZ < 0){
                    //Top Left Drum
                    data.type = "tom";
                }

                sendInstrumentData(data);
                
                toggleCooldown(hand.id);
                setTimeout(function(){
                    toggleCooldown(hand.id)
                }, 250);
            }
        }
    }
};
