const costOfLiving = require('./../costOfLiving.json');
const getCurrencyAbbreviation = require('./../node_modules/country-currency-map').getCurrencyAbbreviation;

let costConvert
let netPerMonthAtHome
let neededPerMonthForTrip
let saveTimeForTrip
let spendingMoneyPerMonthOnTrip
let totalAmountNeededForTrip
let exchangeRate
let homeAbb
let destAbb
let exchangeRateArray = []

function exchangeRatePlease() {
  $.get('http://api.fixer.io/latest?base='+homeAbb+'&symbols='+homeAbb+','+destAbb).then(function(response2) {
    exchangeRateArray.push(parseFloat(Object.values(response2.rates)[0]))
  }).fail(function(error) {
    console.log("exchangeRatePlease failed")
  });
  return exchangeRateArray[0]

}


function calculate(income, expenses, timeLength, homeCountry, destCountry, exchangeRate) {
  homeAbb = getCurrencyAbbreviation(homeCountry)
  destAbb = getCurrencyAbbreviation(destCountry)

  costConvert = (costOfLiving[destCountry])/(costOfLiving[homeCountry])
  netPerMonthAtHome = (income/12)-expenses

  neededPerMonthForTrip = ((expenses / exchangeRate) / costConvert)
  saveTimeForTrip = (neededPerMonthForTrip/exchangeRate)/netPerMonthAtHome

  spendingMoneyPerMonthOnTrip = (expenses / exchangeRate) / costConvert
  totalAmountNeededForTrip = neededPerMonthForTrip * timeLength

  console.log(exchangeRate, costConvert, netPerMonthAtHome, neededPerMonthForTrip, saveTimeForTrip, spendingMoneyPerMonthOnTrip, totalAmountNeededForTrip)
}

exports.calculate = calculate;
exports.exchangeRatePlease = exchangeRatePlease;
