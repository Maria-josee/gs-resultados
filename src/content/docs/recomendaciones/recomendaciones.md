---
title: Recomendaciones para la captura de fotos y videos
description: Buenas prácticas para obtener material óptimo destinado a reconstrucción 3D y Gaussian Splatting.
---

# Recomendaciones 

La calidad del dataset influye directamente en la fidelidad de la reconstrucción 3D.  
A continuación se presentan recomendaciones prácticas para capturar tanto **videos** como **fotografías**, basadas en las pruebas realizadas durante este proyecto.

---

# 📹 Captura de Video

## 1. Escenarios en espacios abiertos

En ambientes completamente abiertos, especialmente con **cielos brillantes**, **árboles en movimiento**, o **variaciones bruscas de iluminación**, no se logró obtener reconstrucciones fidedignas utilizando el video original.

Las principales dificultades fueron:

- Cambios de luz demasiado rápidos  
- Fondos complejos o con movimiento  
- Elementos lejanos que generan ruido visual  
- Parallax muy débil por falta de elementos cercanos

> **Parallax** es el desplazamiento aparente de un objeto en la imagen cuando la cámara se mueve. Los puntos cercanos se desplazan más que los lejanos, lo que permite a los algoritmos de reconstrucción estimar la profundidad mediante triangulación.
> Por ello, grabar moviéndose alrededor del objeto y variando la altura es esencial para proporcionar suficiente parallax y lograr una reconstrucción 3D estable y precisa.

Por ello, **no se puede recomendar una técnica confiable** para videos en espacios totalmente abiertos, salvo cuando la iluminación está parcialmente controlada y los elementos del entorno se permaneceran estáticos.

A modo de ejemplo, esta escena capturada en el *Museo del Carmen de Maipú* muestra un entorno más favorable:

<div style="text-align:center; margin: 20px 0;">
  <img src="/imagenes/recomendaciones/open_space.png" style="max-width: 500px; border-radius: 6px;" />
  <p><em>Figura: Ejemplo de espacio abierto con iluminación controlada.</em></p>
</div>

---

## 2. Objetos fijos (moai, araucarias, esculturas, árboles)

Los objetos estáticos son los que mejor se prestan para reconstrucción 3D mediante Gaussian Splatting.

Para obtener resultados óptimos, se recomienda lo siguiente:

### ✔ Rodear el objeto lentamente  
Avanzar alrededor del objeto a **velocidad muy baja**, manteniendo la cámara estable.

### ✔ Variar la altura de la cámara  
Mientras se rodea el objeto:

- Levantar la cámara  
- Bajarla  
- Incluir perspectivas bajas y altas  

Esto permite capturar detalles:

- En la base del objeto  
- En la parte superior  
- En zonas que normalmente quedan ocultas

### ✔ Mantener una distancia constante  
Evitar acercarse y alejarse bruscamente para no introducir ruido en el cálculo del parallax.

### ✔ Movimientos suaves  
Evitar movimientos rápidos o bruscos que generen fotogramas borrosos.

### ✔ Rodear varias veces  
Idealmente:

- 1 vuelta a altura baja  
- 1 vuelta a altura media  
- 1 vuelta a altura alta  

Esto maximiza la cobertura geométrica.

---

# 📷 Captura de Fotografías

Aunque el proyecto está basado principalmente en video, al capturar imágenes sueltas:

### ✔ Usar series de fotos desde múltiples ángulos  
Similar al video, cubrir el objeto desde distintas alturas y posiciones.

### ✔ Evitar sombras duras  
Preferir:

- días nublados  
- sombras suaves  
- luz controlada

### ✔ Evitar fondos complejos  
Fondos con movimiento (personas, autos, árboles) complican el proceso de feature matching.

### ✔ No usar zoom digital  
Mantener la distancia real al objeto para conservar la geometría.

---

Estas recomendaciones permiten obtener datasets más limpios y reconstrucciones más consistentes, como se demostró con la escena del Moai y la Araucaria.

