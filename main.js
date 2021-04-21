var song1 = "";
var song2 = "";
l_wristX = 0;
l_wristY = 0;
r_wristX = 0;
r_wristY = 0;

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

        console.log("Left Wrist X = " + l_wristX);
        console.log("Left Wrist Y = " + l_wristY);
        console.log("Right Wrist X = " + r_wristX);
        console.log("Right Wrist Y = " + r_wristY);
    }
}

function play() {
    window.alert("When Your Left Wrist is visible in the camera, It will play a song & When your Right wrist is visible in the camera it will play another song. :-D");
    song1.setVolume(1);
    song1.rate(1);
    song1.play();
}