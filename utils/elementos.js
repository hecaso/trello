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
    cardNote: document.querySelector(".memo"),
  
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
    btnCambiar: document.getElementById("btn-cambiar"),
    btnGuardar: document.getElementById("btn-guardar"),
    btnCancelar: document.getElementById("btn-cancelar"),

    // Elementos Notas
    formNotas: document.getElementById("form-notes"),
    inputTituloNota: document.getElementById("note-title-input"),
    inputDescriptionNota: document.getElementById("note-desc-input"),
    categoriaNotas: document.getElementById("agruparNotas"),
    groupNotes: document.getElementById("notes"),
  
  }

  export default elementos;