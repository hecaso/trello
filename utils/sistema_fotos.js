import elementos from "./elementos.js";
import {usuario} from "./sistema_usuarios.js";
import extractFrom from "extract-uri-image";

// export function cancelarCambioFoto() {
//     elementos.imgHeader.src = usuario.actual.foto;
//     controlador_vista.actualizar_vista(3);
//     elementos.nombrePerfilHeader.textContent = usuario.actual.nombre.replaceAll("&#60","<").replaceAll("&#62",">");
    
//     setTimeout(() => {
//       traerNotas(usuario.actual.correo)
//     }, 500);
// }

// export function guardarCambioFoto() {
//     // let urlFoto = elementos.imagenPerfil.src;
//     // extraer el url de la foto
//       let extraerUrl = elementos.imagenPerfil.src;

//       // buscar en el localStorage la base de datos de usuario
//       const baseUsuarioExiste = localStorage.getItem("Usuarios");
//       let baseUsuarios = [];

//       // si no esxiste
//       if (!baseUsuarioExiste) {
//         alert("error al acceder a la base de datos")
//         return;
//       }

//       baseUsuarios = baseUsuarios.concat(JSON.parse(baseUsuarioExiste));

//       const indiceUsuarioExistente = baseUsuarios.findIndex(usuarioBuscar => usuarioBuscar.correo == usuario.actual.correo);

//       if (indiceUsuarioExistente == -1) {
//         alert("Error al cambiar la foto del perfil");
//         return;
//       }
//       baseUsuarios[indiceUsuarioExistente].foto = extraerUrl;

//       usuario.actual.foto = extraerUrl;

//       elementos.imgHeader.style.backgroundImage = `url(${extraerUrl})`;

//       elementos.nombrePerfilHeader.textContent = usuario.actual.nombre.replaceAll("&#60","<").replaceAll("&#62",">");

//       localStorage.setItem("Usuarios", JSON.stringify(baseUsuarios));

//       controlador_vista.actualizar_vista(3);

//       setTimeout(() => {
//         traerNotas(usuario.actual.correo)
//       }, 500);
// }
export function cambiarFoto() {
  elementos.changeImagePreview.src = elementos.imagenPerfil.src;
  elementos.modalFoto.classList.remove("modal-hidden")  
}

export function cancelarModificarFoto() {
  elementos.modalFoto.classList.add("modal-hidden");
  
  setTimeout(() => {
    elementos.changeImagePreview.src = "./img/user.svg";
    elementos.formModalFoto.reset();
  }, 300);
}

export function cambiarFotoUrl() {
    let nuevaFoto = prompt("Ingresa el enlace de la nueva foto");
    
    if (nuevaFoto == null) {
        return;
    }

   const fotoPrueba = new Image();
    
    fotoPrueba.onload = async () => {
      try {
        const resultado = await extractFrom.url(nuevaFoto);
        elementos.changeImagePreview.src = resultado
      } catch (error) {
        elementos.changeImagePreview.src = error;
      }

    };

    fotoPrueba.onerror = () => {
      alert("Error al cargar la imagen");
    }
    
    fotoPrueba.src = nuevaFoto;
    if(nuevaFoto.replaceAll(" ", "") == "") {
        alert("Debes ingresar una URL válida");
        return
    }

}

export function aceptarModificacionFoto(event) {
  event.preventDefault();

      // consultar si existe la base de datos de "Usuarios"
      const baseUsuarioExiste = localStorage.getItem("Usuarios")
      let baseUsuarios = [];
      
      // si no existe la base de datos, arrojar un error diciendo que no esta registrado o encontrado
      if(!baseUsuarioExiste) {
          alert("Error al acceder a la base de datos");
          return;
      };

        // si existe, fusionarlo con el arreglo vacios
      baseUsuarios = baseUsuarios.concat(JSON.parse(baseUsuarioExiste));

      const usuarioExistente = baseUsuarios.find(usuarioBuscar => usuarioBuscar.correo.toLowerCase() === usuario.actual.correo.toLowerCase());

          // Si el usuario existe, Y NO ES LO MISMO arrojar un error
    if(!usuarioExistente) {
      alert("Error al cambiar la foto de perfil")
      return;
    };

    usuario.temporal.foto = elementos.changeImagePreview.src;
    elementos.imagenPerfil.src = usuario.temporal.foto;
    elementos.modalFoto.classList.add("modal-hidden");
    alert("Se ha modificado la foto del perfil correctamente\nPresiona 'guardar' para confirmar cambios");

    setTimeout(() => {
      elementos.formModalFoto.reset();
    }, 300);
}

export async function cambiarFotoFile(event) {

  const input = event.target;
  
  if(input.files[0] == undefined) return;

    try {
      const resultado = await extractFrom.input(input);
      elementos.changeImagePreview.src = resultado
    } catch (error) {
      elementos.changeImagePreview.src = error;
    }

}