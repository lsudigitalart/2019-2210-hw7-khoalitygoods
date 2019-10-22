var fasterCar
var playTime, loadTime;
var amp, level;

function preload (){
  fasterCar = loadSound("FasterCar.mp3");
}

function setup() {
createCanvas(710, 400, WEBGL);

  amp = new p5.Amplitude();
  fft = new p5.FFT();
} 

function keyPressed () {

  if (fasterCar.isLoaded()) {
    loadTime = millis();
    print (loadTime);
    fasterCar.play();
}

}

function draw() {
  background(250);
  let radius = width * 1.5;
  playTime = millis() - loadTime;
  level = amp.getLevel();
  mappedColor = map(level, 0, 1, 0, 255);
  cSize = map(level, 0, 1, 0, width);
  let lerping = lerpColor(color("green"), color("blue"), level)



  if (playTime > 6000) {
    for (var i = 0; i < width; i++) {
      grad1 = lerpColor(color("purple"), color("yellow"), level);
      stroke(grad1);
      line(i, 0, i, height);
    }
  }



  fill(0);
  background(mappedColor);
  (width / 2, height / 2, cSize);

  var trebleVol = fft.getEnergy("treble");
  var midVol = fft.getEnergy("mid");
  var bassVol = fft.getEnergy("bass");



   orbitControl();

   normalMaterial();
   translate(0, 0, -600);
   for (let i = 0; i <= 12; i++) {
     for (let j = 0; j <= 12; j++) {
       push();
       let a = (j / 12) * PI;
       let b = (i / 12) * PI;
       translate(
         sin(2 * a) * radius * sin(b),
         (cos(b) * radius) / 2,
         cos(2 * a) * radius * sin(b)
       );
       var spectrum = fft.analyze();
       var trebleVol = fft.getEnergy("treble");
       var midVol = fft.getEnergy("mid");
       var bassVol = fft.getEnergy("bass");
       if (j % 2 === 0) {
         cone(30, midVol);
       } else {
         box(width/ 10 , height/ 10, cSize);
         fill(255);
          box(30 , 30, trebleVol);
          box(30, 30, midVol);
          box(30, 30, bassVol);


       }
       pop(); 
     }
   }
 }


