# Emilio Zariñan — un recorrido por mi experiencia

[Visitar el sitio](https://emidosme.github.io/)

Un portafolio bilingüe que conecta formación, experiencia, proyectos y habilidades profesionales a través de cuatro capítulos. Diseño en azul nocturno con acentos suaves, navegación contextual y lectura al ritmo del visitante.

## Explorar

- Español e inglés completos, con preferencia de idioma guardada en el navegador.
- Trayectoria desde ESCOM–IPN hasta los proyectos en Vantive.
- Seis casos de proyecto: reto, participación, resultados y herramientas.
- Encuestas con usuarios, participantes y resultados.
- Diez habilidades profesionales, seis grupos de conocimientos e IA como apoyo.
- Contacto por correo electrónico.

La navegación no fuerza el desplazamiento. Los controles funcionan por teclado y se respeta la preferencia de movimiento reducido. El contenido inicial en español está incluido en el HTML y los otros casos también tienen una alternativa sin JavaScript.

## Desarrollo local

```sh
python3 -m http.server 8080
```

Abre la dirección local que indique el servidor. No se requieren dependencias de JavaScript. Para actualizar el HTML después de editar los textos o las plantillas, utiliza Node.js:

```sh
node scripts/build.mjs
node --test content.test.mjs
```

- `content.js`: textos en ambos idiomas.
- `render.js`: plantillas y configuración de retrato.
- `main.js`: idioma, casos de proyecto y orientación durante la lectura.
- `style.css`: diseño adaptable y paleta.

## Retrato

El retrato se encuentra en `assets/emilio-zarinan.jpg` y se configura mediante `portraitSrc` en `render.js`. El encuadre se realiza con CSS y no altera el archivo original.

## Publicación

GitHub Pages desde la rama `main`, carpeta raíz (`/`). No requiere compilación en el servidor, API de traducción, rastreadores ni servicios externos.

## Archivos versionados

El generador escribe CSS y módulos JavaScript con una huella de su contenido dentro de `assets/`. El HTML referencia esos nombres para evitar mezclar una versión nueva de la página con estilos o scripts antiguos guardados en caché. Después de editar los archivos fuente, ejecuta `node scripts/build.mjs` y sube también los archivos generados.
