---
title: Moai 
description: Visualización interactiva del modelo reconstruido con Gaussian Splatting.
---

## Ubicación y contexto histórico

La pieza se encuentra actualmente en el Museo Arqueológico de La Serena.  
Fue entregada como un gesto de gratitud por parte del pueblo Rapa Nui hacia la ciudad de La Serena, tras la hazaña aérea del hidroavión “Consolidated PBY Catalina Manutara” el 20 de enero de 1951.  
Este moai, de casi cuatro metros de alto, ha sido exhibido internacionalmente y hoy sirve como símbolo del vínculo patrimonial y cultural entre la Rapa Nui y la región de Coquimbo.  
En la actualidad, la pieza se exhibe en una sala dedicada a la historia institucional del museo y representa un elemento clave para la difusión del patrimonio rapanui en el territorio continental chileno.


## Especificaciones del Dataset

Nuestro dataset original tiene las siguientes características:

- **127 imágenes**
- **Formato:** `.jpg`
- **Resolución:** **3072 × 4096 px** (4K)
- **Dispositivo de captura:** Xiaomi 14T  
  - Lente equivalente a **23 mm**, apertura **f/1.77**
- **Caracterización de la escena:**  
  Escena interior iluminada principalmente por **focos de luz artificial**.


## Experimentos y métricas

En esta sección se resumen tres pruebas realizadas sobre la escena **moai-la-serena**, usando como métricas: **PSNR**, **SSIM**, **LPIPS**, número de Gaussian Splatting (**Num GSs**), uso de memoria de GPU (**Mem (GB)**) y tiempo de entrenamiento (**Time (min)**).

---

### Test 1: Cantidad de imágenes

Se compara el rendimiento del modelo utilizando el dataset completo (127 imágenes) versus usar aproximadamente la mitad de las imágenes (65).

| Cantidad de imágenes | PSNR  | SSIM | LPIPS | Num GSs | Mem (GB) | Time (min) |
|----------------------|-------|------|-------|---------|----------|------------|
| 127                  | 20.98 | 0.75 | 0.33  | 661128  | 4.47     | 121.06     |
| 65                   | 18.78 | 0.69 | 0.35  | 710766  | 4.49     | 113.54     |


<div style="display: flex; gap: 20px; justify-content: center; margin-top: 20px;">

  <figure style="flex: 1; text-align: center;">
    <img src="/imagenes/moai/cantidad_frames/moai_all.png" alt="Todas las imágenes" style="width: 100%; border-radius: 6px;" />
    <figcaption>Conjunto completo de imágenes</figcaption>
  </figure>

  <figure style="flex: 1; text-align: center;">
    <img src="/imagenes/moai/cantidad_frames/moai_half.png" alt="Mitad de las imágenes" style="width: 100%; border-radius: 6px;" />
    <figcaption>Mitad de las imágenes</figcaption>
  </figure>

</div>

<p style="text-align:center; margin-top: 10px;">
  <strong>Figura:</strong> Muestras de las imágenes de la escena <em>moai-la-serena</em>.
</p>


Al reducir a 65 imágenes, las métricas de calidad visual (PSNR, SSIM y LPIPS) empeoran levemente, mientras que el tiempo de entrenamiento solo disminuye en torno a 7 minutos. Esto sugiere que, para esta escena, **mantener el dataset completo (127 imágenes) es preferible** para conservar la calidad de reconstrucción.

---

### Test 2: Downscale de resolución

Aquí se evalúa cómo cambia el desempeño del modelo al reducir la resolución de las imágenes de entrada a 1/2, 1/4 y 1/8 de la resolución original.

| Resolución | PSNR  | SSIM | LPIPS | Num GSs | Mem (GB) | Time (min) |
|-----------|-------|------|-------|---------|----------|------------|
| Original  | 20.98 | 0.75 | 0.33  | 661128  | 4.47     | 121.06     |
| 1/2       | 21.90 | 0.76 | 0.25  | 658168  | 2.06     | 40.58      |
| 1/4       | 23.15 | 0.82 | 0.18  | 468106  | 1.43     | 21.92      |
| 1/8       | 25.05 | 0.87 | 0.09  | 309381  | 0.93     | 13.28      |

A medida que se reduce la resolución, **las métricas objetivas mejoran** y el tiempo de entrenamiento baja de forma significativa, junto con la cantidad de Gaussianas y el uso de memoria. Sin embargo, visualmente la reconstrucción a 1/8 de resolución pierde densidad y detalle, por lo que se debe balancear calidad visual y eficiencia computacional al elegir la resolución de trabajo, ya que resoluciones demasiado bajas pueden generar imágenes sintéticas que se ajustan excesivamente fácil al modelo, perdiendo densidad y detalle en la reconstrucción. Esto se evidencia al comparar las imágenes de validación con las imágenes sintéticas generadas durante el entrenamiento, donde se observa que la reducción de resolución facilita el ajuste pero deteriora la fidelidad geométrica de la escena.


<div style="
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 20px;
">

  <figure style="flex: 1; text-align: center;">
    <img src="/imagenes/moai/downscale/moai-df1.png" alt="Todas las imágenes" style="width: 100%; border-radius: 6px;" />
    <figcaption>Imagenes originales</figcaption>
  </figure>

  <figure style="flex: 1; text-align: center;">
    <img src="/imagenes/moai/downscale/moai-df2.png" alt="Mitad de las imágenes" style="width: 100%; border-radius: 6px;" />
    <figcaption>Downscale x2</figcaption>
  </figure>

  <figure style="flex: 1; text-align: center;">
    <img src="/imagenes/moai/downscale/moai-df4.png" alt="Mitad de las imágenes" style="width: 100%; border-radius: 6px;" />
    <figcaption>Downscale x4</figcaption>
  </figure>

  <figure style="flex: 1; text-align: center;">
    <img src="/imagenes/moai/downscale/moai-df8.png" alt="Mitad de las imágenes" style="width: 100%; border-radius: 6px;" />
    <figcaption>Downscale x8</figcaption>
  </figure>
</div>

<p style="text-align:center; margin-top: 10px;">
  <strong>Figura:</strong> Muestras de las imágenes de la escena a distintas resoluciones <em>moai-la-serena</em>.
</p>

---

### Test 3: Variación de parámetros

En este experimento se mantienen la escena y la configuración base, pero se prueban distintas variantes de parámetros de `gsplat` (por ejemplo `absgrad`, `antialiased` y distintas configuraciones de `mcmc`).

| Parámetro                    | PSNR  | SSIM | LPIPS | Num GSs   | Mem (GB) | Time (min) |
|-----------------------------|-------|------|-------|-----------|----------|------------|
| gsplat (default settings)   | 20.98 | 0.75 | 0.33  | 661128    | 4.47     | 121.06     |
| absgrad                     | 20.82 | 0.74 | 0.33  | 1350055   | 4.92     | 113.54     |
| antialiased                 | 20.70 | 0.74 | 0.34  | 583637    | 4.47     | 119.22     |
| mcmc (1 mill)               | 21.05 | 0.74 | 0.31  | 1000000   | 5.77     | 120.42     |
| mcmc (2 mill)               | 20.93 | 0.74 | 0.30  | 2000000   | 8.98     | 186.17     |
| mcmc (3 mill)               | 20.90 | 0.74 | 0.30  | 3000000   | 12.92    | 135.25     |
| absgrad & antialiased       | 20.30 | 0.73 | 0.32  | 11746495  | 19.78    | 175.68     |
| mcmc (1 mill) & antialiased | 21.09 | 0.75 | 0.33  | 1000000   | 5.50     | 129.37     |
| mcmc (2 mill) & antialiased | 21.05 | 0.74 | 0.31  | 2000000   | 6.07     | 131.98     |
| mcmc (3 mill) & antialiased | 20.82 | 0.74 | 0.30  | 3000000   | 8.86     | 132.40     |

Este conjunto de pruebas muestra el compromiso entre **calidad visual, número de Gaussianas, memoria y tiempo de entrenamiento**. De acuerdo con los resultados del informe, la configuración **más óptima** en términos de equilibrio entre calidad perceptual (especialmente LPIPS) y costo computacional fue **`mcmc (1 millón)`**, ya que logró la mejor relación entre detalle visual y tiempo de entrenamiento manteniendo un tamaño de modelo controlado. 




## Visor 

A continuación se muestra el visor interactivo embebido en la página.  
Si tu equipo es lento o estás en notebook, puede demorar en cargar.


<iframe
  src="/visores/moai.html"
  style="width: 100%; height: 600px; border: none;"
  loading="lazy"
></iframe>

