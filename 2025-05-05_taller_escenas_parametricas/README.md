# 🧪 Taller - Escenas Paramétricas: Creación de Objetos desde Datos

## 📅 Fecha

`2025-05-05` – Fecha de realización

---

## 🎯 Objetivo del Taller

El objetivo principal de este taller es aprender a generar objetos y escenas 3D de manera programática utilizando Python. Se busca explorar cómo crear geometría 3D flexiblemente a partir de datos estructurados (como archivos CSV o JSON), empleando bucles y condicionales para controlar parámetros como posición, forma, tamaño y color, y finalmente exportar las escenas resultantes a formatos estándar como OBJ, STL o PLY.

---

## 🧠 Conceptos Aprendidos

Lista de conceptos clave aplicados en el taller:


*   **Generación Procedural 3D:** Crear geometría mediante algoritmos en lugar de modelado manual.
*   **Modelado Paramétrico:** Definir objetos 3D a través de parámetros (coordenadas, tamaño, tipo).
*   **Diseño Basado en Datos:** Utilizar datos externos (CSV/JSON) como fuente para la creación de contenido.
*   **Manipulación de Geometría 3D:** Creación y manejo de primitivas (Cubos, Esferas, Cilindros).
*   **Programación con Python:** Uso de estructuras de control (bucles `for`, condicionales `if/elif`).
*   **Bibliotecas Python 3D:** Uso práctico de `vedo`, `trimesh` y `open3d` para crear, visualizar y manipular mallas 3D.
*   **Manejo de Datos:** Lectura y procesamiento de archivos CSV/JSON con las bibliotecas `csv` y `json`, y uso de `numpy` para operaciones numéricas.
*   **Exportación de Formatos 3D:** Guardar las escenas/objetos generados en formatos estándar de la industria como `.obj`, `.stl`, `.ply`.

---

## 🔧 Herramientas y Entornos

Especifica los entornos usados:

- Python Jupyter Notebook (`.ipynb`)
*   **Bibliotecas Python:**
    *   `vedo`: Para creación, visualización y manipulación inicial de objetos 3D.
    *   `trimesh`: Para procesamiento de mallas y exportación (especialmente escenas combinadas).
    *   `open3d-python`: Para conversión de mallas y exportación (especialmente formato PLY).
    *   `numpy`: Para manejo eficiente de arrays numéricos (coordenadas, vértices, caras).
    *   `csv`: Para leer datos desde archivos CSV.
    *   `json`: (Opcional, si se usara JSON) Para leer datos desde archivos JSON.
    *   `os`: Para manejo de rutas de archivos y directorios.


---

## 📁 Estructura del Proyecto
```
2025-05-05_taller_escenas_parametricas/
├── threejs/
├── datos/         # Archivo de datos de entrada
├── python/        # Notebook con el código del taller
│ ├── exports/     # Carpeta con los archivos 3D exportados
├── resultados/    # Carpeta para resultados visuales
└── README.md      # Este archivo de documentación
```
## 🧪 Implementación

Explica el proceso:

### 🔹 Etapas realizadas

#### 🐍 Python
1. **Preparación de Datos:**  Se cargó el archivo `datos_escena.csv` con información sobre cada objeto (`x`, `y`, `z`, `forma`, `color`, `tamano`) mediante la función `leer_csv`, generando una lista de diccionarios.

2. **Generación de Geometría Paramétrica:**  Se recorrió la lista de objetos, extrayendo sus atributos. Según el campo `forma`, se creó la primitiva correspondiente de `vedo` (`Cube`, `Sphere`, `Cylinder`), asignando posición, tamaño y color. Todos los objetos se almacenaron en `objetos_generados`.

3. **Exportación Multi-Biblioteca:**
   - **Vedo:** Se combinaron los objetos (`merge`) y se exportaron en `.obj` y `.stl`.
   - **Trimesh:** Se convirtieron a mallas trianguladas, se agruparon en una `Scene` y se exportaron a `.stl`.
   - **Open3D:** Se transformaron a `TriangleMesh` (con triangulación y normales) y se exportaron individualmente en `.ply`.

#### 🌐 React.js
1. Generación programática de una lista de objetos con coordenadas y parámetros.
2. Parametrización de propiedades usando `Leva`.
3. Renderizado de la escena con `Three.js` y animación por frame.
4. Captura de resultados animados con Peek.

###  🔹 Código relevante

### 🐍 Python  
El núcleo del proceso reside en este bucle, que recorre cada registro de datos leído (por ejemplo, del CSV). Para cada uno, extrae los parámetros definidos (posición, forma, color, tamaño) y emplea una estructura condicional if/elif para determinar dinámicamente qué primitiva 3D específica (vedo.Cube, vedo.Sphere, etc.) debe ser creada basándose en el parámetro forma. La biblioteca vedo se encarga de instanciar el objeto geométrico correspondiente con dichos parámetros, y cada objeto resultante se acumula en la lista objetos_generados, construyendo así la escena completa de forma programática y basada en los datos de entrada para su posterior visualización o exportación.

```python
# Procesar los datos y generar los objetos 3D
for i, dato in enumerate(datos):
    # Coordenadas 3D
    punto = [dato["x"], dato["y"], dato["z"]]

    # Forma y parámetros
    forma = dato["forma"]
    color = dato["color"]
    tamano = dato["tamano"]

    print(f"\nProcesando punto {i}: {punto} - Forma: {forma}, Color: {color}, Tamaño: {tamano}")

    # Crear el objeto correspondiente según la forma
    objeto_3d = None
    if forma == "cubo":
        objeto_3d = vedo.Cube(pos=punto, side=tamano, c=color)
    elif forma == "esfera":
        objeto_3d = vedo.Sphere(pos=punto, r=tamano, c=color)
    elif forma == "cilindro":
        objeto_3d = vedo.Cylinder(pos=punto, r=tamano, height=tamano*2, c=color)

    # Añadir el objeto generado a la lista (si se creó uno válido)
    if objeto_3d:
        objetos_generados.append(objeto_3d)
```

### 🌐 React Three Fiber (App.jsx)
Utiliza el hook useFrame de React Three Fiber para ejecutar una función en cada frame del renderizado. Si el parámetro animateRotation está activado, se aplica una rotación incremental en el eje Y a todo el grupo de objetos (groupRef). Esto genera una rotación suave y constante de la escena 3D.

La generación dinámica de objetos se realiza mediante un mapeo (map) sobre el array base rawData, creando un nuevo arreglo data cuyas propiedades —posición, color, rotación y escala— se ajustan en tiempo real según los controles definidos en la interfaz. Esto permite modificar el espaciado entre objetos, aplicar un color uniforme, alternar entre rotación aleatoria o fija, y definir un tamaño base común, logrando así una visualización paramétrica y flexible.

```jsx
// Animación por frame y mapeo dinámico de objetos 3D
useFrame(() => {
  if (animateRotation && groupRef.current) {
    groupRef.current.rotation.y += 0.01
  }
})

const data = rawData.map((item, i) => ({
  ...item,
  position: [i * spacing, 0, 0],
  color: colorBase,
  rotation: randomizeRotation ? Math.random() * Math.PI : item.rotation,
  scale: baseSize,
}))
```
Este bloque define los parámetros ajustables desde la interfaz de usuario. Se pueden cambiar en tiempo real sin recargar la escena:

```jsx
const {
  globalScale,
  geometryType,
  baseSize,
  spacing,
  colorBase,
  lightIntensity,
  randomizeRotation,
  animateRotation,
} = useControls({
  globalScale: { value: 1, min: 0.1, max: 3 },
  geometryType: { options: { Cube: 'cube', Sphere: 'sphere' } },
  baseSize: { value: 1, min: 0.2, max: 3 },
  spacing: { value: 2, min: 1, max: 5 },
  colorBase: '#ffaa00',
  lightIntensity: { value: 1, min: 0, max: 10 },
  randomizeRotation: false,
  animateRotation: false,
})

```

## 📊 Resultados Visuales
### 🐍 Python   
![Resultado Python](resultados/PythonResultado.gif)



### 🌐 React  

![Resultado Processing](resultados/ThreejsResultado.gif)



---

🧩 Prompts Usados

- Genera una lista de 20 coordenadas aleatorias en 3D dentro de un cubo de lado 10 usando numpy.
- A partir de una lista de puntos 3D, crea una esfera de radio variable en cada punto usando vedo.
- Recorre un array de puntos y genera una malla de cubos o cilindros alternando entre ellos con un condicional.
- Exporta la escena completa como archivo .OBJ utilizando vedo.write('escena.obj').
- Crear una escena 3D donde 10 objetos se generen dinámicamente desde datos con forma, posición y color controlables
- Agrega animación de rotación al grupo completo si se activa un parámetro booleano
- Dame mejores estilos CSS para que el canvas ocupe todo y tenga una estética profesional

---

💬 Reflexión Final  

Reforcé mi comprensión sobre cómo la programación puede usarse para automatizar tareas de modelado que serían repetitivas manualmente, permitiendo crear escenas complejas o variadas simplemente modificando un archivo de datos de entrada. Aprender a interactuar con diferentes bibliotecas 3D de Python (vedo, trimesh, open3d) y entender sus fortalezas y cómo convertir datos entre ellas fue un punto clave.

Ademas practique el del renderizado 3D en la web de forma declarativa usando React Three Fiber, y cómo los datos pueden controlarse en tiempo real gracias a herramientas como Leva. El poder generar escenas de forma dinámica desde listas de datos abre muchas posibilidades en visualización interactiva, simulaciones y prototipos rápidos.

Me parecio bastante interesante ver cómo pequeños parámetros pueden alterar por completo la escena, y cómo combinar animación con control de interfaz en tiempo real. Mejoraría en el futuro la estructura de los datos, permitiendo cargarlos desde un archivo JSON o API externa, y consideraría exportar las escenas como GLTF o usarlas en entornos más complejos como WebXR.

La parte más desafiante y en la que tuve varios probleas due el uso de trimesh y open3d, para la exportacion de archivos, ya que muchas funciones importantes para realizar la exportacion eran de versiones muy anteirors, ademas de eso me parecio bastante interesante  ver cómo una simple tabla de datos CSV se transformaba en una visualización 3D tangible. El principal desafío técnico radicó en comprender las diferentes representaciones internas de las mallas en cada biblioteca (especialmente cómo definen las caras/triángulos) y asegurar que las conversiones y exportaciones se realizaran correctamente para obtener archivos válidos en formatos estándar como OBJ, STL y PLY. La depuración de problemas de exportación o conversión requirió atención a los detalles de los tipos de datos y estructuras esperadas por cada función.

