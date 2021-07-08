song = "";
leftwristX = 0;
leftwristY = 0;
rightwristX = 0;
rightwristY = 0;
score_leftwrist = 0;
score_rightwrist = 0;
function setup() {
  canvas = createCanvas(600, 500);
  canvas.center();

  video = createCapture(VIDEO);
  video.hide();

  poseNet = ml5.poseNet(video, modelloaded);
  poseNet.on("pose", gotPoses);
}
function draw() {
  image(video, 0, 0, 600, 500);
  fill("#FF0000");
  stroke("#FF0000");

  if (score_rightwrist > 0.2) {
    circle(rightwristX, rightwristY, 20);

    if (rightwristY > 0 && rightwristY <= 100) {
      document.getElementById("speed").innerHTML = "speed= 0.5x";
      song.rate(0.5);
    } else if (rightwristY > 100 && rightwristY <= 200) {
      document.getElementById("speed").innerHTML = "speed= 1x";
      song.rate(1);
    } else if (rightWristY > 200 && rightwristY <= 300) {
      document.getElementById("speed").innerHTML = "speed= 1.5x";
      song.rate(1.5);
    } else if (rightWristY > 300 && rightwristY <= 400) {
      document.getElementById("speed").innerHTML = "speed= 2x";
      song.rate(2);
    } else if (rightWristY > 400 && rightwristY <= 500) {
      document.getElementById("speed").innerHTML = "speed= 2.5x";
      song.rate(2.5);
    }
  }
  if (score_leftwrist > 0.2) {
    circle(leftwristX, leftwristY, 20);
    leftwrist = floor(Number(leftwristY));
    volume = leftwrist / 500;
    document.getElementById("volume").innerHTML = "volume= " + volume;
    song.setVolume(volume);
  }
}
function preload() {
  song = loadSound("music.mp3");
}
function play() {
  song.play();
  song.setVolume(1);
  //volume 0-1:0 is mute and 1 is highest
  song.rate(1);
  //speed 0.5-2.5:0.5 is slowest and 2.5 is the fastest-1 is normal
}
function modelloaded() {
  console.log("Posenet is initialized");
}
function gotPoses(results) {
  if (results.length > 0) {
    console.log(results);
    leftwristX = results[0].pose.leftWrist.x;
    leftwristY = results[0].pose.leftWrist.y;
    rightwristX = results[0].pose.rightWrist.x;
    rightwristY = results[0].pose.rightWrist.y;
    console.log("left wrist X=" + leftwristX + " left wrist y= " + leftwristY);
    console.log(
      "right wrist X=" + rightwristX + " right wrist y= " + rightwristY
    );
    score_leftwrist = results[0].pose.keypoints[9].score;
    score_rightwrist = results[0].pose.keypoints[10].score;
  }
}
