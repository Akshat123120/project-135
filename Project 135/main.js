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