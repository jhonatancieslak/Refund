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

form.onsubmit = (event) => {
    event.preventDefault()
}