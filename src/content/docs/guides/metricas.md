---
title: Métricas de evaluación
description: Descripción de las métricas utilizadas para evaluar la calidad de reconstrucción y el rendimiento del sistema.
---

En esta sección se describen las métricas utilizadas para evaluar la calidad de las reconstrucciones y el costo computacional de cada implementación de Gaussian Splatting.

## Métricas de calidad de imagen

En este proyecto se utilizaron tres métricas principales para evaluar la similitud entre las imágenes renderizadas por Gaussian Splatting y las imágenes de referencia obtenidas desde los datasets. Todas las métricas fueron calculadas automáticamente por **gsplat** mediante la librería **PyTorch**, según se detalla en el informe.

---

### PSNR (Peak Signal-to-Noise Ratio)

- **Tipo:** métrica objetiva basada en error cuadrático medio (MSE).  
- **Interpretación:** valores más altos indican mayor similitud entre la imagen renderizada y la imagen real.  
- **Uso en este proyecto:** cuantifica la fidelidad de la reconstrucción a nivel de píxel.

**Definición matemática (informe):**

$$
\text{PSNR}(I, J) = 10\cdot\log_{10}\left(\frac{\max(I)^2}{\text{MSE}(I, J)}\right)
$$

donde la MSE es:

$$
\text{MSE}(I, J) = \frac{1}{N}\sum_{n=1}^N (I_n - J_n)^2
$$

---

### SSIM (Structural Similarity Index Measure)

- **Tipo:** métrica perceptual que compara luminancia, contraste y estructura.  
- **Interpretación:** valores cercanos a `1` indican alta similitud estructural entre la imagen renderizada y la referencia.  
- **Uso en este proyecto:** complementa a PSNR capturando patrones visuales y coherencia estructural.

**Definición matemática simplificada (informe):**

$$
SSIM(x,y)=\frac{(2\mu_A\mu_B + C_1)(2\sigma_{AB}+C_2)}
{(\mu_A^2+\mu_B^2+C_1)(\sigma_A^2+\sigma_B^2+C_2)}
$$

---

### LPIPS (Learned Perceptual Image Patch Similarity)

- **Tipo:** métrica perceptual basada en redes neuronales profundas.  
- **Interpretación:** valores más bajos indican mayor similitud perceptual.  
- **Uso en este proyecto:** detecta diferencias finas que PSNR y SSIM no capturan adecuadamente.

**Definición conceptual (informe):**

LPIPS mide la distancia perceptual entre *parches de imagen* usando activaciones de capas convolucionales:

$$
d(x,x') = \sum_l \frac{1}{H_l W_l}
\sum_{h,w} w_l \cdot \left( \hat{y}^l_{hw} - \hat{y}'^{\,l}_{hw} \right)^2
$$

---

## Notas importantes sobre estas métricas en este proyecto

Tal como se observó en el informe, **una buena métrica no siempre implica una buena reconstrucción 3D**. Durante los experimentos con reducción de resolución:

- PSNR y SSIM **mejoraron** al bajar la resolución (1/4 o 1/8),  
- pero la reconstrucción perdió **densidad y detalle geométrico**,  
- porque las **imágenes sintéticas generadas durante el entrenamiento se ajustaron demasiado fácilmente**,  
- lo cual se evidenció al comparar imágenes de validación con las reconstrucciones generadas.

Por ello, estas métricas deben interpretarse en conjunto con una **evaluación cualitativa**, especialmente en contextos patrimoniales donde la fidelidad geométrica y visual es crucial.

---

## Métricas de complejidad del modelo

Estas métricas permiten evaluar el costo computacional asociado a cada configuración de Gaussian Splatting.

### Num GSs (Número de Gaussians)

- **Definición:** cantidad total de Gaussian Splatting primitives en la escena.  
- **Interpretación:**  
  - Mayor cantidad → más detalle visual,  
  - pero también mayor memoria y tiempo de entrenamiento/renderizado.  
- **Uso en este proyecto:** comparar la complejidad geométrica entre configuraciones.

---

### Mem (GB)

- **Definición:** memoria de GPU utilizada durante el entrenamiento.  
- **Interpretación:** permite comparar la viabilidad de las configuraciones según el hardware disponible.  
- **Uso en este proyecto:** clave para evaluar configuraciones como *absgrad*, *mcmc* y *antialiased*.

---

### Time (min)

- **Definición:** tiempo requerido para completar el entrenamiento.  
- **Interpretación:**  
  - Valores menores son preferibles,  
  - siempre que la calidad visual se mantenga aceptable.  
- **Uso en este proyecto:** analizar la relación **calidad / costo computacional**.

