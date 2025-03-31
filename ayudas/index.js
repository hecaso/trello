class Usuario {
    #id_user;
    #email;
    #password;
    constructor (id_unico, nombre, apellido, edad, email, password, foto) {
        this.#id_user = id_unico;
        this.nombre = nombre;
        this.apellido = apellido;
        this.#email = email;
        this.edad = edad;
        this.#password = password;
        this.foto = foto;
    }
    eliminar(que_elimino, su_id_unico){
    }
}


class Cliente extends Usuario {
    #memos = [];
    agregarMemo(id_unico, titulo, descripcion) {
        this.#memos.push(new Memo(id_unico, titulo, descripcion, this));
    }
    eliminarMemo( id_unico ) {
        super.eliminar(this.#memos, id_unico);
    };

}

class Admin extends Usuario {
    #clientes = [];
    eliminarCliente(id_unico) {
        super.eliminar(this.#clientes, id_unico);
    }
}


class Memo {
    #id_memo;
    #cliente;
    #estado
    constructor(id_unico, titulo, descripcion, cliente) {
        this.#id_memo = id_unico;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.#cliente = cliente;
        this.#estado = "pendiente";
    }
}