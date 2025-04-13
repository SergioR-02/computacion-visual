void setup() {
  size(600, 600, P3D); // 3D mode is enabled
}

void draw() {
  background(200); // Set the background color
  lights();        

  pushMatrix(); // Save the current transformation state

  translate(width/2, height/2, 0); // Move to the center of the screen

  float t = millis() / 1000.0; // Calculate time in seconds

  // Apply a wavy translation
  float wave = sin(t) * 100;
  translate(wave, 0, 0);

  // Apply a continuous rotation
  rotateY(t); 

  // Apply a cyclic scaling
  float s = 1 + 0.5 * sin(t * 2); 
  scale(s); 
  
  // Cube properties
  fill(200, 100, 255); 
  stroke(0);          
  box(100); 
  
  popMatrix(); // Restore the previous transformation state
}
