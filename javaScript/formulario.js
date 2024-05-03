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
    #lista = JSON.parse(sessionStorage.getItem("lista")) || []
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
        sessionStorage.setItem("lista",JSON.stringify(this.#lista))
        this.ler()
        console.log("atualisar")
        this.valorTotal()

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
    ler()
    {
        this.valorTotal()
        const tela = document.querySelector(this.#tela) 
        tela.innerHTML = ""
        this.#lista.forEach(item => {
            tela.innerHTML = tela.innerHTML + ` 
            <li class="listaItem"> 
            <h2 class="listaItemProdutoTitulo"> Produto: ${item.nome}</h2>
            <p class="listaItemProduto" >Quantidade: ${item.quantidade}</p>
                <p class="listaItemProduto"> Preço: ${item.preço}  R$ </p>
                <p class="listaItemProduto"> Valor Total ${item.valorTotal} R$</p>   
            </li>`
        });
        
       
        
        

    }
    //valor Total 
    valorTotal()
    {
        const totalHtml = document.querySelector("#total")
        let total = 0
        this.#lista.forEach(i => { 
            total = total + parseFloat(i.valorTotal)
        })
        totalHtml.innerHTML = `Total: ${total.toFixed(2)} R$`
    }
    // editar
    editar(nome,quantidade,preço)
    { 
        const newArray = []

        this.#lista.forEach( produto => {
            if(produto.nome == nome)
            {   console.log("if")
                console.log(produto)
                
                produto.quantidade = quantidade
                produto.preço = preço
                produto.valorTotal = parseFloat(produto.quantidade*produto.preço).toFixed(2)
                newArray.push(produto)
            }
            else{
                console.log(produto)
                newArray.push(produto)
            }
            console.log(newArray)
            this.#lista = newArray
            this.#atualisar()
            
        })
      
    }

    // remover
    remover(nome)
    {
       const newLista =  this.#lista.filter((item) => item.nome !== nome)
       this.#lista = newLista
       this.#atualisar()
    }



}
const listaDeCompras = new Lista("#tela")

const adicionar  = new Formulario("#adicionar","#nomeAdicionar","#quantidadeAdiconar","#valorAdicionar")
const aditar = new Formulario("#Editar", "#nomeEditar","#quantidadeEditar","#valorEditar")
const excluir = new Formulario("#excluir","#nomeExcluir")


listaDeCompras.ler()


excluir.escutarBotao( nome =>{
    listaDeCompras.remover(nome)
})
adicionar.escutarBotao((nome,quantidade,preço)=>{ 
    listaDeCompras.criar(nome,quantidade,preço)
})
aditar.escutarBotao((nome,quantidade,preço)=>{
    console.log(nome,quantidade,preço)
    listaDeCompras.editar(nome,quantidade,preço)
})
