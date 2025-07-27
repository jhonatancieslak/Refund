// Seleciona os elementos do formulário.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// Seleciona os elementos da lista e totais.
const expenseList = document.querySelector("ul")
const expensesTotal = document.querySelector("aside header h2") 
const expensesQuantity = document.querySelector("aside header p span")

// Captura o evento do input para formatar o valor.
amount.oninput = () => {
  let value = amount.value.replace(/\D/g, "")
  value = Number(value) / 100
  amount.value = formatCurrencyBRL(value)
}

// Função para formatar valor em moeda BRL.
function formatCurrencyBRL(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  })
}

// Captura o evento de submit do formulário.
form.onsubmit = (event) => {
  event.preventDefault()

  if (!expense.value || !amount.value || !category.value) {
    return alert("Preencha todos os campos.")
  }

  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  }

  expenseAdd(newExpense)

  // Limpa o formulário
  form.reset()
  amount.value = ""
}

// Adiciona item de despesa na lista.
function expenseAdd(newExpense) {
  try {
    const expenseItem = document.createElement("li")
    expenseItem.classList.add("expense")

    const expenseIcon = document.createElement("img")
    expenseIcon.setAttribute("src", `./img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute("alt", newExpense.category_name)

    const expenseInfo = document.createElement("div")
    expenseInfo.classList.add("expense-info")

    const expenseName = document.createElement("strong")
    expenseName.textContent = newExpense.expense

    const expenseCategory = document.createElement("span")
    expenseCategory.textContent = newExpense.category_name

    expenseInfo.append(expenseName, expenseCategory)

    const expenseAmount = document.createElement("span")
    expenseAmount.classList.add("expense-amount")
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$","").trim()}`

    const removeIcon = document.createElement("img")
    removeIcon.classList.add("remove-icon")
    removeIcon.setAttribute("src", "./img/remove.svg")
    removeIcon.setAttribute("alt", "remover")

    // Evento para remover a despesa
    removeIcon.onclick = () => {
      expenseItem.remove()
      updateTotals()
    }

    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)
    expenseList.append(expenseItem)

    updateTotals()

  } catch (error) {
    alert("Não foi possível adicionar a despesa.")
    console.log(error)
  }
}

// Atualiza os totais
function updateTotals() {
  try {
    const items = expenseList.children
    expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`

    let total = 0

    for (let i = 0; i < items.length; i++) {
      const itemAmount = items[i].querySelector(".expense-amount").textContent

      // Limpa o valor e converte
      let value = itemAmount.replace(/[^\d,]/g, "").replace(",", ".")
      value = parseFloat(value)

      if (isNaN(value)) {
        alert("Valor inválido encontrado.")
        continue
      }

      total += value
    }

    expensesTotal.textContent = formatCurrencyBRL(total)
    console.log("Total:", formatCurrencyBRL(total))

  } catch (error) {
    console.error(error)
    alert("Não foi possível atualizar os totais.")
  }
}
