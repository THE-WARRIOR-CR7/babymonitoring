song="";
status1="";
objects=[];
function setup() {
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    video.size(380,380);
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="status:Object detecting";
}
function modelLoaded() {
    console.log("modelLoaded");
    status1=true;
}
function preload() {
    song=loadSound("babycry.mp3");
}
function draw() {
    image(video,0,0,380,380);
    if (status1!="") {
        r= random(255);
        g= random(255);
        b= random(255);
        objectDetector.detect(video, gotResult);
        for (i=0; i<objects.length; i++) {
            document.getElementById("status").innerHTML="Status: Object detected";
            fill(r,g,b);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15, objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label=="person"){
                song.stop();
                document.getElementById("Noobjects").innerHTML="Baby Found";
            } else if(objects[i].label != "person"){
                song.play();
                document.getElementById("Noobjects").innerHTML="Baby Not Found";
            }
        }
    }
}
function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        objects=results;
    }
}