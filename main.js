var CurrencyConverter = require('./currency-converter')

var myCurrencyConverter = new CurrencyConverter()

var btn = document.querySelector('.btn-primary')
btn.addEventListener('click', myCurrencyConverter.getCurrencyExchangeRates)