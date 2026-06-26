# J & F Panadería Artesanal — Guía del cliente

**Bienvenido a tu web.** Esta guía te explica todo lo que necesitás saber para usar y actualizar tu sitio. No hace falta saber de computación: con el Bloc de notas alcanza.

---

## Cómo ver la web en tu computadora

1. Abrí la carpeta `jyf-web`.
2. Hacé doble clic en `index.html`.
3. Se abre en tu navegador (Chrome, Edge, Firefox — cualquiera sirve).

---

## Cómo subir la web a Hostinger

1. Entrá a tu panel de Hostinger → **File Manager** (Gestor de archivos).
2. Navegá a la carpeta `public_html`.
3. **Arrastrá toda la carpeta `jyf-web`** dentro, o copiá el contenido directamente.
   - Asegurate de que `index.html` quede dentro de `public_html` (no en una subcarpeta).
4. Listo. Tu web está online.

---

## Cómo cambiar textos, teléfono o dirección

Abrí el archivo `lib/manifest.js` con el **Bloc de notas**.

Al principio del archivo vas a ver algo así:

```
brand: {
  nombre:    'J & F',
  eslogan:   'El pan de toda la vida.',
  direccion: 'Calle Las Heras 742, Mendoza Capital',
  telefono:  '+54 9 261 344-2368',
  whatsapp:  '5492613442368',   ← solo números, sin + ni espacios
  instagram: '@Caseritos.mza',
  ...
},
```

**Cambiá solo el texto que está entre las comillas simples `'...'`.**  
No toques los nombres a la izquierda (como `nombre:`, `telefono:`, etc.).

Guardá el archivo con **Ctrl + S** y recargá la web con **Ctrl + F5**.

### Cambiar el número de WhatsApp

Hay que actualizarlo en **dos lugares**:

1. En `lib/manifest.js`, el campo `whatsapp: '5492613442368'` → ponés el nuevo número solo con números (código de país + número, sin +, espacios ni guiones). Por ejemplo: `5492614001234`.

2. En `index.html`, buscá con **Ctrl + F** el texto `wa.me/5492613442368` y reemplazalo por el nuevo número en todos los resultados (son varios links de WhatsApp en la página).

---

## Cómo cambiar los productos

En `lib/manifest.js`, buscá la sección `productos:`. Cada producto tiene este formato:

```
{
  nombre:      'Pan Casero',
  serie:       'Clásico',           ← 'Clásico' o 'Temporada'
  subtitulo:   'El de toda la vida',
  ingredientes: ['Harina', 'Masa madre', 'Sal de mar'],
  descripcion: 'Corteza crocante y migajón tibio...',
},
```

Podés cambiar el nombre, el subtítulo, los ingredientes y la descripción. Los dibujos SVG de cada producto no cambian con este archivo (están en el HTML).

---

## Cómo cambiar las fotos

Las fotos van en la carpeta `assets/img/`. Los nombres de archivo importan:

| Archivo              | Dónde se usa                        |
|----------------------|-------------------------------------|
| `hero-bg.jpg`        | Foto de fondo del encabezado grande |
| `about-01.jpg`       | Primera foto de "La Panadería"      |
| `about-02.jpg`       | Segunda foto de "La Panadería"      |
| `about-03.jpg`       | Tercera foto de "La Panadería"      |
| `events-bg.jpg`      | Foto de fondo de "Pedidos Grandes"  |
| `gallery-01.jpg`     | Galería, imagen 1                   |
| `gallery-02.jpg`     | Galería, imagen 2                   |
| …hasta `gallery-16.jpg` | …y así hasta la 16              |

**Para reemplazar una foto:**
1. Tomás tu foto y la renombrás igual que el archivo que querés reemplazar (ej: `hero-bg.jpg`).
2. La copiás dentro de `assets/img/`, reemplazando la que había.
3. Formato recomendado: **JPG** (o WebP si tu teléfono lo guarda así). Tamaño máximo recomendado: 1.5 MB por foto.

---

## Cómo cambiar el horario de apertura en la barrita lateral

En `index.html`, buscá con Ctrl+F el texto:

```
ABIERTO · LUN → SÁB · 07:00 → 21:00
```

Cambialo por el horario que necesitás.

---

## Si algo no se actualiza en el navegador

Presioná **Ctrl + F5** (Windows) o **Cmd + Shift + R** (Mac) para forzar la recarga sin caché. Si subiste el sitio a Hostinger y los cambios no aparecen, esperá 5 minutos y volvé a probar.

Para una actualización más definitiva, podés cambiar el número de versión en `index.html`. Buscá `?v=20260626` y cambiá la fecha por la del día de hoy (ej: `?v=20270115`). Hacé lo mismo en todos los lugares donde aparece.

---

## Estructura de archivos (no tocar)

```
jyf-web/
├── index.html          ← página web principal
├── styles.css          ← estilos visuales
├── main.js             ← animaciones e interacciones
├── .htaccess           ← configuración del servidor
├── README.md           ← esta guía
├── lib/
│   ├── manifest.js     ← textos y datos editables ← EDITAR AQUÍ
│   ├── gsap.min.js     ← librería de animaciones (no tocar)
│   └── ScrollTrigger.min.js  ← (no tocar)
└── assets/
    ├── credits.json    ← créditos de imágenes de stock
    └── img/
        └── *.jpg       ← tus fotos van acá
```

---

## Contacto para soporte técnico

Si algo no anda o querés agregar una sección nueva, contactá a quien te hizo la web.

---

*Web desarrollada para J & F Panadería Artesanal · Mendoza · 2026*
