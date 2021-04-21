var song1 = "";
var song2 = "";
song1_status = "";
song2_status = "";
l_score = 0;
r_score = 0;
l_wristX = 0;
l_wristY = 0;
r_wristX = 0;
r_wristY = 0;
playing = "false";

function preload() {
    song1 = loadSound('Fight Back.mp3');
    song2 = loadSound('Unstoppable.mp3');
}

function setup() {
    canvas = createCanvas(350, 350);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelloaded);
    poseNet.on('pose', gotposes);
}

function draw() {
    image(video, 0, 0, 400, 350);

    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();
    console.log(song1_status);
    
    fill('#E4f9f5');
    stroke('#ffffff');

    if (l_score >= 0.02) {
        circle(l_wristX, l_wristY, 15);
        song2.stop();

        if (song1_status == false) {
            console.log("I was Right");
            if (playing == "true") {
                setTimeout(function(){    
                    song1.play();
                }, 2000);
                document.getElementById("song_status").innerHTML = "1st Song is Playing";
                document.getElementById("song_status2").innerHTML = "2nd Song";
            }
        }
    }
    if (r_score >= 0.02) {
        circle(r_wristX, r_wristY, 15);
        song1.stop();

        if (song2_status == false) {
            console.log("I was Right Again");
            if (playing == "true") {
                setTimeout(function(){    
                    song2.play();
                }, 2000);
                document.getElementById("song_status2").innerHTML = "2nd Song is Playing";
                document.getElementById("song_status").innerHTML = "1st Song";
            }
        }
    }
}

function modelloaded() {
    console.log("Pose Net Ready");
}

function gotposes(results) {
    if (results.length > 0) {
        console.log(results);

        l_wristX = results[0].pose.leftWrist.x;
        l_wristY = results[0].pose.leftWrist.y;
        r_wristX = results[0].pose.rightWrist.x;
        r_wristY = results[0].pose.rightWrist.y;
        l_score = results[0].pose.keypoints[9].score;
        r_score = results[0].pose.keypoints[10].score;

        console.log("Left Wrist X = " + l_wristX);
        console.log("Left Wrist Y = " + l_wristY);
        console.log("Right Wrist X = " + r_wristX);
        console.log("Right Wrist Y = " + r_wristY);
        console.log("Score Left Wrist = " + l_score);
    }
}

function play() {
    window.alert("When Your Left Wrist is visible in the camera, It will play a song & When your Right wrist is visible in the camera it will play another song. :-D");
    song1.setVolume(1);
    song1.rate(1);
    window.alert("Show one of your wrists to start playing the song");
    playing = "true";
}