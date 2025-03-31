import Plantilla from "./plantillas.js";

class Usuario extends Plantilla{
  
    constructor(nombre, apellido, correo, edad, clave, foto) {
      super();
      this.nombre = nombre;
      this.apellido = apellido;
      this.correo = correo;
      this.edad = edad;
      this.clave = clave;
      this.foto = foto;
    }
  }

  export default Usuario;