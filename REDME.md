# Proyecto clon de Trello

Este es un proyecto de `HTML`, `SASS` y `JavaScript` queen el que se busca maquetar y darle funcionalidad a un aplicativo de tareas, centrado en el `CSS` avanzado con animaciones y modularizado con el preprocesador `SASS` y l[ogixa de programacion avanzada con ES Module y POO.

## Tecnologias usadas.

- `HTML5` para la estructura del proyecto.
- `SASS` para el estilo y la maquetación del proyecto.
- `JavaScript` para la funcionalidad del proyecto.
- `ES Modules` para la mpodularizacion de la aplicacion.
- `POO` para la programación orientada a objetos.

## Enlaces a recursos

Algunas de las imagenes e iconos fueron tomadas de de
- [Bootstrap Icon] (https://getbootstrap.com/)
- [Wiquipedia] (https://es.wikipedia.org/)
- [npm] (https://www.npmjs.com/)
- [SASS] (https://sass-lang.com/)

## comandos utilizados para el preprocesador SASS.

Para modularizar el `CSS`, se utilizo el preprocesador `SASS` con los siguiente comandos en la terminal:

1. Descargamos el [`Node`](https://node.js.org/es) para poder descargar paquetes como `SASS`

2. verificamos que `Node` y `npm` esten instalados correctamente:

    ---
        node -v
        npm -v
    ---

3. Instalamos el paquete `SASS` en nuestro proyecto:

    ---
        npm install sass --save-dev
    ---

4. Creamos un archivo `.SCSS` con el que trabajaremos:

    ---
        touch.style.scss
    ---

5. Ejecutamos `SASS` para que convierta nuestro `scss` en un `css` regular:

    ---
        npx sass style.scss:style.css
    ---

6. Para que siempre este actualizando el archivo `style.css` cuando hagamos algún cambio, agregamos la flag `--watch`:

    ---
        npx sass --watch styles.scss:style,css
    ---

## Resumen.

Las tecnologías utilizadas en este proyecto fueron:

| Tecnología | Descripción | 
| - | - |
| `HTML` | Para la estructura de la página web. |
| `CSS` | Para dar estilo a la página web. |
| `SASS` | Para modularizar el `CSS` y hacerlo más fácil de mantener
| `npm` | Para instalar paquetes como `SASS` y otros. |
| `Node` | Para ejecutar comandos de `npm` y otros. |
| `Git` | Para versionar el proyecto y colaborar con otros. |
| `GitHub` | Para alojar paquetes de software y colaborar con otros. |
| `npm` | Para instalar paquetes como `SASS` y otros. |
| `Node` | Para ejecutar comandos de `npm` y otros. |
