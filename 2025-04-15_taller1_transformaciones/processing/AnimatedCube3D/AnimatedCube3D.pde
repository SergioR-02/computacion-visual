void setup() {
  size(600, 600, P3D); // Se activa el modo 3D
}

void draw() {
  background(200); // Se establece el color de fondo
  lights();        

  pushMatrix(); // Se guarda el estado inicial

  translate(width/2, height/2, 0); // Se traslada al centro de la pantalla

  float t = millis() / 1000.0; // Calcular el tiempo en segundos

  // Se aplica una translacion ondulada
  float wave = sin(t) * 100;
  translate(wave, 0, 0);

  // Aqui s aplica una rotacion continua
  rotateY(t); 

  // Aplicar un escalado ciclico
  float s = 1 + 0.5 * sin(t * 2); 
  scale(s); 
  
  //Propiedades del cubo
  fill(200, 100, 255); 
  stroke(0);          
  box(100); 
  
  popMatrix(); // Restaurar el estado inicial
}
