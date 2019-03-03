var dropzone;
var file;
var fileloaded=false;
var analyzer;
var fft;
var wrapper;
var roller;
var amp =0.3;

function setup(){
  createFileInput(handleFile);
  
  
  var cnv = createCanvas(500,500);
  cnv.mouseClicked(togglePlay);
  fft = new p5.FFT();
  // create a new Amplitude analyzer
  analyzer = new p5.Amplitude();

  // Patch the input to an volume analyzer
  
  	wrapper =600;
  	roller  =200;
  
	circleLines=false;
	circleWave=false;
	pulse=false;
	colors=false;
	reg=false;
	
  	noLoop();
}
var dampers=[];
var sDampers=[];
var amplitudeDamper=0;
var rot=[];
;
var damp=0.2;
for(var i = 0;i< 1024;i++){
	dampers.push(0);
	rot.push(0);
	sDampers.push(0);
}
var multi=1;
function draw(){
	var spectrum = fft.analyze();


  background(133);


  if(pulse){
  	fill(0,0,0);
  	push();
  	translate(width/2,height/2);
  	

  	radius=amplitudeDamper+=damp*(map(analyzer.getLevel(), 0, 1, 100, 800)-amplitudeDamper);
  	ellipse(0,0,radius*multi,radius*multi);
  	pop();

  }
  
  //              Regular
  if(reg){
  
  
  stroke(0,255,0);
  noFill();
  for (var i = 0; i< spectrum.length; i+=3){
  	strokeWeight(.5);
    var x = map(i, 0, spectrum.length, 0, width);
    var h = map(spectrum[i], 0, 255, 0, height);
    line(x,height,x,height-h);
  }
  }
  // rectMode(CENTER);
  
  // Regular with damping
  // stroke(30,40,150);
  // strokeWeight(6);
  // fill(0,255,0); // spectrum is green
  // for (var i = 200; i< spectrum.length-450; i+=5){
  //   var x = map(i, 200, spectrum.length-650, 0, width);
  //   var h = dampers[i] += 0.1 * (map(spectrum[i], 0, 255, height, 0)-dampers[i]);
  //   line(x, height, x, h+10);
  // }
  
  //Damping and spinning.
  
   // spectrum is green
  // for (var i = 0; i< spectrum.length-300; i+=30){
  // 	fill(255,99,71);
  //   rot[i] = h/10;
  //   var x = map(i, 0, spectrum.length-300, 0, width);
  //   var h = dampers[i] += 0.1 * (map(spectrum[i], 0, 255, height, 0)-dampers[i]);
  //   push();
    
  //   translate(x,h);
  //   rotate(rot[i]);
  //   rect(0, 0, 20*width / spectrum.length, 20*width / spectrum.length);
    
  //   pop();
    
  // 
  // bars


  // var waveform = fft.waveform();
  // noFill();
  if(circleLines){
	  strokeWeight(3);

	  
	  if(!colors){
	  	stroke(51);
	  }	
	  beginShape();
	  for (var i = roller; i < spectrum.length-wrapper; i++){
	  	if(colors){
	  		stroke(map(i,200,spectrum.length-wrapper,0,255),map(i,200,spectrum.length-wrapper,255,0),255);
	  	}
	  	push();
	  	translate(width/2,height/2);
	  	rotate(i*2*PI/(spectrum.length-(wrapper+roller)));
	  	vertex(0,30);
	    var h = sDampers[i]= 0.2*(map(spectrum[i], 0, 255, 0, height)-sDampers[i]);
	    if(pulse){
	    	line(0,multi*radius*0.523,0,multi*0.523*radius+(h*2))
	    }else{
	    	line(0,multi*125,0,multi*125+(h*3))
	    }
	    
	    pop();
	    endShape(CLOSE);
	  }
	}
	  if(circleWave){
	  var waveform = fft.waveform();
	  noFill();
	  push();
	  translate(width/2,height/2);
	  stroke(255,0,0); // waveform is red
	  beginShape();
	  strokeWeight(.5);
	  for (var i = 0; i< waveform.length; i+=1){
	  	if(pulse){
	  		var unit = multi*radius*.25;
	  	}else{
	  		var unit = multi*125;
	  	}
	  	var rot = i*(2*PI)/waveform.length;
	  	var leng = unit+(130*waveform[i]);
	  	vertex(leng*cos(rot),leng*sin(rot));
	  }
	  endShape(CLOSE);
	  pop();



	  	// waveform[i]=sqrt(waveform[i])
	  	// push();
	  	// translate(width/2,height/2);
	   //  rotate(i*0.05);
	   //  var y = dampers[i] += 0.2 * (map(waveform[i], -1, 1, 50, 75)-dampers[i]);
	   //  //var y = map(waveform[i],-1,1, 0, 100);
	    
	   //  ellipse(y+radius-30,0,2,2);
	   //  pop();
	  
	  
	}
   
  fill(255,255,255);
  stroke(255,255,255);
  strokeWeight(.1);
  text('click to play/pause', 4, 10);
}

// fade sound if mouse is over canvas
function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop();
  }
}
function a(){

}
function b(){

}
function keyPressed() {
  if(key=='1'){
  	reg=!reg;
  }
  if(key =='5'){
  	pulse=!pulse;
  }
  if(key =='2'){
  	circleLines=!circleLines;
  	
  }
  if(key =='3'){
  	circleWave=!circleWave;
  }
  if(key=='p'){
  	wrapper+=20;
  }
  if(key=='o'){
  	wrapper-=20;
  }
  if(key=='l'){
  	roller+=20;
  }
  if(key=='k'){
  	roller-=20;
  }
  if(key=='m'){
  	amp+=0.1;
  	sound.amp(amp);
  }
  if(key=='n'){
  	amp-=0.1;
  	sound.amp(amp);
  }
  if(key =='4'){
  	colors=!colors;
  }
  if(keyCode===UP_ARROW){
  	multi+=.05;
  }
  if(keyCode===DOWN_ARROW){
  	multi-=.05;
  }
  if(keyCode===RIGHT_ARROW){
  	damp=damp+=.005;
  }
  if(keyCode===DOWN_ARROW){
  	dampdamp-=.005;  
  }
  
}
function handleFile(file){
	this.file=file;
	sound=loadSound(file);
	analyzer = new p5.Amplitude();
	analyzer.setInput(sound);
	fft = new p5.FFT();
	sound.amp(amp);
	loop();
}
