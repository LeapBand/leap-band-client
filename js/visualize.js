var drawCircle;

var showInstrument;

$( document ).ready(function() {
    var $title = $("#title"),
        $subtitle = $("#subtitle");
    $title.delay(1000).fadeIn(400);
    $subtitle.delay(2000).fadeIn(500);


    var canvas = document.getElementById("displayArea"),
        heightToSubtract = $title.height() + $subtitle.height(),
        height = $(document.body).height() - heightToSubtract,
        width =  $(document.body).width();


    //update window on resize
    $(window).resize(function() {
        height = $(document.body).height() - heightToSubtract;
        width =  $(document.body).width();
        canvas.width = width;
        canvas. height = height;
    });

    canvas.width = width;
    canvas. height = height;
    var ctx = canvas.getContext("2d");
    var circles = {};

    function Circle(x,y, config) {
        var id = Math.random();
        circles[id] = this;
        var i = 100;

        this.draw = function() {
            ctx.beginPath();
            ctx.arc(x, y, i-2,0 , 2*Math.PI, false);
            var track = i/3;
            ctx.fillStyle = config.color;
            ctx.fill();
            i--;

            if (track < 10) {
                delete circles[id];
            }
        }
    }

     setInterval(function() {
        ctx.clearRect( 0 , 0 , canvas.width , canvas.height );
        for (var key in circles) {
            circles[key].draw();
        }
    }, 1);


    drawCircle = function(config) {
        var x = Math.floor(Math.random() * width);
        var y = Math.floor(Math.random() * height);
        console.log("Drawing at X: " + x + " and Y: " + y);
        var circle =new Circle(x, y, config);
        circle.draw();
    }

    showInstrument = function(instrumentName){
        $("#notifications").html(instrumentName).show().fadeOut(2000);
    }

});
