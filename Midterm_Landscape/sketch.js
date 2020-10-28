let stars = [];
let noiseArray = [];
let clouds = [];
let trees = [];
let xOff = 0.0;
let yOff = 0.0;
let tree1;
let mount1, mount2, mount3;
let planemove;
let changeDirection;
let airplane;
let phone;
let rocket;
let rocketY = 100;
let clicksound;

function preload(){
  
  tree1 = loadImage('tree.png');
  airplane = loadImage('airplane_reversed.png')
  cloud = loadImage('cloud.png')
  phone = loadImage('phone.png')
  rocket = loadImage('rocket.png')
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  
  clicksound = loadSound("clicksound.mp3");

  mount1 = new Mountain (0.01, 1, 100, 3);
  mount2 = new Mountain (0.008, 1, 90, 2);
  mount3 = new Mountain (0.005, 1, 80, 1);
  
  //creating array for star values:random 
  for (r = 0; r < 200; r++){
		let star = {
			x:random(0,width),
			y:random(0,height)
        }
		stars.push(star);	
       }
  
  	pixelDensity(1);
  
  //setting plane directions so that it moves across the screen and back
  	planemove = 1;
	changeDirection = false;
  
  //setting cloud start points
  for(let i=0;i<50;i++){
		let start = random(10*width);
		clouds[i]= new Cloud (start);
	}
  
    //setting tree start points
  for(let i=0;i<70;i++){
		let start = 0;
		trees[i]= new Tree (start);
	}
}

function draw() {
  background(0);
   if (mouseIsPressed){ //turn the sky into space(black color)
      background(255);
    } else {  //background gradient
  	loadPixels();
	for (let yPixel = 0; yPixel < height; yPixel++) {
		for (let xPixel = 0; xPixel < width; xPixel++) {
			let index = (xPixel + yPixel * width)*4; 
		//
		//pixels[index+0] = xPixel; //r color
		pixels[index+1] = 0; //g color
		pixels[index+2] = yPixel; //b color
		pixels[index+3] = 200; //alpha color
		}
	}
	updatePixels();
      }
  
  
  //drawing holding a phone
  imageMode(CENTER);
  image(phone,mouseX, mouseY, 350,350);
  
  //draw rocket
  imageMode(CORNER);
  image(rocket,random(-2,2), rocketY);

  //drawing the sun with noise
  xOff = xOff + 0.008;
  noStroke();
  fill(255,230,35,170);
  let eSizeN = width*noise(xOff);
  ellipse(windowWidth/9,height/6,eSizeN/4,eSizeN/4);
  

  //drawing the stars
  for (r = 0; r < 200; r++){
	let x = stars[r].x;
	let y = stars[r].y;
	fill(250);
	ellipse(x,y,random(5,3),random(5,3));
	}
  
  //call the mountains
  mount1.show();
  mount2.show();
  mount3.show();

  
  //cloud arrays
  for (let i=0; i< clouds.length ; i++){ //go through array of clouds
        clouds[i].move();
        clouds[i].show();
    }

  //tree arrays
  for (let w = 0; w < trees.length ; w++){
    trees[w].move();
    trees[w].show();
  }
  
  //drawing the ground 
  noStroke();
  fill(255,190,150);
  rect(0, windowHeight-100, windowWidth, windowHeight - 200);

  
  imageMode(CORNER);
  image(airplane,planemove, 0);
  if (planemove > width) {
    changeDirection=true}
  else if (planemove<=0){
    changeDirection=false}
  if (planemove>=0 && changeDirection == false){
		planemove=planemove+1}
  	else if(changeDirection == true){
		planemove=planemove-1}
  
  //drawing UFO
  let a = random (0,255);
  let b = random (0,255);
  let c = random (0,255);
  fill(a,b,c);
  ellipse((frameCount % 600),500,160,20);
  ellipse((frameCount % 600),500,80,80);
}

class Mountain {
  constructor(abc, cde, offset, speed){
    this.abc = abc;
    this.cde = cde;
    this.offset = offset;
    this.speed = speed;
    this.b =100;
    this.begin = 0;
  }
  
  show(){
    beginShape();
    let xOff = this.begin;
    vertex(0, windowHeight);
    for (this.x = 0; this.x < width; this.x += this.speed){
      let y = map(noise(xOff), 0, this.cde, windowHeight/1.5 - this.offset, windowHeight - this.offset);
      stroke(180,18,230);
      fill(228,18,90,180);
      vertex(this.x, y);
      xOff += this.abc;
    
    }
    vertex(windowWidth, windowHeight);
    endShape();
    this.begin += this.abc
  }
}

class Cloud { //CLOUDS
  constructor(startX){
    this.x= startX;
    this.speed = -1.0;
  }
  
  move(){
    this.x+= this.speed;
  }
  
  //draw the cloud
  show(){
    image(cloud,this.x,50,200,150);
  }
}

class Tree {
    constructor(startX){
    this.x= startX;
    this.speed = 1.0;
  }
  
  move(){
    this.x+= this.speed;
  }
  
  //draw the tree
  show(){
    image(tree1,this.x,windowHeight-290,200,200);
  }
}

function keyPressed(){
  if (keyCode == DOWN_ARROW)
    {rocketY = rocketY + 50;
    
    } else if (keyCode == UP_ARROW){
    rocketY = rocketY - 50;
  }   
}

function mousePressed(){
    clicksound.play();
}
