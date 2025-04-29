# 🧪 Taller - Ojos Digitales: Introducción a la Visión Artificial

## 📅 Fecha  
`2025-04-29`

---

##  🎯  Objetivo del Taller

Entender los fundamentos de la percepción visual artificial mediante el procesamiento de imágenes en escala de grises, la aplicación de filtros convolucionales y la detección básica de bordes. Utilizamos OpenCV en Python para explorar cómo los computadores "ven" e interpretan estructuras visuales básicas.

---

## 🧠 Conceptos Aprendidos 

- [x] Procesamiento de imágenes en escala de grises  
- [x] Filtros convolucionales (blur, sharpen)  
- [x] Detección de bordes (Sobel y Laplaciano)  
- [x] Comparación visual de técnicas  
- [x] Interacción dinámica con sliders (Trackbars)  
- [x] Captura y procesamiento de video en tiempo real con webcam  

---

## 🔧 Herramientas y Entornos

- ✅ **Python** (Jupyter Notebook o Google Colab)  
- 📦 Librerías: `opencv-python`, `numpy`, `matplotlib` 
- 📷 Webcam para visualización en tiempo real 

---

## 📁 Estructura del Proyecto
```
2025-04-29_taller_ojos_digitales/
├── python/
│   └── taller_ojos_digitales.py  ← Código fuente
├── resultados/
│   ├── filtros_comparacion.png
│   └── sliders_dinamicos.gif
├── README.md
```

## 🧪 Implementación

### 🔹 Flujo del Procesamiento

1. **Carga de Imagen**: Se carga una imagen RGB y se convierte a escala de grises.  
2. **Aplicación de Filtros**:  
   - Blur (suavizado) con diferentes tamaños de kernel.  
   - Sharpen (afilado) con máscaras personalizadas.  
3. **Detección de Bordes**:  
   - Sobel en eje X y Y.  
   - Filtro Laplaciano.  
4. **Comparación Visual**:  
   - Resultados presentados lado a lado con `matplotlib` y `cv2.imshow`.  
5. **Interacción en Tiempo Real (Bonus)**:  
   - Uso de `cv2.createTrackbar` para modificar el tamaño del kernel en vivo.  
   - Captura en vivo desde webcam para aplicar filtros dinámicos.  

---

### 💻 Código Relevante
Se utiliza OpenCV para aplicar procesamiento de imágenes en dos secciones. En la primera, captura video en tiempo real desde la webcam, convierte cada fotograma a escala de grises y aplica un filtro Laplaciano para detectar bordes, mostrando simultáneamente la imagen original y la filtrada. 

En la segunda parte, se implementa un sistema interactivo con un slider que permite modificar dinámicamente el tamaño del kernel usado en un filtro Gaussiano (blur) aplicado sobre una imagen en escala de grises (img_gray). A medida que se ajusta el slider, la imagen desenfocada se actualiza en tiempo real.

```python
# Filtro Laplaciano en tiempo real con webcam y slider
cap = cv2.VideoCapture(0)
while True:
    ret, frame = cap.read()
    if not ret:
        break

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    edges = cv2.Laplacian(gray, cv2.CV_64F)

    cv2.imshow("Original", frame)
    cv2.imshow("Laplaciano en tiempo real", np.uint8(np.absolute(edges)))
    
    # Esperar por una tecla y cerrar la cámara si se presiona 'q'
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Liberar la cámara y cerrar todas las ventanas
cap.release()
cv2.destroyAllWindows()

def nothing(x):
    pass

cv2.namedWindow("Sliders")
cv2.createTrackbar("Kernel", "Sliders", 1, 30, nothing)

while True:
    k = cv2.getTrackbarPos("Kernel", "Sliders")
    k = max(1, k | 1)  # Asegura que el tamaño del kernel sea impar

    blur = cv2.GaussianBlur(img_gray, (k, k), 0)

    # Redimensionar la imagen antes de mostrarla
    resized_blur = cv2.resize(blur, (400, 400))  # Tamaño ajustable
    cv2.imshow("Blur dinámico", resized_blur)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cv2.destroyAllWindows()
```

## 📊 Resultados Visuales

Se visualiza una jerarquía de objetos 3D conectados mediante grupos (<group>) en React Three Fiber. Al manipular sliders de rotación y traslación aplicados al grupo padre, se observa cómo toda la estructura se transforma en conjunto. El cubo naranja (hijo) se traslada respecto al padre, la esfera azul (nieto) se posiciona encima del cubo, y el cono verde (biznieto) se ubica sobre la esfera.

![Resultado Threejs](resultados/PythonAnimation.gif)

## 🧩 Prompts Usados

- Explicame el pas a apaos para aplicar filtros con opencv en python
- Como puedo usar la webcam para procesar imagenes en tiempo real
- Explicame el paso a paso para agregar sliders con cv2.createTrackbar para modificar en vivo parámetros

---

## 💬 Reflexión Final
Este taller me ayudo a entender cómo una se pueden interpretar visualmente una imagen mediante transformaciones matemáticas. Fue bastante intuitivo aplicar y combinar filtros con OpenCV, y cómo pequeñas variaciones en el kernel generan cambios sustanciales en los resultados.

La implementación con sliders fue particularmente útil para experimentar con diferentes parámetros de forma interactiva, y utilizar la webcam añadió un componente práctico que facilita la visualización en tiempo real. Tuve algunos retos iniciales al trabajar con cv2.createTrackbar, pero la documentación de OpenCV fue clara para resolverlo.

