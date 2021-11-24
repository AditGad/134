
status="";
objects=[];
song="";
function preload(){
song=loadSound("music.mp3");
}

function setup(){
canvas=createCanvas(600,400);
canvas.center();
video=createCapture(VIDEO);
video.size(600,400);
video.hide();
objectdetector=ml5.objectDetector("cocossd",modalloaded);
document.getElementById("status").innerHTML="status=detecting objects";
}

function modalloaded(){
    console.log("modalloaded");
    status=true;
}

function getresult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
objects=results;
}

function draw(){
image(something,0,0,600,400);
if(status!=""){
    r=random(255);
    g=random(255);
    b=random(255);
    objectdetector.detect(something,getresult);
    for(i=0;i<objects.length;i++)
    {

        document.getElementById("status").innerHTML="status=objects detected";
        document.getElementById("numberofobjects").innerHTML="Number Of Objects Are:-"+objects.length;
        fill(r,g,b);
    
        noFill();
        stroke(r,g,b);
        percent=floor(objects[i].confidence*100);
        text(objects[i].label+" "+percent+"%",objects[i].x+7,objects[i].y+15);
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        if(objects[i].label=="person"){
            document.getElementById("numberofobjects").innerHTML="baby found";
            song.stop();
        }
        else{
            document.getElementById("numberofobjects").innerHTML="baby not found";
            song.play();
        }
        if(objects.length==0){
            document.getElementById("numberofobjects").innerHTML="baby not found";
            song.play();
        }
    }
}

}