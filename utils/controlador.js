import elementos from "./elementos.js";

const controlador_vista = {
    
    // header: {},
    // sectionLogin: {},
    // sectionRegistro: {},
    // sectionPerfil: {},
    // divContainer: {}
    // asignarElemento({header, sectionLogin, sectionRegistro, sectionPerfil, divContainer,divNote, formNote, cardNote}) {
    //   this.header = header;
    //   this.sectionLogin = sectionLogin;
    //   this.sectionRegistro = sectionRegistro;
    //   this.sectionPerfil = sectionPerfil;
    //   this.divContainer = divContainer;
    //   this.divNote = divNote;
    //   this.formNote = formNote;
    //   this.cardNote = cardNote;
    // },

    actualizar_vista(cual_vista) {
      this.animar("hide-card");
      setTimeout(() => {
        // vista 0 es login
        elementos.sectionLogin.style.display = cual_vista == 0 ? "flex" : "none";
        // vista 1 es regis
        elementos.sectionRegistro.style.display = cual_vista == 1 ? "flex" : "none";
        // vista 2 es perfil
        elementos.sectionPerfil.style.display = cual_vista == 2 ? "flex" : "none";
        // vista 3 es dashboard
        elementos.header.style.top = cual_vista == 3 ? "0" : "calc( var(--header-height) *-1 )";
        
        elementos.divContainer.style.display = cual_vista == 3 ? "none" : "flex";

        elementos.divNote.style.display = cual_vista == 3 ? "flex" : "none";
  
        this.animar("show-card");
      }, 500);
    },
  
    animar(mostrar_ocultar, mostrar_ocultar_nota) {
      elementos.divContainer.className = `container ${mostrar_ocultar}`;
      elementos.formNote.className = `form-notes ${mostrar_ocultar}`;
      // elementos.cardNote.className = `memo ${importante_mostrar}`;
    },
  };
  

  export default controlador_vista;