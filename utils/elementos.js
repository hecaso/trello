const elementos = {
    // elementos del header
    header: document.querySelector("header"),
    imgHeader: document.getElementById("imgHeader"),
    headerMobileCheck: document.querySelector("header nav label input"),
    headerLiConfig: document.getElementById("config"),
    headerLiExit: document.getElementById("exit"),
  
    // contenedro principal
    divContainer: document.getElementById("container"),
    divNote: document.querySelector("#cont-notes"),
    formNote: document.getElementById("form-notes"),
    cardNote: document.querySelector("#notes"),
  
    // elementos del login
    sectionLogin: document.getElementById("iniciarSeccion"),
    formLogin: document.getElementById("initSection"),
    correoLogin: document.getElementById("email-login"),
    claveLogin: document.getElementById("password-login"),
    pErrorLogin: document.querySelector("#iniciarSeccion .error-p"),
    pEnlaceLogin: document.getElementById("none_init"),
    
    // elementos del registro
    sectionRegistro: document.getElementById("registrarse"),
    formRegister: document.getElementById("register"),
    nombreRegister: document.getElementById("nombre"),
    apellidoRegister: document.getElementById("apellido"),
    correoRegister: document.getElementById("email-register"),
    edadRegister: document.getElementById("edad"),
    claveRegister: document.getElementById("password-register"),
    claveConfirRegister: document.getElementById("password-confRegister"),
    pErrorRegister: document.querySelector("#registrarse .error-p"),
    pEnlaceRegister: document.getElementById("none_reg"),
  
    // elementos del perfil
    sectionPerfil: document.getElementById("perfil"),
    formPerfil: document.querySelector("#perfil .perfil"),
    nombrePerfilHeader: document.querySelector("nav .subtitle"),
    nombrePerfil: document.querySelector("#perfil .subtitle"),
    imagenPerfil: document.getElementById("imgChange"),
    btnCambiarDatos: document.getElementById("btn-cambiar"),
    btnDataGuardar: document.getElementById("btn-guardar"),
    btnDataCancelar: document.getElementById("btn-cancelar"),

    // Elementos Notas
    formNotas: document.getElementById("form-notes"),
    inputTituloNota: document.getElementById("note-title-input"),
    inputDescriptionNota: document.getElementById("note-desc-input"),
    categoriaNotas: document.getElementById("agruparNotas"),
    groupNotes: document.getElementById("notes"),

    // modal modificar datos

    modalDatos: document.querySelector(".modal-datos"),
    formModalDatos: document.querySelector(".modal-datos form"),
    nombreModificar: document.getElementById("nombreModificar"),
    apellidoModificar: document.getElementById("apellidoModificar"),
    emailModificar: document.getElementById("email-registerModificar"),
    edadModificar: document.getElementById("edadModificar"),
    contraseñaAnterior: document.getElementById("password-anterior"),
    contraseñaModificar: document.getElementById("password-registerModificar"),
    confiContraseñaModificar: document.getElementById("password-confRegisterModificar"),
    pErrorpModificar: document.querySelector(".modal-datos .error-p"),
    cancelarModificar: document.querySelector(".modal-datos form .btn[type='button']"),
    cancelarDatos: document.querySelector(".modal-datos .cont-modal form .btn[type='button']"),

    // modal modificar notas
    modalNotas: document.querySelector(".modal-notas"),
    formModalNotas: document.querySelector(".modal-notas form"),
    tituloNotaModificar: document.getElementById("mod-note-title-input"),
    descripcionNotaModificar: document.getElementById("mod-note-desc-input"),
    cancelarNotaModificar: document.querySelector(".modal-notas form .btn-2[type='button']"),

    // modal modificar foto
    modalFoto: document.querySelector(".modal-image"),
    formModalFoto: document.querySelector(".modal-image form"),
    btnChangeUrlFoto: document.getElementById("btnChangeUrl"),
    btnChangeFileFoto: document.getElementById("inputChangeFile"),
    changeImagePreview: document.querySelector(".modal-image form img"),
    btnCancelarChangeImage: document.querySelector(".modal-image form div button[type='button")

  };

// console.log(elementos)

  export default elementos;