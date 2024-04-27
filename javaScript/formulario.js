console.log("formulario")
class Formulario  { 
    
    #botao
    #nome
    #quantidade
    #preço
    #tela

    constructor(botao,nome,quantidade,preço,tela){

        this.#botao = document.querySelector(botao)
        this.#nome = document.querySelector(nome)
        this.#quantidade = document.querySelector(quantidade)
        this.#preço = document.querySelector(preço)
        this.#tela = tela

    }

    escutarBotao(função){
        this.#botao.addEventListener('click',(e)=>{
            e.preventDefault()
            console.log("escutarBOtao")

            if(this.#quantidade != undefined && this.#preço != undefined)
            {

            const nome = this.#nome.value
            const quantidade = parseInt( this.#quantidade.value)
            const preço =  parseFloat(this.#preço.value).toFixed(2)

            this.#nome.value = ""
            this.#quantidade.value = ""
            this.#preço.value = ""
            função(nome,quantidade,preço)
            }
            else
            {

            const nome = this.#nome.value
            this.#nome.value = ""
            função(nome)
            }


        })
    }  
}

class Lista {
    #lista = JSON.parse(localStorage.getItem("lista")) || []
    #tela
   
    constructor(tela)
    {   
        this.#tela = tela 
        console.log(this.#lista)
    }



    // crud

    // autualisar
    #atualisar()
    {
        localStorage.setItem("lista",JSON.stringify(this.#lista))
        this.ler()
        console.log("atualisar")

    }

    // criar
    criar(nome,quantidade,preço)
    {
        console.log("criar")
      
        this.#lista.push({
            nome,quantidade,preço,valorTotal: parseFloat(quantidade*preço).toFixed(2)
        })
        this.#atualisar()
        

    }
    //  ler 
    ler(){
        const tela = document.querySelector(this.#tela) 
        tela.innerHTML = ""
        this.#lista.forEach(item => {
            tela.innerHTML = tela.innerHTML + ` 
            <li> 
            <h3> ${item.nome}</h3>
            <p>${item.quantidade}</p>
                <p> ${item.preço}</p>
                <p> ${item.valorTotal}</p>    
            </li>`
        });
        
       
        
        

    }

    // editar)

    // remover
    remover(nome){
       const newLista =  this.#lista.filter((item) => item.nome !== nome)
       this.#lista = newLista
       this.#atualisar()
    }



}
const listaDeCompras = new Lista("#tela")

const adicionar  = new Formulario("#adicionar","#nomeAdicionar","#quantidadeAdiconar","#valorAdicionar")
const excluir = new Formulario("#excluir","#nomeExcluir")


listaDeCompras.ler()

excluir.escutarBotao( nome =>{
    listaDeCompras.remover(nome)
})
adicionar.escutarBotao((nome,quantidade,preço)=>{ 
    listaDeCompras.criar(nome,quantidade,preço)
})