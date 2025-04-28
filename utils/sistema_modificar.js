import elementos from "./elementos.js";
import controlador_vistas from "./controlador.js";
import { usuario } from "./sistema_usuarios.js";
import Usuario from "../clases/usuario.js";
import { traerNotas } from "../clases/sistema_notas.js";

export function guardarDatos() {

    const baseUsuarioExiste = localStorage.getItem("Usuarios");
    let baseUsuarios = [];

    if (!baseUsuarioExiste) {
       alert("Error al acceder a la base de datos");
       return;
    }

    baseUsuarios = baseUsuarios.concat(JSON.parse(baseUsuarioExiste));

    const baseNotasExiste = localStorage.getItem("Notas");
    let baseNotas = [];

    if(baseNotasExiste) {
        baseNotas = baseNotas.concat(JSON.parse(baseNotasExiste));
    }

    const indiceUsuarioExiste = baseUsuarios.findIndex(usuarioBuscar => usuarioBuscar.correo = usuario.actual.correo);
    if (indiceUsuarioExiste === -1) {
        alert("El usuario no se encuentra registrado.");
        return;
    }

    const emailTemporal = usuario.actual.correo;
    
    for (const clave in usuario.temporal) {
        usuario.actual[clave] = usuario.temporal[clave];
        baseUsuarios[indiceUsuarioExiste][clave] = usuario.actual[clave];
    }

    baseNotas.forEach(
        (nota) => {
            if(nota.correo == emailTemporal) {
                nota.correo = usuario.actual.correo;
            }
        }
    );

    elementos.imgHeader.src = usuario.actual.foto;
    
    elementos.nombrePerfilHeader.textContent = usuario.actual.nombre.replaceAll("&#60;","<").replaceAll("&#62;",">");

    localStorage.setItem("Usuarios",JSON.stringify(baseUsuarios));
    
    localStorage.setItem("Notas",JSON.stringify(baseNotas));

    controlador_vistas.actualizar_vista(3);

    setTimeout(() => {
        traerNotas(usuario.actual.correo);
        elementos.categoriaNotas.className = `cont-categorias show-category`
    }, 500);

    usuario.temporal = {};

    // elementos.modalDatos.classList.add("modal-hidden")
}

export function cancelarDatos() {
    usuario.temporal = {};
    elementos.imgHeader.src = usuario.actual.foto;
    elementos.nombrePerfilHeader.textContent = usuario.actual.nombre.replaceAll("&#60;","<").replaceAll("&#62;",">");
    controlador_vistas.actualizar_vista(3);
    setTimeout(() => {
        traerNotas(usuario.actual.correo);
        // elementos.categoriaNotas.className = `cont-categorias show-category`;
    }, 500);

    elementos.modalDatos.classList.add("modal-hidden")
}

export function cambiarDatos() {    
    elementos.nombreModificar.value = usuario.temporal.nombre;
    elementos.apellidoModificar.value = usuario.temporal.apellido;
    elementos.edadModificar.value = usuario.temporal.edad;
    elementos.emailModificar.value = usuario.temporal.correo;
    elementos.modalDatos.classList.remove("modal-hidden");
}

export function cancelarModificar() {
    elementos.modalDatos.classList.add("modal-hidden")
    setTimeout(() => {
        elementos.formModalDatos.reset();
    }, 300);
}

export function aceptarModificacion(event) {
    event.preventDefault();

    // consultar si existe la base de datos de "Usuarios"
    const baseUsuarioExiste = localStorage.getItem("Usuarios")
    let baseUsuarios = [];
    
    // si no existe la base de datos, arrojar un error diciendo que no esta registrado o encontrado
    if(!baseUsuarioExiste) {
        elementos.pErrorpModificar.textContent = "Error al acceder a la base de datos";
        return;
    };

    // si existe, fusionarlo con el arreglo vacios
    baseUsuarios = baseUsuarios.concat(JSON.parse(baseUsuarioExiste));

    let campoCorreo = elementos.emailModificar.value.replaceAll("<","&#60;").replaceAll(">","&#62;");
    
    const usuarioExistente = baseUsuarios.find(usuarioBuscar => usuarioBuscar.correo.toLowerCase() === campoCorreo.toLowerCase());

    // Si el usuario existe, Y NO ES LO MISMO arrojar un error
    if(usuarioExistente) {
        if(usuarioExistente.correo != usuario.actual.correo) {
            elementos.pErrorpModificar.textContent = "El correo electrónico ya está en uso por otro usuario";
            return;
        }
    };

    // La clave anterior no es la misma
    let campoClaveAnterior = elementos.contraseñaAnterior.value.replaceAll("<","&#60;").replaceAll(">","&#62;");
    console.log(campoClaveAnterior)
    console.log(usuario.actual.clave)

    if(campoClaveAnterior != usuario.actual.clave) {
        elementos.pErrorpModificar.textContent = "La contraseña anterior no es correcta";
        return;
    };

    // La clave nueva y su confirmación no es la misma
    let campoClaveNueva = elementos.contraseñaModificar.value;
    let campoClaveNuevaConfirmar = elementos.confiContraseñaModificar.value;
    if (campoClaveNueva !== campoClaveNuevaConfirmar) {
        elementos.pErrorpModificar.textContent = "Las contraseñas no coinciden";
        return;
    };

    // Si todo esta bien, modificar el usuario
    elementos.pErrorpModificar.textContent = "";

    usuario.temporal.nombre = elementos.nombreModificar.value.replaceAll("<","&#60;").replaceAll(">","&#62;");
    usuario.temporal.apellido = elementos.apellidoModificar.value.replaceAll("<","&#60;").replaceAll("<","&#62;");
    usuario.temporal.edad = elementos.edadModificar.value.replaceAll("<","&#60;").replaceAll("<","&#62;");
    usuario.temporal.email = campoCorreo;
    usuario.temporal.clave = campoClaveNueva;

    elementos.nombrePerfil.textContent = usuario.temporal.nombre.replaceAll("&#60;","<").replaceAll("&#62;","<") + "" + usuario.temporal.apellido.replaceAll("<","&#60;").replaceAll("<","&#62;");
    
    elementos.modalDatos.classList.add("modal-hidden");

    alert("Se ha modificado el usuario correctamente\npresione 'Guardar' para guardar los cambios");

    setTimeout(() => {
       elementos.formModalDatos.reset(); 
    }, 300);
}

