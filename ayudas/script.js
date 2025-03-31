// Iniciar Seccion
const emailLogin = document.getElementById('email-login');
const passwordLogin = document.getElementById('password-login');
const pErrorLogin = document.querySelector('#iniciarSeccion .Error-p');

// registrarse
const nombreRegister = document.getElementById('nombre');
const apellidoRegister = document.getElementById('apellido');
const emailRegister = document.getElementById('email');
const edadRegister = document.getElementById('edad');
const passwordRegister = document.getElementById('password');
const passwordConf = document.getElementById('passwordConf');
const pErrorRegister = document.querySelector('#registrarse .Error-p');

// perfil
const imgChange = document.getElementById('imgChange');
const imgHeader = document.getElementById('imgHeader');

const header = document.querySelector('header');
const iniciarSeccion = document.getElementById("iniciarSeccion");
const registrarse = document.getElementById("registrarse");
const perfil = document.getElementById("perfil");


// vista 0, login
// vista 1, register
// vista 2, foto
// vista default, ya ingrese
const controlador_vista = {
    vista_actual: 0,
    usuario: {},
    actualizar_vista(cual_es_ahora) {
        this.vista_actual = cual_es_ahora;
        this.animar
        switch (cual_es_ahora) {
            case 0:
                header.style.display = "none"
                iniciarSeccion.style.display = "flex"
                registrarse.style.display = "none"
                perfil.style.display = "none"
                
                break;
            case 1:
                header.style.display = "none"
                iniciarSeccion.style.display = "none"
                registrarse.style.display = "flex"
                perfil.style.display = "none"
                break;
            case 2:
                header.style.display = "none"
                iniciarSeccion.style.display = "none"
                registrarse.style.display = "none"
                perfil.style.display = "flex"
                break;
            default:
                header.style.display = "flex"
                iniciarSeccion.style.display = "none"
                registrarse.style.display = "none"
                perfil.style.display = "none"
                break;
        }
    },

    
    animar() {
        document.getElementById("container").className = "container container-animation";
    }
}

controlador_vista.actualizar_vista(0);
document.getElementById("none_init").addEventListener("click", () => {
    controlador_vista.actualizar_vista(1);
    }
)

document.getElementById("none_reg").addEventListener("click", () => {
    controlador_vista.actualizar_vista(0);
    }
)

document.getElementById("config").addEventListener("click", () => {
    controlador_vista.actualizar_vista(2);
    }
)

document.getElementById("exit").addEventListener("click", () => {
    controlador_vista.actualizar_vista(0);
    }
)



// document.getElementById("none").addEventListener("click", () => {
//     controlador_vista.actualizar_vista(3);
//     }
// )



document.getElementById("initSection").addEventListener("submit",
    (event) => {
        event.preventDefault();

        let correo = emailLogin.value;
        let contraseña = passwordLogin.value;

        let usuarioObtenido = localStorage.getItem(correo);
        if (usuarioObtenido === null) {
            pErrorLogin.textContent = "Usuario no encontrado";
            return;
        }

        const usuarioConvertido = JSON.parse(usuarioObtenido);
        if (usuarioConvertido.contraseña == contraseña) {
            pErrorLogin.textContent = "Acceseo concedido";
            setTimeout(() => {
                controlador_vista.actualizar_vista(2);
                controlador_vista.usuario = usuarioConvertido;
            }, 1000);
        }else {
            pErrorLogin.textContent = "Contraseña incorrecta";
        }
    }
);

document.getElementById("register").addEventListener("submit", 
    (event) => {
        event.preventDefault();
        
        if(passwordRegister.value != passwordConf.value){
            pErrorRegister.textContent = "Las contraseñas no coinciden";
            return;
        }
        pErrorRegister.textContent = "";
        
        const usuarioGuardar = {
            nombre: nombreRegister.value,
            apellido: apellidoRegister.value,
            email: emailRegister.value,
            edad: edadRegister.value,
            contraseña: passwordRegister.value,
            imagen: "./svg/user.svg",
            
        }
        
        const stringUsuarioGuardar = JSON.stringify(usuarioGuardar);
        localStorage.setItem(usuarioGuardar.email, stringUsuarioGuardar);
        alert("¡Usuario creado con éxito!");
        setTimeout(() => {
            controlador_vista.actualizar_vista(0);
        }, 1000);
        event.target.reset();
    }
)

document.getElementById("btn-cancelar").addEventListener("click", 
    () => {
                setTimeout(() => {
            controlador_vista.actualizar_vista(3);
        }, 1000);
    }
)

document.getElementById("btn-guardar").addEventListener("click", 
    () => {
        
        controlador_vista.usuario.imagen = imgChange.src;
        const stringifyNuevaFoto = JSON.stringify(controlador_vista.usuario);
        localStorage.setItem(controlador_vista.usuario.correo, stringifyNuevaFoto);
        imgHeader.src = controlador_vista.usuario.imagen;
        
        setTimeout(() => {
        controlador_vista.actualizar_vista(3);
        }, 1000);

    }
 )

 document.getElementById("btn-cambiar").addEventListener("click", 
    () => {
        let changePhoto = prompt("Ingrese el enlace de la nueva foto");

        if (changePhoto === null) {
            return;
        }if(changePhoto.replaceAll(" ","") == "") {
            alert("url no valido")
            return;
        } 
        imgChange.src = changePhoto;

        // setTimeout(() => {
        // controlador_vista.actualizar_vista(3);
        // }, 1000);

    }
 )