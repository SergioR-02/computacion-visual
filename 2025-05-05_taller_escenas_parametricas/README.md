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
├── datos/         # Archivo de datos de entrada
├── python/        # Notebook con el código del taller
│ ├── exports/     # Carpeta con los archivos 3D exportados
├── resultados/    # Carpeta para resultados visuales
└── README.md # Este archivo de documentación
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



```jsx

```


## 📊 Resultados Visuales
### 🐍 Python   
![Resultado Processing](resultados/PythonResultado.gif)



### 🌐 React  

![Resultado Processing](resultados/PythonResultado.gif)



---

🧩 Prompts Usados




---

💬 Reflexión Final  

Reforcé mi comprensión sobre cómo la programación puede usarse para automatizar tareas de modelado que serían repetitivas manualmente, permitiendo crear escenas complejas o variadas simplemente modificando un archivo de datos de entrada. Aprender a interactuar con diferentes bibliotecas 3D de Python (vedo, trimesh, open3d) y entender sus fortalezas y cómo convertir datos entre ellas fue un punto clave.

La parte más desafiante y en la que tuve varios probleas due el uso de trimesh y open3d, para la exportacion de archivos, ya que muchas funciones importantes para realizar la exportacion eran de versiones muy anteirors, ademas de eso me parecio bastante interesante  ver cómo una simple tabla de datos CSV se transformaba en una visualización 3D tangible. El principal desafío técnico radicó en comprender las diferentes representaciones internas de las mallas en cada biblioteca (especialmente cómo definen las caras/triángulos) y asegurar que las conversiones y exportaciones se realizaran correctamente para obtener archivos válidos en formatos estándar como OBJ, STL y PLY. La depuración de problemas de exportación o conversión requirió atención a los detalles de los tipos de datos y estructuras esperadas por cada función.