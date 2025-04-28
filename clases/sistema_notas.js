import elementos from "../utils/elementos.js";
import { usuario } from "../utils/sistema_usuarios.js";
import Nota from "../clases/notas.js";
import controlador_vista from "../utils/controlador.js";

export function crearNotas(event) {
    event.preventDefault();

    let titulo = "";
    let descripcion = "";

    titulo = elementos.inputTituloNota.value;
    descripcion = elementos.inputDescriptionNota.value;

    if (
        titulo.replaceAll(" ", "") == "" || descripcion.replaceAll(" ", "") == ""
    ) {
        alert(`Asegurate de llenar todos los campos ${usuario.actual.nombre}`);
        return;
    }

    const baseNotasExiste = localStorage.getItem("Notas");

    let baseNotas = [];

    if (baseNotasExiste) {
        baseNotas = baseNotas.concat(JSON.parse(baseNotasExiste));
    }

    // titulo = titulo.replaceAll("<","&#60").replaceAll(">","&#62");
    // descripcion = descripcion.replaceAll("<","&#60").replaceAll(">","&#62");

    const nuevaNota = new Nota(
        // baseNotas.length,
        titulo.replaceAll("<", "&#60;").replaceAll(">", "&#62;"),
        descripcion.replaceAll("<", "&#60;").replaceAll(">", "&#62;"),
        usuario.actual.correo
    );

    baseNotas.push(nuevaNota);

    localStorage.setItem("Notas", JSON.stringify(baseNotas));

    alert("La Nota fué agregada con éxito");

    controlador_vista.actualizar_vista(3);

    setTimeout(() => {
        elementos.formNotas.reset();
        crearHTMLNota(nuevaNota);
    }, 1000);
}

export function traerNotas(quien) {
    const baseNotasExiste = localStorage.getItem("Notas");
    let baseNotas = [];

    // si no existe no hace nada
    if (!baseNotasExiste) {
        return;
    }

    baseNotas = baseNotas.concat(JSON.parse(baseNotasExiste));

    let notasUsuario = baseNotas.filter((nota) => nota.correo == quien);

    if (notasUsuario.length == 0) {
        return;
    }

    crearHTMLNota(...notasUsuario);
    // notasUsuario.forEach(
    //     (nota) => {
    //         crearHTMLNota(nota);
    //     }
    // )
}

export function limpiarNotas() {
    let notasEnGroupNotes = document.getElementsByClassName("memo");

    if (notasEnGroupNotes.length == 0) {
        return;
    }

    for (const notaHTML of notasEnGroupNotes) {
        notaHTML.className = "memo hide-note";
    }
    // notasEnGroupNotes = Array.from(notasEnGroupNotes);

    // notasEnGroupNotes.forEach(
    //     (notaHTML) => {
    //         notaHTML.className = "memo hide-note"
    //     }
    // )
}

function crearHTMLNota(...notas) {
    let textoHTML = "";

    for (const { id, titulo, descripcion, estado } of notas) {
        let color_select = "";
        if (estado == 1) color_select = "orange";
        if (estado == 2) color_select = "green";
        if (estado == 3) color_select = "red";

        // if (!eliminada) {
        textoHTML += `
        <div class="memo show-note" id="nota${id}">
            <div>
                <label>
                    <h2>${titulo}</h2>
                    <div class="eliminar">
                        <img src="./img/three-dots-vertical.svg" alt="">
                        <ul>
                            <li class="btn-modificar-nota" >Modificar</li>
                            <li class="btn-borrar-nota">Borrar</li>
                        </ul>
                    </div>
                </label>
                <p>${descripcion}.</p>
                <select style="color: ${color_select};" class="opcion${estado}" >
                    <option ${estado == 1 ? "selected" : ""} style="color: orange;" value="1">Pendiente</option>
                    <option ${estado == 2 ? "selected" : ""} style="color: green;" value="2">Completada</option>
                    <option ${estado == 3 ? "selected" : ""} style="color: red;" value="3">No Completada</option>
                </select>
            </div>
        </div>`;

        // <div class="memo show-note" id="nota${id}">
        //   <div>
        //       <strong>${titulo}.</strong>
        //       <p>${descripcion}</p>
        //       <select style="color: ${color_select};" >
        //         <option ${estado == 1 ? "selected" : "" } style="color: orange;" value="1">Pendiente</option>
        //         <option ${estado == 2 ? "selected" : "" } style="color: green;" value="2">Completa</option>
        //         <option ${estado == 3 ? "selected" : "" } style="color: red;" value="3">No Completada</option>
        //       </select>
        //   </div>
        // </div>

        setTimeout(() => {
            document.getElementById(`nota${id}`).className = "memo";
        }, 1000);
        // }
    }

    elementos.groupNotes.innerHTML += textoHTML;

    const evento_falso = new Event("change");

    elementos.categoriaNotas.dispatchEvent(evento_falso);
}

export function cambiarEstadoNota(event) {
    if (event.target.tagName != "SELECT") return;
    // estilo del campo
    const selectDeLaNota = event.target;

    // valor enn el localStorage
    const idDeLaNota = selectDeLaNota.closest(".memo").id.replace("nota", "");
    const nuevo_estado = selectDeLaNota.value;

    //   Aca verificamos que las notas realmente existen
    const baseNotasExiste = localStorage.getItem("Notas");
    let baseNotas = [];

    if (!baseNotasExiste) {
        alert("Error al acceder a la base de datos");
        return;
    }

    baseNotas = baseNotas.concat(JSON.parse(baseNotasExiste));

    const indiceNotaObtenida = baseNotas.findIndex(
        (nota) => nota.id == idDeLaNota
    );
    if (indiceNotaObtenida == -1) {
        alert("Error al cambiar el estado de la nota");
        return;
    }

    let estado_anterior = selectDeLaNota.className.replace("opcion","");
    selectDeLaNota.querySelector(`option:nth-child(${estado_anterior})`).toggleAttribute("selected", false);

    const notaModificable = new Nota();

    notaModificable.colocarValores(baseNotas[indiceNotaObtenida]);

    let estadoPalabra = selectDeLaNota.options[selectDeLaNota.selectedIndex].text;

    notaModificable.cambiarEstado(estadoPalabra);

    baseNotas[indiceNotaObtenida] = notaModificable;

    localStorage.setItem("Notas", JSON.stringify(baseNotas));

    selectDeLaNota.style.color = selectDeLaNota.querySelector(`option:nth-child(${nuevo_estado})`).style.color;

    selectDeLaNota.className = `opcion${nuevo_estado}`;

    selectDeLaNota.querySelector(`option:nth-child(${nuevo_estado})`).toggleAttribute("select", true);

    const evento_falso = new Event("change");

    elementos.categoriaNotas.dispatchEvent(evento_falso);
}

export function filtrarNotas(event) {
    const selectDeLaNota = event.target;
    const nuevo_estado = parseInt(selectDeLaNota.value);
    selectDeLaNota.style.color = selectDeLaNota.querySelector(`option:nth-child(${nuevo_estado + 1})`).style.color;

    const notasAgregadas = elementos.groupNotes.getElementsByClassName("memo");

    if (notasAgregadas.length == 0) {
        return;
    }
    for (const nota of notasAgregadas) {
        const select_de_la_nota = nota.querySelector("select");
        const valor_elegido = select_de_la_nota.value;

        if (nuevo_estado == 0) {
            animarNotaEspecifica(nota, true);
        } else {
            animarNotaEspecifica(nota, valor_elegido == nuevo_estado);
        }
    }
}

export function cambiarNota(event) {
    const etiqueta = event.target;

    if(etiqueta.tagName != "LI") return;

    // obtengo la nota
    const nota = etiqueta.closest(".memo");

    // obtengo el id de la nota
    const idNota = nota.id.replace("nota", "");

    const baseNotasExiste = localStorage.getItem("Notas");
    let baseNotas = [];

    if(!baseNotasExiste) {
        alert("Error, la base de datos de notas no existe");
    }

    baseNotas = baseNotas.concat(JSON.parse(baseNotasExiste));

    const indiceNotaExiste = baseNotas.findIndex(n => n.id == idNota);
    if(indiceNotaExiste == -1) {
        alert("Error, la nota no existe");
        return;
    }


    if(etiqueta.className == "btn-modificar-nota") {
        desplegarModificarNota(idNota, indiceNotaExiste, baseNotas);
       
    }

    if(etiqueta.className == "btn-borrar-nota") {
        borrarNota(nota, idNota, indiceNotaExiste, baseNotas);
    }
} 

function desplegarModificarNota(idNota, posicionNota, baseNotas) {
    elementos.modalNotas.classList.remove("modal-hidden");
    elementos.tituloNotaModificar.value = baseNotas[posicionNota].titulo;
    elementos.descripcionNotaModificar.value = baseNotas[posicionNota].descripcion;
    elementos.modalNotas.classList.add(`nota${idNota}`);
}

export function modificarNota(event) {
    event.preventDefault()

const baseNotasExiste = localStorage.getItem("Notas");
const baseNotas = baseNotasExiste ? JSON.parse(baseNotasExiste) : [];

if (!baseNotas.length) { // que pasa aqui???
    alert("Error al acceder a la base de datos");
    return;
}

let idNota = "";

for (const clase of elementos.modalNotas.classList) {
    if(clase.startsWith("nota")) {
        idNota = clase;
        elementos.modalNotas.classList.remove(clase);
    }
}

const indiceNotaExiste = baseNotas.findIndex(not => not.id == idNota.replace("nota",""));

if(indiceNotaExiste == -1) {
    alert("La nota que desea modificar ya no existe");
    return;
}

baseNotas[indiceNotaExiste].titulo = elementos.tituloNotaModificar.value.replaceAll("<","!&#60;").replaceAll(">","&#62");
baseNotas[indiceNotaExiste].descripcion = elementos.descripcionNotaModificar.value.replaceAll("<","!&#60;").replaceAll(">","&#62");
localStorage.setItem("Notas", JSON.stringify(baseNotas));

const notaHTML = document.getElementById(idNota);

elementos.modalNotas.classList.add("modal-hidden")

setTimeout(() => {
    elementos.formModalNotas.reset();

    animarNotaEspecifica (htmlNota, false);
    setTimeout(() => {
        htmlNota.querySelector("strong").textContent = baseNotas[indiceNotaExiste].titulo;
        htmlNota.querySelector("p").textContent = baseNotas[indiceNotaExiste].descripcion;
        animarNotaEspecifica(htmlNota, true)
    }, 1000);
    
}, 1000);

    
}

export function cancelarModificarNota() {
    elementos.modalNotas.classList.add("modal-hidden");
    for (const clase of elementos.modalNotas.classList) {
        if (clase.startsWith("nota")) {
            elementos.modalNotas.classList.remove(clase);
        }
    }
    setTimeout(() => {
        elementos.formModalNotas.reset();
    }, 300);
}

function borrarNota(elementoNota, idNota, posicionNota, baseNotas){
    baseNotas.splice(posicionNota,1);
    localStorage.setItem("Notas", JSON.stringify(baseNotas));

    animarNotaEspecifica(elementoNota,false);
    setTimeout(() => {
       document.getElementById(`nota${idNota}`).remove(); 
    }, 1000);
} 

function animarNotaEspecifica(cual, quiero_mostrar) {
    // si quiero mostrar, ejecuto esto
    if (quiero_mostrar) {
        // si ya tiene la clase no animar
        if (cual.className == "memo show-note") return;
        // le coloco la animiacion
        cual.className = "memo show-note";
        // si ya se animo, le quito la clase
        setTimeout(() => {
            cual.className = "memo show-note";
        }, 1000);
    } else {
        // si ya tiene la calse no animar
        if (cual.className == "memo hide-note") return;
        // le coloco la clase de animación
        cual.className = "memo hide-note";
        // si ya se animo lq quito la clase
        setTimeout(() => {
            cual.className = "memo hide-note";
        }, 1000);
    }
}

