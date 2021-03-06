const cryptoCurrencies = ["BTC", "LTC", "ETH"];
const currencySymbols = {
  USD: "$",
  GBP: "£",
  RUB: "₽",
  EUR: "€"
};

var optionValue = "USD";

var dataJSON;

function getValue(selectOption) {
  optionValue = selectOption.value;
  update(optionValue);
}

function updateChange(commodity) {
  var status = document.getElementById(commodity).querySelector("input")
    .checked;

  var elementList = Array.from(
    document
      .getElementById(commodity)
      .querySelectorAll("td[data-set]:not([data-set='last'])")
  ).map(item => item.getAttribute("data-set"));

  // if (status) {
  //   elementList.forEach(function(datasetValue) {
  //     let change = dataJSON.changes.percent[datasetValue];

  //     if (!isNegative(change)) {
  //       var changeDecor = "+" + priceChange(change) + "%";
  //     } else {
  //       var changeDecor = priceChange(change) + "%";
  //     }

  //     document
  //       .getElementById(commodity)
  //       .querySelector(
  //         "[data-set='" + datasetValue + "']"
  //       ).textContent = changeDecor;

  //     if (isNegative(change)) {
  //       document
  //         .getElementById(commodity)
  //         .querySelector("[data-set='" + datasetValue + "']")
  //         .classList.add("field__value--negative");
  //     }
  //   });
  // } else {
  // elementList.forEach(function(datasetValue) {
  //   let change = dataJSON.changes.price[datasetValue];
  //   if (!isNegative(change)) {
  //     var changeDecor =
  //       "+" + priceChange(change) + currencySymbols[selectedCurrencyValue];
  //   } else {
  //     var changeDecor =
  //       priceChange(change) + currencySymbols[selectedCurrencyValue];
  //   }
  //   document
  //     .getElementById(commodity)
  //     .querySelector(
  //       "[data-set='" + datasetValue + "']"
  //     ).textContent = changeDecor;
  //   if (isNegative(change)) {
  //     document
  //       .getElementById(commodity)
  //       .querySelector("[data-set='" + datasetValue + "']")
  //       .classList.add("field__value--negative");
  //   }
  // });
  // }

  console.log(status);
}

function numberWithSpaces(x) {
  let parts = (Math.round(x * 100) / 100)
    .toFixed(2)
    .toString()
    .split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return parts.join(".");
}

function priceChange(x) {
  let parts = Math.round(x)
    .toString()
    .split(".");
  return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function isNegative(change) {
  if (Number(change) < 0) {
    return true;
  } else {
    false;
  }
}

function update() {
  // var selectedCurrencyValue = document
  //   .querySelector("option[value][selected='selected']")
  //   .getAttribute("value");

  var selectedCurrencyValue = optionValue;

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
        dataJSON = data;
        var elementList = Array.from(
          document
            .getElementById(cryptoCurrency)
            .querySelectorAll("td[data-set]")
        ).map(item => item.getAttribute("data-set"));

        elementList.forEach(function(datasetValue) {
          if (datasetValue === "last") {
            let price = data[datasetValue];
            let priceSpaced =
              currencySymbols[selectedCurrencyValue] + numberWithSpaces(price);

            document
              .getElementById(cryptoCurrency)
              .querySelector("[data-set='last']").textContent = priceSpaced;
          } else {
            let change = data.changes.price[datasetValue];

            if (!isNegative(change)) {
              var changeDecor =
                "+" +
                priceChange(change) +
                currencySymbols[selectedCurrencyValue];
            } else {
              var changeDecor =
                priceChange(change) + currencySymbols[selectedCurrencyValue];
            }

            document
              .getElementById(cryptoCurrency)
              .querySelector(
                "[data-set='" + datasetValue + "']"
              ).textContent = changeDecor;

            if (isNegative(change)) {
              document
                .getElementById(cryptoCurrency)
                .querySelector("[data-set='" + datasetValue + "']")
                .classList.add("field__value--negative");
            }
          }
        });
      })
      .catch(err => {
        // console.log("error while fetch JSON");
      });
  });
}
update();
