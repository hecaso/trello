import elementos from "./elementos.js";
import controlador_vista from "./controlador.js";
import { usuario } from "./sistema_usuarios.js";
import { limpiarNotas  } from "../clases/sistema_notas.js";

export function configuracion() {
    elementos.imagenPerfil.src = usuario.actual.foto;
    elementos.nombrePerfil.textContent = usuario.actual.nombre.replaceAll("&#60","<").replaceAll("&#62",">")+ " " +usuario.actual.apellido.replaceAll("&#60","<").replaceAll("&#62",">");
    
    limpiarNotas();
    elementos.header.querySelector("nav").classList.add("hide-list");
    elementos.headerMobileCheck.checked = false;
    setTimeout(() => {
        controlador_vista.actualizar_vista(2);    
        elementos.groupNotes.innerHTML = "";
        elementos.formNotas.reset();

        setTimeout(() => {
            elementos.header.querySelector("nav").classList.remove("hide-list")
        }, 600);
    }, 2000);
}

export function salir() {
    usuario.actual = {};
    elementos.nombreRegister.textContent = "";
    elementos.imagenPerfil.src;
    
    // imagenPerfil.style.backgroundImage = `url(${controlador_vista.usuario_actual.foto})`;
    limpiarNotas();
    elementos.headerMobileCheck.checked = false;
    setTimeout(() => {
        elementos.nombrePerfil.textContent = usuario.actual.nombre;
        controlador_vista.actualizar_vista(0);     
        elementos.groupNotes.innerHTML = "";
    }, 2000);

}

export function login() {
    setTimeout(() => {
        controlador_vista.actualizar_vista(0);
        elementos.formRegister.reset();
    }, 500)
}

export function regis() {
    setTimeout(() => {
    controlador_vista.actualizar_vista(1);
    elementos.formLogin.reset();
    }, 500)
}