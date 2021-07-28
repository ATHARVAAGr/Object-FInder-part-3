status="";
object=[];

var synth = window.speechSynthesis;


function setup()
{
    canvas=createCanvas(550,400);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();
}

function Start()
{
     objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="status -detecting objects";  
}

function modelLoaded()
{
    console.log("modelLoaded")
    status=true;
}

function draw()
{
    image(video, 0, 0, 550, 400);

    if(status !="")
    {
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video, gotResults);
        for(i=0; i<object.length; i++)
        {
            document.getElementById("status").innerHTML="status- object detected";
            document.getElementById("number_of_objects").innerHTML="number of objects detected are "+ object.length;
            fill(r,g,b);
            percent=floor(object[i].confidence*100);
            text(object[i].label+""+percent + "%", object[i].x,object[i].y);
            noFill();
            stroke(r,g,b);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
}

function gotResults()
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    object=results;
}

    
