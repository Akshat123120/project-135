objects = [];
video = "";
status = "";
function preload(){
}
function setup(){
    video = createCapture(VIDEO);
    video.hide();
    video.size(480,380);
    canvas = createCanvas(480,380);
    canvas.center();
}
function draw(){
    image(video,0,0,480,380);
    if(status!=""){
        objectDetector.detect(video,gotResults);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML = "Status: Detecting Objects";
            fill("blue");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("red");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label==object_name){
                video.Stop();
                objectDetector.detect(gotResults);
                document.getElementById("object_status").innerHTML = object_name+"Found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(object_name+"found");
                synth.speak(utterThis);          
            }
            else{
                document.getElementById("object_status").innerHTML = object_name+"Not Found";
            }
        }
    }
}
function start(){
    objectDetector = ml5.objectDetector("cocoSSD",modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    object_name = document.getElementById("object_name").value;
}
function modelLoaded(){
    console.log("Model Loaded");
    status = true;
}
function gotResults(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}