import elementos from "./elementos.js";
import controlador_vista from "./controlador.js";
import Usuario from "../clases/usuario.js";

export const usuario = {actual: {} };

export function registrarUsuario(event) {
    event.preventDefault();
// verificamos si el arrelo existe
const baseUsuarioExiste = localStorage.getItem("Usuarios");
let baseUsuarios = [];

// si el rreglo existe, quiere decir que probanlemente tenga usuarios ya registrados dentro.
if(baseUsuarioExiste) {
// fucionamos el arreglo vacio con el arreglo traido del localStorage
baseUsuarios = baseUsuarios.concat(JSON.parse(baseUsuarioExiste));
// buscamos en dicho arreglo si existe un usuario ya registrado con el correo que pusimos en el campo de registro
const usuarioExistente = baseUsuarios.find(usuario => usuario.correo == elementos.correoRegister.value);
// si el usuario existe arroja un error
if (usuarioExistente) {
  elementos.pErrorRegister.textContent = "Ya hay un usuario registrado con este correo";
  return;
}

}
// sin importar si existe o no el arreglo, preguntamos si la clave de confirmación es la misma
if (elementos.claveRegister.value != elementos.claveConfirRegister.value) {
  elementos.pErrorRegister.textContent = "Las contraseñas no coinciden";
  return;
}
// si no hay ningun error, vaciamos el parrafo de error
elementos.pErrorRegister.textContent = "";
// también creamos un objeto con los datos a guardar
const usuarioGuardar = new Usuario(
  // baseUsuarios.length,
  elementos.nombreRegister.value.replaceAll("<","&#60").replaceAll(">","&#62"),
  elementos.apellidoRegister.value.replaceAll("<","&#60").replaceAll(">","&#62"),
  elementos.correoRegister.value.replaceAll("<","&#60").replaceAll(">","&#62"),
  elementos.edadRegister.value.replaceAll("<","&#60").replaceAll(">","&#62"),
  elementos.claveRegister.value.replaceAll("<","&#60").replaceAll(">","&#62"),
  "https://st4.depositphotos.com/7402484/31013/i/450/depositphotos_310131004-stock-photo-red-parrot-scarlet-macaw-ara.jpg"
);

// const unUsuarioNuevo = new Usuario()
// sin importar si el arreglo existe o no, agregamos el usuario al arreglo
baseUsuarios.push(usuarioGuardar);

// localStorage no entiende los arreglos asi que los convertimos en JSON
const stringBaseUsuarioConUsuarioGuardado = JSON.stringify(baseUsuarios);

// guardamos el JSON bajo la clave "Usuarios", ya que no queremos mezclar los usuarios con las notas, ambos estaran en arreglos.
localStorage.setItem("Usuarios", stringBaseUsuarioConUsuarioGuardado);
// luego de haber guardado en localStorage, felicitamos al usuario
alert("Usuaario registrado con éxito");
// borramos los campos
setTimeout(() => {
  elementos.formRegister.reset();
}, 500);
// ayudamso al usuaroi colocandole el correo en el formLogin
elementos.correoLogin.value = usuarioGuardar.correo;
// nos vamos para el formLogin
controlador_vista.actualizar_vista(0);

elementos.nombrePerfil.textContent = `${usuarioGuardar.nombre.replaceAll("&#60;", "<").replaceAll("&#60;", ">")} ${usuarioGuardar.nombre.replaceAll("&#60;", "<").replaceAll("&#60;", ">")}`
elementos.nombrePerfilHeader.textContent = `${usuarioGuardar.nombre.replaceAll("&#60;", "<").replaceAll("&#60;", ">")}`

}

export function ingresarUsuario(event) {
    event.preventDefault();
// consultar si existe la base de datos Usuario
const baseUsuarioExiste = localStorage.getItem("Usuarios");
let baseUsuarios = [];

// si el rreglo existe, quiere decir que probanlemente tenga usuarios ya registrados dentro.
if(!baseUsuarioExiste) {
elementos.pErrorLogin.textContent = "usuario no encontrado";
  return;
}
// si existe, fucionarlo con el arreglo vacio
baseUsuarios = baseUsuarios.concat(JSON.parse(baseUsuarioExiste));

let campoCorreo = elementos.correoLogin.value.replaceAll("<","&#60").replaceAll(">","&#62");

const usuarioExistente = baseUsuarios.find(usuario => usuario.correo == campoCorreo);
// si el usuario no existe arroja un error
if (!usuarioExistente) {
  elementos.pErrorLogin.textContent = "Usuario no encontrado";
  return;
}

let campoClave = elementos.claveLogin.value.replaceAll("<","&#60").replaceAll(">","&#62");
// verificar si 
if (usuarioExistente.clave != campoClave) {
      elementos.pErrorLogin.textContent = "Contraseña incorrecta";
      return;
    }
elementos.pErrorLogin.textContent = "";
    
alert(`¡Bienvenido/a ${usuarioExistente.nombre.replaceAll("&#60","<").replaceAll("&#62",">")}`);
usuario.actual = usuarioExistente;
elementos.imagenPerfil.src = usuario.actual.foto;
elementos.nombrePerfil.textContent = usuario.actual.nombre.replaceAll("&#60","<").replaceAll("&#62",">") + " " + usuario.actual.apellido.replaceAll("&#60","<").replaceAll("&#62",">");
elementos.nombrePerfilHeader.textContent = `${usuarioExistente.nombre.replaceAll("&#60","<").replaceAll("&#60",">")}`

setTimeout(() => {
  elementos.formLogin.reset();
}, 500);

controlador_vista.actualizar_vista(2)
}
// const sistema_usuario = {
// }

// export default sistema_usuario;;