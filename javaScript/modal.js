
console.log("javaScript")
class Modal {
    #modal
    #botao
    #corpo

    constructor(modal,botao,corpo)
    {

        this.#modal = modal
        this.#botao = botao
        this.#corpo = corpo

    }
// toda vez que o botao for cliclado o modal aparece
    escutarBotao() 
    {
        this.#botao.addEventListener('click', () => {
            this.#modal.style.display = 'block'
            this.#corpo.style.display = "block"
        })
    }
// toda vez que o modal for cliclado o modal some
    escutarModal()
    { 
        this.#modal.addEventListener("click",()=>{ 
            this.#modal.style.display = 'none'
            this.#corpo.style.display = "none"
        })
    }
}
const modalAdicionar = new Modal(document.querySelector("#modalInvisilvelAdcionar"),document.querySelector("#ModalAdcionar"),document.querySelector("#modalCorpoAdicinar")) 

const modalEditar = new Modal(document.querySelector("#modalInvisilvelEditar"),document.querySelector("#ModalEditar"),document.querySelector("#modalCorpoEditar"))

const modalExcluir = new Modal (document.querySelector("#modalInvisilvelExcluir"),document.querySelector("#ModalExcluir"),document.querySelector("#modalCorpoExcluir"))


modalAdicionar.escutarBotao()
modalAdicionar.escutarModal()

modalEditar.escutarBotao()
modalEditar.escutarModal()

modalExcluir.escutarBotao()
modalExcluir.escutarModal()

