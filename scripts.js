// Seleciona os elementos do formulário.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")


//Captura o evento do input para formatar o valor.
amount.oninput = () => {
//Obtem o valora atual do input e remove todos os caracteres que não sejam numericos.
    let value = amount.value.replace(/\D/g, "")

//Transforma o valor em centavos.
value = Number(value) / 100 // Converte o numero para centavos Exemplo: 1000 -> 10.00


//Atualiza o valor do input.
    amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value) {
//Formata o valor para o formato de moeda brasileiro.
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })

  //Retorna o valor formatado.
  //Exemplo: 10.00 -> R$ 10,00  
    return value

}

//Captura o evento de submit do formulário para obter os dados do formulário.
form.onsubmit = (event) => {

    //Previne o comportamento padrão do formulário, que é recarregar a página.
    event.preventDefault()


    //Cria um objeto com os detalhes da nova despesa.
const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
 }
 
 //Chama a funcao que ira adicionar o item a lista de despesas.
 expenseAdd(newExpense)
}

function expenseAdd(newExpense) {
    try {
// Crie o elemento de li para adicionar o item (li) na lista (ul).
    const expenseItem = document.createElement("li")
    expenseItem.classList.add("expense")

    
    } catch (error) {
        alert("Nao foi possivel adicionar a despesa.")
        console.log(error)
    }
}