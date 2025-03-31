import elementos from "./elementos.js";
import controlador_vista from "./controlador.js";
import {usuario} from "./sistema_usuarios.js";
import { traerNotas } from "../clases/sistema_notas.js";

export function cancelarCambioFoto() {
    elementos.imgHeader.src = usuario.actual.foto;
    controlador_vista.actualizar_vista(3);
    elementos.nombrePerfilHeader.textContent = usuario.actual.nombre.replaceAll("&#60","<").replaceAll("&#62",">");
    
    setTimeout(() => {
      traerNotas(usuario.actual.correo)
    }, 500);
}

export function guardarCambioFoto() {
    // let urlFoto = elementos.imagenPerfil.src;
    // extraer el url de la foto
      let extraerUrl = elementos.imagenPerfil.src;

      // buscar en el localStorage la base de datos de usuario
      const baseUsuarioExiste = localStorage.getItem("Usuarios");
      let baseUsuarios = [];

      // si no esxiste
      if (!baseUsuarioExiste) {
        alert("error al acceder a la base de datos")
        return;
      }

      baseUsuarios = baseUsuarios.concat(JSON.parse(baseUsuarioExiste));

      const indiceUsuarioExistente = baseUsuarios.findIndex(usuarioBuscar => usuarioBuscar.correo == usuario.actual.correo);

      if (indiceUsuarioExistente == -1) {
        alert("Error al cambiar la foto del perfil");
        return;
      }
      baseUsuarios[indiceUsuarioExistente].foto = extraerUrl;

      usuario.actual.foto = extraerUrl;

      elementos.imgHeader.style.backgroundImage = `url(${extraerUrl})`;

      elementos.nombrePerfilHeader.textContent = usuario.actual.nombre.replaceAll("&#60","<").replaceAll("&#62",">");

      localStorage.setItem("Usuarios", JSON.stringify(baseUsuarios));

      controlador_vista.actualizar_vista(3);

      setTimeout(() => {
        traerNotas(usuario.actual.correo)
      }, 500);
}

export function cambiarFoto() {
    let nuevaFoto = prompt("Ingresa el enlace de la nueva foto");
    if (nuevaFoto == null) {
        return;
    }

    const fotoPrueba = new Image();
    
    fotoPrueba.onload = () => {
      elementos.imagenPerfil.src = nuevaFoto;
    };
    
    fotoPrueba.onerror = () => {
      alert("Error al cargar la imagen");
    }
    
    fotoPrueba.src = nuevaFoto;
    // if(nuevaFoto.replaceAll(" ", "") == "") {
    //     alert("Debes ingresar una URL válida");
    //     return
    // }

}