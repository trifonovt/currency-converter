
// var CurrencyConverter = (function(){
//   var 
var currencies = {
  'EUR': {'SFR': 1.3135, 'USD': 1.2897, 'BPD': 0.8631},
  'USD': {'JPY': 109.6200},
  'SFR': {'USD': 0.9960},
  'BPD': {'CAD': 1.7574}
};

var calculateButton = document.querySelector('.calculate-currency');
var baseCurrencyInput = document.getElementById('currency-from');
var secondCurrencyInput = document.getElementById('currency-to');
var amountInput = document.getElementById('currency-amount');
var toShowAmount = document.querySelector('.given-amount');
var toShowBase = document.querySelector('.base-currency');
var toShowSecond = document.querySelector('.second-currency');
var toShowResult = document.querySelector('.calculated-currency');

function convertCurrency(event) {
  event.preventDefault();
  var amount = amountInput.value;
  var from = baseCurrencyInput.value;
  var to = secondCurrencyInput.value;
  var result = 0;
  
  try{
    if (from == to){
      result = amount;
    } else {
     result = amount * currencies[from][to];
  }
  }
  catch(err) {
    result = amount * (1 / currencies[to][from]);
  }
  
  toShowAmount.innerHTML = amount;
  toShowBase.textContent = from + ' = ';
  toShowSecond.textContent = to;
  toShowResult.textContent = result; 
}

calculateButton.addEventListener('click', convertCurrency);

// })();