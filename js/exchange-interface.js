function getExchange(homeCountry, homeAbb, destCountry, destAbb, exchangeRate) {
  $.get('http://api.fixer.io/latest?base='+homeAbb+'&symbols='+homeAbb+','+destAbb).then(function(response) {
    $('#infoBox').text('There are '+exchangeRate+' '+destCountry+' to every '+homeCountry);
  }).fail(function(error) {
    $('#infoBox').text('There was an error');
  });

}


exports.getExchange = getExchange;
