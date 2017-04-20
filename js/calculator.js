const costOfLiving = require('./../costOfLiving.json');
const getCurrencyAbbreviation = require('./../node_modules/country-currency-map').getCurrencyAbbreviation;

let costConvert
let netPerMonthAtHome
let neededPerMonthForTrip
let saveTimeForTrip
let spendingMoneyPerMonthOnTrip
let totalAmountNeededForTrip
let exchangeRateArray = []
let destAbbv;
let homeAbbv;

function exchangeRatePlease(countryName1, countryName2) {
  debugger;
  homeAbbv = getCurrencyAbbreviation(countryName1);
  destAbbv = getCurrencyAbbreviation(countryName2);
  $.get('http://api.fixer.io/latest?base='+homeAbbv+'&symbols='+homeAbbv+','+destAbbv).then(function(response2) {
    exchangeRateArray.push(parseFloat(Object.values(response2.rates)[0]))
    console.log(parseFloat(Object.values(response2.rates)[0]))
  }).fail(function(error) {
    console.log("exchangeRatePlease failed")
  })
  return exchangeRateArray[0]
  console.log(exchangeRateArray[0])
}


function calculate(income, expenses, timeLength, homeCountry, destCountry, exchangeRate) {

  costConvert = (costOfLiving[destCountry])/(costOfLiving[homeCountry])
  netPerMonthAtHome = (income/12)-expenses

  neededPerMonthForTrip = ((expenses / exchangeRate) / costConvert)
  saveTimeForTrip = (neededPerMonthForTrip/exchangeRate)/netPerMonthAtHome

  spendingMoneyPerMonthOnTrip = (expenses / exchangeRate) / costConvert
  totalAmountNeededForTrip = neededPerMonthForTrip * timeLength

  // console.log(exchangeRate, costConvert, netPerMonthAtHome, neededPerMonthForTrip, saveTimeForTrip, spendingMoneyPerMonthOnTrip, totalAmountNeededForTrip)
}

exports.calculate = calculate;
exports.exchangeRatePlease = exchangeRatePlease;
