//  Predefined config object with currencies
const hardcodedCurrencies = {
    EUR: {
        CHF: 1.3135,
        USD: 1.2897,
        GBP: 0.8631
    },
    USD: {
        JPY: 109.6200,
        CHF: 1.3135,
        GBP: 0.8631,
        EUR: 0.983
    },
    CHF: {
        USD: 0.9960,
        GBP: 0.8631,
        EUR: 0.983,
        JPY: 109.6200
    },
    GBP: {
        CAD: 1.7574,
        USD: 0.9960,
        EUR: 0.983,
        JPY: 109.6200,
        CHF: 1.3135
    }
}

var CurrencyCoverter = (function(hasCurrencies) {
    var currencies = {};
    let calculatedAmount = document.getElementById('calculated-amount')
    let submitButton = document.getElementById('submit')

    if (!hasCurrencies) {
        currencies = hardcodedCurrencies;
    } else {
        currencies = hasCurrencies;
    }

    function validateInput() {
        let input = document.getElementById('amount')
        if (!input.value) {
            input.style.border = '2px solid red'
            return false
        } else {
            input.style.border = '1px solid #ced4da'
            return true
        }
    }

    function getFormData() {
        if (validateInput() === true) {
            var amount, from, to;
            amount = document.getElementById('amount')
            if (amount) amount = parseInt(amount.value)

            from = document.getElementById('from')
            if (from) from = from.value

            to = document.getElementById('to')
            if (to) to = to.value
            return {
                amount,
                from,
                to
            }
        } else {
            return false;
        }
    }

    function getCurrencyExchangeRates(event) {
        event.preventDefault();
        if (getFormData() != false) {
            const fD = getFormData();
            const xhr = new XMLHttpRequest();
            const apiKey = 'latest?access_key=789b6637e9d33c71debd4b01b758a5e1'
            const queryParams = `&base=${fD.from}&symbols=EUR,JPY,GBP,CHF,USD`
            const server = `http://data.fixer.io/api/${apiKey + queryParams}`
            if (fD.from != 'EUR') {
                showConversion(false)
            } else {
                xhr.open('GET', server, true);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
                xhr.onreadystatechange = function() {
                    if (this.readyState === XMLHttpRequest.DONE && this.status === 200)
                        var response = JSON.parse(this.response);
                    if (response && response.success)
                        showConversion(response)
                    else if (response && response.error && response.error.type)
                        console.log(response.error.type)
                }
                xhr.send()
            }
        }
    }

    function showConversion(response) {
        const fD = getFormData();
        let calculatedConversion = 0;
        if (fD.from == fD.to) calculatedConversion = fD.amount
        else
        // Because the currency API is not working for more than EUR currency 
        // predefined config object is used to obtain all the cases 
        if (response === false)
            calculatedConversion = fD.amount * currencies[fD.from][fD.to];
        else
            calculatedConversion = fD.amount * response.rates[fD.to];
        calculatedAmount.innerHTML = `${fD.amount.toFixed(2)} ${fD.from} is ${calculatedConversion.toFixed(2)} ${fD.to}`
    }

    submitButton.addEventListener('click', getCurrencyExchangeRates);
})();



module.exports.CurrencyCoverter;