const exchangeRatePlease = require('./../js/calculator.js').exchangeRatePlease;
const getCurrencyAbbreviation = require('./../node_modules/country-currency-map').getCurrencyAbbreviation;

let homeAbb;
let destAbb;
let exchangeRate;


function getExchange(homeCountry, homeAbb, destCountry, destAbb) {
  exchangeRate = exchangeRatePlease();
  $.get('http://api.fixer.io/latest?base='+homeAbb+'&symbols='+homeAbb+','+destAbb).then(function(response) {
    $('#infoBox').text('There are '+exchangeRate+' '+destCountry+' to every '+homeCountry);
  }).fail(function(error) {
    $('#infoBox').text('There was an error');
  });

}


exports.exchangeModule = getExchange;
