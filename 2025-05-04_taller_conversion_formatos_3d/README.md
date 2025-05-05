# 🧪 Importando el Mundo: Visualización y Conversión de Formatos 3D

## 📅 Fecha

`2025-05-04` – Fecha de realización

---

## 🎯 Objetivo del Taller

Explorar la estructura interna y compatibilidad entre formatos de modelos 3D (.OBJ, .STL, .GLTF), aplicando técnicas de análisis geométrico, visualización básica y conversión de formatos utilizando Python y Trimesh.

---

## 🧠 Conceptos Aprendidos

Lista de conceptos clave aplicados en el taller:

- [x] Transformaciones geométricas (bounding box, volumen, normalización de vértices)
- [x] Análisis de mallas 3D (conteo de vértices y caras, detección de duplicados, watertight)
- [x] Conversión entre formatos de modelos 3D (.obj, .stl, .glb)
- [x] Uso de estructuras tipo `Scene` y combinación de geometrías múltiples
- [x] Visualización indirecta mediante inspección de propiedades y comparación tabular
- [x] Automatización de flujos de análisis y exportación

---

## 🔧 Herramientas y Entornos

Especifica los entornos usados:

- Python (`trimesh`, `numpy`, `open3d`, `assimp`)
- Jupyter / Google Colab
- Exploración de archivos .OBJ, .STL, .GLTF

---

## 📁 Estructura del Proyecto
```
2025-04-28_taller_construyendo_mundo_3d/
├── python/              # Implentacion python/
├── threejs/             # Implentacion react usando threejs/
├── datos/               # Modelos 3D originales
├── resultados/          # Gifs resultantes, metricas y conversion de modelos
├── README.md
```
## 🧪 Implementación

Explica el proceso:

### 🔹 Etapas realizadas

#### 🐍 Python
1. **Carga de modelos 3D** desde `/datos/`, filtrando por extensiones válidas (.obj, .stl, .glb, .gltf) usando `trimesh`.
2. **Análisis de propiedades geométricas**, como vértices, caras, normales, duplicados, volumen, *watertight* y dimensiones del bounding box.
3. **Conversión automatizada** de cada modelo a formatos .OBJ, .STL y .GLB, usando `modelo.export`.
4. **Comparación tabular de métricas clave** (vértices, caras, duplicados, cerrado) entre modelos, mostrada en consola y exportada como `.txt`.
5. **Exportación final** de resultados a la carpeta `/resultados/` para uso en visualizadores externos como Three.js.

#### 🌐 React.js


###  🔹 Código relevante

### 🐍 Python  
Este bloque de código realiza el análisis central de cada modelo 3D. Extrae propiedades esenciales como cantidad de vértices y caras, presencia de normales, si la malla está cerrada (`watertight`), si hay vértices duplicados, así como el tamaño del *bounding box* y el volumen estimado (si aplica). Estos datos permiten evaluar la integridad y calidad de los modelos antes de convertirlos a otros formatos:

```python
# Propiedades básicas
print(f"- Vértices: {len(modelo.vertices)}")
print(f"- Caras: {len(modelo.faces)}")

# Normales
try:
    _ = modelo.vertex_normals
    print(f"- Normales presentes: Sí")
except Exception as e:
    print(f"- Normales presentes: No ({str(e)})")

# Watertight (cerrado)
print(f"- ¿Está cerrado (watertight)?: {'Sí' if modelo.is_watertight else 'No'}")

# Vértices duplicados
unicos = np.unique(modelo.vertices, axis=0)
duplicados = len(modelo.vertices) - len(unicos)
if duplicados:
    print(f"- Vértices duplicados: {duplicados} ({duplicados / len(modelo.vertices) * 100:.2f}%)")
else:
    print("- No hay vértices duplicados")

# Bounding box y volumen (si aplica)
print(f"- Bounding box (dimensiones): {modelo.bounding_box.extents}")
if modelo.is_volume:
    print(f"- Volumen estimado: {modelo.volume:.3f} unidades³")
```

### 🌐 React Three Fiber (App.jsx)

Epa

```jsx

```


## 📊 Resultados Visuales
### 🐍 Python   
#### 📐 Análisis geométrico de un modelo
![Resultado Python](resultados/ResultadosPython/AnalisisPython.png)

#### 📊 Comparación de métricas entre modelos
![Resultado Python](resultados/ResultadosPython/comparacionPython.png)

#### 🔁 Conversión a múltiples formatos (OBJ, STL, GLB)
![Resultado Python](resultados/ResultadosPython/convercionModelos.png)

#### 🎞️ Proceso completo en ejecución (GIF)
![Resultado Python](resultados/ResultadosPython/ResultadoPyrhon.gif)


### 🌐 React  
Interfaz interactiva alternando entre diferentes vistas (wireframe, edges, points)
![Resultado Processing](resultados/ThreejsAnimation.gif)



---

🧩 Prompts Usados


- ¿Cómo puedo comparar varios modelos 3D y generar una tabla apartir de las metricas obtenidas?
- ¿Cuál es la diferencia entre una escena y una malla en Trimesh, y cómo las convierto para analizarlas?
- ¿Cómo visualizo un modelo 3D en Python y guardo una imagen o animación del análisis?
- ¿Qué diferencias visuales o estructurales hay entre formatos 3D como .OBJ, .STL y .GLB?

---

💬 Reflexión Final  

Este taller me permitió reforzar mis conocimientos en el useo y estructura internamente distintos formatos de modelos 3D, más allá de su apariencia visual. Fue especialmente valioso identificar la importancia del preprocesamiento (como eliminar duplicados o verificar que una malla sea cerrada) antes de realizar conversiones entre formatos.

El mayor reto fue manejar modelos en formato .glb que contenían múltiples geometrías; resolver esto mediante trimesh.util.concatenate() fue clave. A futuro, me gustaría integrar esta lógica en una interfaz web con React Three Fiber para observar las diferencias de renderizado en tiempo real.