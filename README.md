# 🚀 Repositorio Web: Visualización de Reconstrucciones 3D con GSplat / Supersplat

Este repositorio forma parte del proyecto de grado enfocado en la evaluación y comparación de reconstrucciones 3D mediante técnicas basadas en **Gaussian Splatting (GSplat)**.

Contiene el código fuente de la página web utilizada para visualizar y documentar reconstrucciones 3D generadas mediante **Supersplat / GSplat**. El sitio está construido con **Astro + Starlight**, utilizando una estructura fácil de extender.

---

## 📁 Estructura básica del proyecto

```text
.
├── public/
│   ├── imagenes/
│   │   ├── moai/
│   │   ├── araucaria/
│   │   └── recomendaciones/
│   └── visores/          # Visores HTML generados por Supersplat (NO versionados)
│       ├── moai.html
│       └── araucaria.html
├── src/
│   ├── assets/
│   ├── content/
│   │   └── docs/
│   │       ├── guides/
│   │       ├── recomendaciones/
│   │       └── reconstrucciones/
│   ├── styles/
│   └── content.config.ts
├── astro.config.mjs
├── package.json
└── tsconfig.json
```text

⚠️ Los archivos dentro de public/visores/ **no están incluidos en GitHub** debido a su tamaño. Cada usuario debe generarlos localmente siguiendo las instrucciones a continuación.

---

## 🧩 Cómo generar visores desde Supersplat

Sigue estos pasos para generar los archivos HTML que serán servidos por la web:

1. Abrir **Supersplat**.
2. Cargar la reconstrucción 3D deseada.
3. Ir a **File → Export → Visualization application**.
4. Supersplat generará una carpeta (o archivo .html) con los datos del visor.
5. Mover la carpeta/archivo generado a la ubicación:

> public/visores/nombre_escena.html

*Nota: Los visores no se incluyen en el repo por su tamaño (100MB+).*

---

## 🎯 Reproducibilidad

Este repositorio incluye:

* ✅ Código fuente del sitio web.
* ✅ Estructura necesaria para servir visores locales.
* ✅ Instrucciones para regenerar los visores.

Este repositorio **no incluye**:

* ❌ Visores HTML exportados desde Supersplat.
* ❌ Datasets originales de las escenas.
* ❌ Archivos de entrenamiento (checkpoints, etc.).

---

## 🛠 Nota técnica sobre Astro/Starlight

El sitio está construido con **Astro** y el framework de documentación **Starlight**.

Para el desarrollo local:

npm install  # Instala las dependencias del proyecto
npm run dev  # Inicia el servidor de desarrollo en localhost

Para generar el build de producción:

npm run build

Documentación oficial:
* [https://astro.build](https://astro.build)
* [https://starlight.astro.build](https://starlight.astro.build)