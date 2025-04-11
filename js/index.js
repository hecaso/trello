// import Usuario from "../clases/usuario.js";
import elementos from "../utils/elementos.js";
import controlador_vista from "../utils/controlador.js";
// import sistema_usuario from "../utils/sistema_usuarios.js";
import {registrarUsuario, ingresarUsuario} from "../utils/sistema_usuarios.js";
import {cambiarDatos, cancelarCambioFoto, guardarCambioFoto} from "../utils/sistema_fotos.js";
import * as irA from  "../utils/sistema_vistas_simples.js";
import { cambiarEstadoNota, cambiarNota, crearNotas, filtrarNotas } from "../clases/sistema_notas.js";


// import { filtrarNotas } from "../clases/sistema_notas.js";

// colocar un mediaquiery desde js
// window.addEventListener("resize", ()=> {
//     const mediaQuery = window.matchMedia("(max-width: 400px)");
//     if (mediaQuery.matches) {
//         // estilo si se cumple
//         elementos.headerLiConfig.style.color = "yellow";
//         elementos.headerLiConfig.style.background = "red";
//         elementos.headerLiExit.style.color = "red";
//         elementos.headerLiConfig.style.background = "green";
//     }else {
//         // estilo si no se cumple
//         elementos.headerLiConfig.style.color = "red";
//         elementos.headerLiExit.style.color = "green";

//     }
// })

window.addEventListener("resize",() => {
    const mediaQuery = window.matchMedia("(max-aspect-ratio: 4/5)");
    elementos.header.querySelector("nav ul").style.display = mediaQuery.matches ? "flex" : "none";
    setTimeout(() => {
        elementos.header.querySelector("nav ul").style.display = "flex";
    }, 1);
})
  


// // con esta linea llamamos todas las anteriores ya que el objeto fue desestructurizado en el archivo controlador
// controlador_vista.asignarElemento(elementos);

controlador_vista.actualizar_vista(0);


elementos.pEnlaceLogin.addEventListener("click",irA.regis);

elementos.pEnlaceRegister.addEventListener("click",irA.login);

elementos.formRegister.addEventListener("submit", registrarUsuario);

elementos.formLogin.addEventListener("submit", ingresarUsuario);
    // evitamos que el navegador cargue la pagina


// elementos.formLogin.addEventListener("submit", (event) => {
//   event.preventDefault();

//   const stringtregistrado = localStorage.getItem(elementos.correoLogin.value);

//   if (stringtregistrado == null) {
//     elementos.pErrorLogin.textContent = "Usuario no registrado";
//     return;
//   }

//   const usuarioRegistrado = JSON.parse(stringtregistrado);
//   if (usuarioRegistrado.clave != elementos.claveLogin.value) {
//     elementos.pErrorLogin.textContent = "Contraseña incorrecta";
//     return;
//   }


// });



elementos.btnCancelar.addEventListener("click", cancelarCambioFoto);

elementos.headerLiConfig.addEventListener("click", irA.configuracion )

elementos.headerLiExit.addEventListener("click", irA.salir )

elementos.btnCambiarDatos.addEventListener("click", cambiarDatos);

// elementos.btnGuardar.addEventListener("click",
//     () => {
//         let urlFoto = imagenPerfil.style.backgroundImage;
//         let extraerUrl = urlFoto.replace('url("', "").replace('")',"");
//         controlador_vista.usuario.actual.foto = extraerUrl;
//         localStorage.setItem(
//             controlador_vista.usuario.actual.correo,
//         JSON.stringify(controlador_vista.usuario.actual)
//     );
//     elementos.imgHeader.style.backgroundImage = `url(${controlador_vista.usuario.actual.foto})`;
//     controlador_vista.actualizar_vista(3);
//     }
// )

elementos.btnGuardar.addEventListener("click", guardarCambioFoto);
elementos.formNotas.addEventListener("submit", crearNotas);
elementos.categoriaNotas.addEventListener("change",filtrarNotas);

elementos.groupNotes.addEventListener("change", cambiarEstadoNota);
elementos.groupNotes.addEventListener("click", cambiarNota);
