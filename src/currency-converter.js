
let calculatedAmount = document.getElementById('calculated-amount')

function getFormData() {
  var amount, from, to;
  amount = document.getElementById('amount')
  if (amount) amount = amount.value
  
  from = document.getElementById('from')
  if (from) from = from.value
  
  to = document.getElementById('to')
  if (to) to = to.value
  return {amount, from, to}
}

function getCurrencyExchangeRates(event) {
  event.preventDefault();
  const fD = getFormData();
  const xhr = new XMLHttpRequest();
  const apiKey = 'latest?access_key=789b6637e9d33c71debd4b01b758a5e1'
  const queryParams = `&base=${fD.from}&symbols=EUR,JPY,GBP`
  const server = `http://data.fixer.io/api/${apiKey + queryParams}`

  xhr.open('GET', server, true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
  xhr.onreadystatechange = function() {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200)
      var response = JSON.parse(this.response);
      if (response && response.success) 
        showConversion(response);
      else if (response && response.error && response.error.type)
        alert(response.error.type)
  }
  xhr.send()
}

function showConversion(response) {
  const fD = getFormData();
  let calculatedConversion = 0;
  if (fD.from == fD.to) calculatedConversion = fD.amount
  else calculatedConversion = parseInt(fD.amount).toFixed(2) * response.rates[fD.to].toFixed(2);
  calculatedAmount.innerHTML = `${fD.amount} ${fD.from} is ${calculatedConversion} ${fD.to}`
}


