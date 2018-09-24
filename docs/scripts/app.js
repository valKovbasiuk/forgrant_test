const cryptoCurrencies = ["BTC", "LTC", "ETH"];

var selectedCurrencyValue = document
  .querySelector("option[value][selected='selected']")
  .getAttribute("value");

cryptoCurrencies.forEach(function(cryptoCurrency) {
  var request =
    "https://apiv2.bitcoinaverage.com/indices/global/ticker/" +
    cryptoCurrency +
    selectedCurrencyValue;

  fetch(request)
    .then(response => {
      return response.json();
    })
    .then(data => {
      var elementList = Array.from(
        document.getElementById(cryptoCurrency).querySelectorAll("td[data-set]")
      ).map(item => item.getAttribute("data-set"));

      elementList.forEach(function(datasetValue) {
        if (datasetValue === "last") {
          document
            .getElementById(cryptoCurrency)
            .querySelector("[data-set='last']").textContent =
            data[datasetValue];
        } else {
          document
            .getElementById(cryptoCurrency)
            .querySelector("[data-set='" + datasetValue + "']").textContent =
            data.changes.price[datasetValue];
        }
      });
    })
    .catch(err => {
      console.log("error while fetch JSON");
    });
});
