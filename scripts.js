// Seleciona os elementos do formulário.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// Seleciona os elementos da lista.
const expenseList = document.querySelector("ul")

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

//Cria o icone da categoria.
const expenseIcon = document.createElement("img")
expenseIcon.setAttribute("src", `./img/${newExpense.category_id}.svg`)
expenseIcon.setAttribute("alt", newExpense.category_name)

//Cria a info da despesa.
const expenseInfo = document.createElement("div")
expenseInfo.classList.add("expense-info")

//Cria o nome da despesa.
const expenseName = document.createElement("strong")
expenseName.textContent = newExpense.expense

//Cria a categoria da despesa.
const expenseCategory = document.createElement("span")
expenseCategory.textContent = newExpense.category_name

//Adiciona nome e categoria da despesa ao info.
expenseInfo.append(expenseName, expenseCategory)

//Cria o valor da despesa.
const expenseAmount = document.createElement("span")
expenseAmount.classList.add("expense-amount")
expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$","")}`

//Cria o icone de remover a despesa.
const removeIcon = document.createElement("img")
removeIcon.classList.add("remove-icon")
removeIcon.setAttribute("src", "./img/remove.svg")
removeIcon.setAttribute("alt", "remover")

// Adiciona as informações da despesa ao item.
expenseItem.append(expenseIcon, expenseInfo, expenseAmount,removeIcon)

//Adiciona o item na lista de despesas.
expenseList.append(expenseItem)

    } catch (error) {
        alert("Nao foi possivel adicionar a despesa.")
        console.log(error)
    }
}