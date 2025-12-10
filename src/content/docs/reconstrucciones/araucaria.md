---
title: Araucaria Joven
description: Visualización interactiva del modelo reconstruido con Gaussian Splatting.
---

## Ubicación y contexto histórico

Se realizó la reconstrucción de una **araucaria joven** en un ambiente exterior, ubicada en la frontera de Chile y Argentina, específicamente en el paso fronterizo *Mamuil Malal*, en la cordillera de los Andes.  
La escena se encuentra aproximadamente a **1.253 metros sobre el nivel del mar** y corresponde al camino que conecta la provincia de Neuquén (cerca de Junín de los Andes, Argentina) con la Región de La Araucanía por la comuna de Curarrehue (Chile).


## Especificaciones del dataset

Las especificaciones utilizadas para capturar la escena fueron las siguientes:

- **Tipo de captura:** video de la escena alrededor de la araucaria
- **Dispositivo:** Apple iPhone 11  
  - Cámara **Ultra Wide** – 13 mm, **f/2.4**
- **Formato de video:** HEVC
- **Resolución del video original:** **1080 × 1920 px**
- **Framerate:** 29.99 FPS (aprox. 30 FPS)
- **Duración del clip:** ~1 minuto 33 segundos
- **Número de imágenes utilizadas:** **310 fotogramas** extraídos del video
- **Entorno:**  
  - Escena exterior  
  - Iluminación natural  
  - Presencia de cielo, follaje y fondo de montaña


# Puebas con parámetro por defecto

Inicialmente, se utilizaron los parámetros estándar de la implementación base de Gaussian Splatting.  
Para cada resolución (x1, x2, x4, x8) se generaron **310 imágenes**, garantizando comparabilidad entre experimentos.

A continuación se presentan las visualizaciones para cada resolución:

---

## Comparación visual de resoluciones


<div style="
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 20px;
">

  <figure style="flex: 1; text-align: center;">
    <img src="/imagenes/araucaria/resx1.png" alt="Todas las imágenes" style="width: 100%; border-radius: 6px;" />
    <figcaption>Imagenes originales</figcaption>
  </figure>

  <figure style="flex: 1; text-align: center;">
    <img src="/imagenes/araucaria/resx2.png" alt="Mitad de las imágenes" style="width: 100%; border-radius: 6px;" />
    <figcaption>Downscale x2</figcaption>
  </figure>

  <figure style="flex: 1; text-align: center;">
    <img src="/imagenes/araucaria/resx4.png" alt="Mitad de las imágenes" style="width: 100%; border-radius: 6px;" />
    <figcaption>Downscale x4</figcaption>
  </figure>

  <figure style="flex: 1; text-align: center;">
    <img src="/imagenes/araucaria/resx8.png" alt="Mitad de las imágenes" style="width: 100%; border-radius: 6px;" />
    <figcaption>Downscale x8</figcaption>
  </figure>
</div>

<p style="text-align:center; margin-top: 10px;">
  <strong>Figura:</strong> Muestras de las imágenes de la escena a distintas resoluciones <em>araucaria</em>.
</p>

> **Nota:** La resolución **x8 pierde demasiada calidad visual**, por lo que el análisis cuantitativo se centra principalmente en las resoluciones **x1 → x4**.

---

## Tabla de resultados por resolución


| Resolución | PSNR  | SSIM  | LPIPS | Num GSs  | Mem (GB) | Time (min) |
|-----------|-------|-------|--------|-----------|-----------|------------|
| Original  | 23.32 | 0.77  | 0.188 | 6,667,863 | 9.85      | 173.72     |
| x2        | 26.16 | 0.863 | 0.114 | 4,879,639 | 7.17      | 129.25     |
| x4        | 26.63 | 0.875 | 0.110 | 1,000,000 | 2.765     | 25.63      |



### Análisis

Al disminuir la resolución:

* **Las métricas de calidad (PSNR, SSIM, LPIPS) mejoran** sistemáticamente.
* **El número de Gaussian Splats disminuye**, haciendo el modelo más compacto.
* **La memoria de GPU baja**, especialmente en x4.
* **El tiempo de entrenamiento cae drásticamente** de ~174 min a ~25 min.

En escenas naturales con vegetación, la alta resolución introduce **ruido visual** que el modelo intenta sobreajustar.
Reducir la resolución suaviza este ruido, obteniendo reconstrucciones más limpias y estables.

---

# Prueba con más parámetros (resolución x2)

Para profundizar en la comparación, se evaluaron distintos parámetros de **gsplat**, todos usando resolución **x2**.

## Tabla de resultados con parámetros adicionales


| Parámetro     | Resolución | PSNR  | SSIM  | LPIPS | Num GSs   | Mem (GB) | Time (min) |
|---------------|------------|-------|-------|--------|-----------|-----------|------------|
| Absgrad       | 1/2        | 26.28 | 0.865 | 0.11  | 12,502,075 | 18.43     | 106.16     |
| Antialiased   | 1/2        | 26.62 | 0.873 | 0.11  | 676,228    | 6.86      | 40.61      |
| mcmc (1 mill) | 1/2        | 25.25 | 0.837 | 0.15  | 1,000,000  | 1.26      | 35.62      |
| mcmc (2 mill) | 1/2        | 26.06 | 0.861 | 0.12  | 2,000,000  | 2.47      | 24.46      |


### Interpretación técnica

* **Absgrad** es el más costoso computacionalmente
  → requiere una sola GPU y produce una cantidad masiva de Gaussian Splats.

* **MCMC** genera modelos más pequeños y rápidos,
  → pero con menor PSNR/SSIM y peor LPIPS.

* **Antialiased** ofrece el **mejor compromiso calidad–eficiencia**:
  ✔ PSNR más alto
  ✔ SSIM más alto
  ✔ LPIPS mínimo
  ✔ modelo extremadamente compacto
  ✔ tiempo de entrenamiento bajo

---


## Visualización con Antialiased

<figure style="flex: 1; text-align:center;">
  <img src="/imagenes/araucaria/araucaria_antialised.png" 
  style="width: 100%; border-radius: 6px;" />
  <figcaption>Reconstrucción — resolución x2 con Antialiased</figcaption>
</figure>

A pesar del suavizado característico del parámetro *Antialiased*, la reconstrucción mantiene la estructura relevante de la araucaria y reduce significativamente el tamaño del modelo.

---

# Conclusiones generales

* La araucaria es una escena compleja por su vegetación y fondo altamente detallado.
* Reducir la resolución **mejora** las métricas y la eficiencia computacional.
* El parámetro **Antialiased** ofrece el mejor equilibrio entre calidad visual, tamaño del modelo y tiempo.
* **Absgrad** es poco eficiente para escenas naturales debido a su alta densidad de Gaussian Splats.
* El uso de MCMC puede ser útil cuando se requiere **velocidad**, aunque sacrificando cierta calidad perceptual.



## Visor 

A continuación se muestra el visor interactivo embebido en la página.  
Si tu equipo es lento o estás en notebook, puede demorar en cargar.


<iframe
  src="/visores/araucaria.html"
  style="width: 100%; height: 600px; border: none;"
  loading="lazy"
></iframe>



