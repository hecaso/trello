import Plantilla from "./plantillas.js";

class Nota extends Plantilla {
    constructor(titulo = new String, descripcion = new String, correo = new String){
        super();
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.correo = correo;
        // 1 Pendiente  // 2 Completa  // 3 No Completadas
        this.estado = 1;
    }
    cambiarEstado(nuevo_estado){
        switch (nuevo_estado) {
            case "Pendiente":
                this.estado = 1;
                break;
            case "Completada":
                this.estado = 2;
                break;
            case "No Completada":
                this.estado = 3;
                break;
            default:
                throw new Error(`Estado no válido '${nuevo_estado}', pero los valores validos son 'Pendiente', 'Completada' o 'No Completada'`);
        }
    }

    colocarValores(objeto) {
        for (const clave in objeto) {
           this[clave] = objeto[clave];
        }
    }
}

// let notas = new Nota()

// notas.cambiarEstado("Incompleto");
// console.log(notas.estado)

export default Nota;