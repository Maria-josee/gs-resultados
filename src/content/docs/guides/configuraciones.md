---
title: Configuraciones
description: Configuraciones evaluadas en el proceso de Gaussian Splatting, según el experimento descrito en el informe.
---

En este proyecto se evaluaron distintas configuraciones del algoritmo **Gaussian Splatting**, siguiendo las variantes propuestas en la documentación de *gsplat* y en su sección de *Feature Ablation*. Cada configuración modifica la forma en que se densifican o refinan las Gaussianas durante el entrenamiento, afectando la calidad visual, el tamaño del modelo y el costo computacional.

A continuación se describen únicamente las configuraciones utilizadas en el informe: **default**, **absgrad**, **mcmc**, y sus combinaciones con o sin **antialiased**.

---

# `default`  
Configuración base equivalente al método original de *3D Gaussian Splatting* (3DGS).  
Utiliza **gradientes medios** (`means2d`) para determinar cuándo dividir o densificar Gaussianas.

**Características principales:**
- Representa el estándar contra el cual se comparan las demás configuraciones.  
- Produce modelos equilibrados en calidad y complejidad.  
- Fue usada como línea base para los experimentos del Moai y la Araucaria.

---

# `absgrad`  
Configuración basada en **gradientes absolutos**, siguiendo la variante AbsGS.

Esta configuración reemplaza el gradiente promedio por uno absoluto, lo que permite detectar cambios más finos en la imagen y, por ende, **densificar más agresivamente zonas de detalle**.

**En el informe se utilizó con los siguientes ajustes:**
- `grow-grad2d = 0.0008` (según documentación gsplat).  

**Comportamiento observado en los experimentos:**
- Genera una cantidad significativamente mayor de Gaussianas.  
- Mayor uso de memoria y tiempo de cómputo.  
- Captura detalles finos, pero con un costo computacional alto.  
- Es de las configuraciones más pesadas, especialmente en 1 GPU.

---

# `mcmc`  
Variación basada en **Markov Chain Monte Carlo (MCMC)** para controlar el proceso de densificación.  
Este método permite asignar explícitamente un límite máximo de Gaussianas en la reconstrucción mediante el parámetro **`cap-max`**.

**En los experimentos se evaluaron tres variantes:**
- `mcmc (1M)` → máximo 1 millón de Gaussianas  
- `mcmc (2M)` → máximo 2 millones  
- `mcmc (3M)` → máximo 3 millones  

**Comportamiento observado:**
- Ofrece un mejor control del tamaño del modelo.  
- Ajustar el límite permite equilibrar calidad y costo computacional.  
- En el informe, **mcmc (1M)** presentó el mejor *trade-off* entre calidad perceptual (LPIPS) y tiempo de cómputo.

---

# Combinaciones con `antialiased`
Cualquier configuración (**default**, **absgrad**, **mcmc**) puede combinarse con la opción **`antialiased`**, que incorpora un rasterizado anti-aliasing inspirado en Mip-Splatting.

**Efectos principales:**
- Suaviza bordes y reduce artefactos.  
- Puede mejorar métricas perceptuales como LPIPS.  
- Reduce la cantidad de ruido en zonas de baja frecuencia.  
- En algunos casos genera modelos más compactos (menos Gaussianas).  

**Observaciones del informe:**
- `antialiased + default` entrega resultados similares al default, con ligera suavidad adicional.  
- `antialiased + absgrad` es muy costoso computacionalmente (alto número de Gaussianas).  
- `antialiased + mcmc (1M)` y `(2M)` mostraron buenas métricas, con tiempos más estables.  
- En la escena Araucaria, **antialiased (1/2 resolución)** ofreció la reconstrucción más equilibrada entre calidad y tamaño del modelo.

---

# Resumen general de configuraciones utilizadas

| Configuración | Características destacadas |
|--------------|----------------------------|
| **default** | Línea base; buen equilibrio entre calidad y costo. |
| **absgrad** | Captura más detalle, pero es costoso y genera muchos GSs. |
| **mcmc (1M, 2M, 3M)** | Control explícito sobre el tamaño del modelo; 1M fue la mejor relación calidad/tiempo. |
| **antialiased (opcional)** | Suaviza artefactos; mejora percepción; combinable con cualquier configuración. |

---

Estas configuraciones fueron aplicadas en los experimentos para analizar cómo cambia la calidad de la reconstrucción y el costo computacional según la estrategia de densificación empleada.
