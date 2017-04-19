const getExchange = require('./../js/exchange.js').exchangeModule;
const getCurrencyAbbreviation = require('./../node_modules/country-currency-map').getCurrencyAbbreviation;
const calculate = require('./../js/calculator.js').calculate;
const exchangeRatePlease = require('./../js/calculator.js').exchangeRatePlease;


let countryName1;
let countryAbbreviation1;
let countryName2;
let countryAbbreviation2;
let income;
let expenses;
let timeLength;
let exchangeRate;


$(function() {
  $('#submitButton').click(function(event) {
    event.preventDefault();
    countryName1 = $('#country1Input').val();
    countryAbbreviation1 = getCurrencyAbbreviation(countryName1);
    countryName2 = $('#country2Input').val();
    countryAbbreviation2 = getCurrencyAbbreviation(countryName2);
    getExchange(countryName1, countryAbbreviation1, countryName2, countryAbbreviation2);
  })

  $('#submitButton2').click(function(event) {
    event.preventDefault();
    countryName1 = $('#country1Input').val();
    countryName2 = $('#country2Input').val();
    income = parseInt($('#income').val());
    expenses = parseInt($('#expenses').val());
    timeLength = parseInt($('#timeLength').val())
    exchangeRate = parseFloat(exchangeRatePlease());
    calculate(income, expenses, timeLength, countryName1, countryName2, exchangeRate)
  })
});
