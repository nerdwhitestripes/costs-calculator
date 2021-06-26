// List of countries to iterate over. 
const countryList = ["eng", "scot", "ni"];

function jurisdiction() {
  //  obtain name of country selected 
  var country = this.value
  // iterate over countryList and display elements if it matches 
  for (i = 0; i < countryList.length; i++) {
    if (countryList[i] == country) {
      var countryShow = Array.from(document.getElementsByClassName(`${country}`));
      countryShow.forEach(element => (element.style.display = "block"));
    }
    else {
      var countryHide = Array.from(document.getElementsByClassName(`${countryList[i]}`));
      countryHide.forEach(element => (element.style.display = "none"));
    }
  } 
}

//Function selector based on jurisdiction 
function calculate() {
  // capture values of all relevant variables. 
  var damages = document.querySelector('#damages').value;
  var jurisdiction = document.querySelector('#jurisdiction option:checked').value;
  damages = window[jurisdiction](damages);
}

// ENGLAND & WALES FUNCTION CALCULATOR 
function eng(damages) {
  var stage = document.querySelector('#settlement-ew option:checked').value;
  // Alert if small claims or multitrack risk 
  if (damages <= 999) {
    document.querySelector("#alert").innerHTML = "Small Claims Costs Apply";
    document.querySelector("#net").innerHTML = "";
    document.querySelector("#vat").innerHTML = "";
    document.querySelector("#gross").innerHTML = "";
    return;
  } else if (damages > 25000) {
    document.querySelector("#alert").innerHTML = "Costs may fall out of Fixed Costs Regime";
  } else {
    document.querySelector("#alert").innerHTML = "";
  }
  // pass damages through selected stage and return value for costs 
  if (stage == "p2") {
    value = p2(damages);
  }
  if (stage == "p3d") {
    value = p3d(damages);
  }
  if (stage == "p3c") {
    value = p3c(damages);
  }
  if (stage == "p3o") {
    value = p3o(damages);
  }
  if (stage == "inf") {
    value = inf(damages);
  }
  if (stage == "opi") {
    value = opi(damages);
  }
  if (stage == "lpa") {
    value = lpa(damages);
  }
  if (stage == "lpl") {
    value = lpl(damages);
  }
  if (stage == "lpt") {
    value = lpt(damages);
  }
  if (stage == "lt") {
    value = lt(damages);
  }
  //Apply London Weighting option 
  let lon = document.querySelector('#london-weighting option:checked').value;
  if (lon == "yes") {
    value = value + ((value / 100) * 12.5);
  }
  value = total(value);
}


// E&W FUNCTIONS 
// function for protocol stage 2
function p2(damages) {
  var value;
  if (damages >= 1000 && damages <= 10000) {
    value = 900;
  }
  else if (damages > 10000) {
    value = 1600;
  }
  return value;
}
// stage 3 defendant wins 
function p3d(damages) {
  var value;
  if (damages >= 1000 && damages <= 10000) {
    value = 900;
  }
  else if (damages > 10000) {
    value = 1600;
  }
  return value;
}
// stage 3 claimant wins (paper)
function p3c(damages) {
  var value;
  if (damages >= 1000 && damages <= 10000) {
    value = 1150;
  }
  else if (damages > 10000) {
    value = 1850;
  }
  return value;
}
// stage 3 claimant wins (oral)
function p3o(damages) {
  var value;
  if (damages >= 1000 && damages <= 10000) {
    value = 1400;
  }
  else if (damages > 10000) {
    value = 2100;
  }
  return value;
}
// stage 3 Infant Approval Hearing
function inf(damages) {
  var value;
  if (damages >= 1000 && damages <= 10000) {
    value = 1550;
  }
  else if (damages > 10000) {
    value = 2250;
  }
  return value;
}
// Outside Protocol Pre-Issue & begin handling el/pl option differences
function opi(damages) {
  var elpl = document.querySelector('#elpl option:checked').value;
  var value;
  if (damages >= 1000 && damages <= 5000) {
    value = 950 + ((damages / 100) * 17.5);
  } else if (damages > 5000 && damages <= 10000) {
    if (elpl == "el") {
      damages = (damages - 5000);
      value = 1855 + ((damages / 100) * 12.5);
    } else if (elpl == "pl") {
      damages = (damages - 5000);
      value = 1855 + ((damages / 100) * 10);
    }
  } else if (damages > 10000 && damages <= 25000) {
    if (elpl == "el") {
      damages = (damages - 10000);
      value = 2500 + ((damages / 100) * 10);
    } else if (elpl == "pl") {
      damages = (damages - 10000);
      value = 2370 + ((damages / 100) * 10);
    }
  }
  return value;
}
// Litigated, Pre-Allocation 
function lpa(damages) {
  var elpl = document.querySelector('#elpl option:checked').value;
  var value;
  if (elpl == "el") {
    value = 2630 + ((damages / 100) * 20);
  } else if (elpl == "pl") {
    value = 2450 + ((damages / 100) * 17.5);
  }
  return value;
}
// Litigated, Pre-Listing
function lpl(damages) {
  var elpl = document.querySelector('#elpl option:checked').value;
  var value;
  if (elpl == "el") {
    value = 3350 + ((damages / 100) * 25);
  } else if (elpl == "pl") {
    value = 3065 + ((damages / 100) * 22.5);
  }
  return value;
}
// Litigated, pre-trial 
function lpt(damages) {
  var elpl = document.querySelector('#elpl option:checked').value;
  var value;
  if (elpl == "el") {
    value = 4280 + ((damages / 100) * 30);

  } else if (elpl == "pl") {
    value = 3790 + ((damages / 100) * 27.5);
  }
  return value;
}
// Trial 
function lt(damages) {
  var elpl = document.querySelector('#elpl option:checked').value;
  var value;
  var advocate;
  if (damages <= 3000) {
    advocate = 500;
  } else if (damages > 3000 && damages <= 10000) {
    advocate = 710;
  } else if (damages > 10000 && damages <= 15000) {
    advocate = 1070;
  } else if (damages > 15000) {
    advocate = 1705;
  }
  if (elpl == "el") {
    value = 4280 + ((damages / 100) * 30) + advocate;
  } else if (elpl == "pl") {
    value = 3790 + ((damages / 100) * 27.5) + advocate;
  }
  return value;
}

// FUNCTION FOR SCOTTISH COMPULSORY ACTION PROTOCOL CALCULATOR
function scot(damages) {
  value = 546;
  // warning message if over 25k  
  if (damages > 25000) {
    document.querySelector("#alert").innerHTML = "Costs May Fall Out Of Compulsory Pre-Action Protocol";
  } else {
    document.querySelector("#alert").innerHTML = "";
  }
  if (damages > 25000) {
    value = value + 875;
  } else {
    value = value + ((damages / 100) * 3.5);
  }
  // calculation for under 3k 
  if (damages <= 3000) {
    value = value + ((damages / 100) * 25);
    return total(value);
  } else {
    value = value + 750;
  }
  // calculation for 3-6k
  if (damages <= 6000) {
    value = value + (((damages - 3000) / 100) * 15);
    return total(value);
  } else {
    value = value + 450;
  }
  // calculation for 6-12k 
  if (damages <= 12000) {
    value = value + (((damages - 6000) / 100) * 7.5);
    return total(value);
  } else {
    value = value + 450;
  }
  // calculation for 12-18k
  if (damages <= 18000) {
    value = value + (((damages - 12000) / 100) * 5);
    return total(value);
  } else {
    value = value + 300;
  }
  // calculation for damages over 18k
  if (damages > 18000) {
    value = value + (((damages - 18000) / 100) * 2.5);
    return total(value);
  }
}

// FUNCTION FOR NI SCALE COSTS 
function ni(damages) {
  var stage = document.querySelector('#ni option:checked').value;
  var date = document.querySelector('#date-ni option:checked').value;
  // Damages does not exceed £500
  if (damages <= 500) {
    if (date == "17") {
      value = 250;
    } else if (date == "18") {
      value = 254;
    }
  }
  // Damages between £500 - £1000
  else if (damages > 500 && damages <= 1000) {
    if (date == "17") {
      value = 546;
    } else if (date == "18") {
      value = 554;
    }
  }
  // Damages between 1000 - 2500
  else if (damages > 1000 && damages <= 2500) {
    if (date == "17") {
      value = 1153;
    } else if (date == "18") {
      value = 1170;
    }
  }
  // Damages between 2500 - 5000
  else if (damages > 2500 && damages <= 5000) {
    if (date == "17") {
      value = 1638;
    } else if (date == "18") {
      value = 1662;
    }
  }
  // Damages between 5k - 7.5k
  else if (damages > 5000 && damages <= 7500) {
    if (date == "17") {
      value = 2123;
    } else if (date == "18") {
      value = 2155;
    }
  }
  // Damages between 7.5 - 10k
  else if (damages > 7500 && damages <= 10000) {
    if (date == "17") {
      value = 2427;
    } else if (date == "18") {
      value = 2463;
    }
  }
  // Damages between 10k - 12.5k
  else if (damages > 10000 && damages <= 12500) {
    if (date == "17") {
      value = 2669;
    } else if (date == "18") {
      value = 2709;
    }
  }
  // Damages between 12.5 - 15k
  else if (damages > 12500 && damages <= 15000) {
    if (date == "17") {
      value = 2912;
    } else if (date == "18") {
      value = 2955;
    }
  }
  // Damages between 15k - 20k
  else if (damages > 15000 && damages <= 20000) {
    if (date == "17") {
      value = 3934;
    } else if (date == "18") {
      value = 3992;
    }
  }
  // Damages between 20k - 25k
  else if (damages > 20000 && damages <= 25000) {
    if (date == "17") {
      value = 4317;
    } else if (date == "18") {
      value = 4381;
    }
  }
  // Damages between 25k - 30k
  else if (damages > 25000) {
    if (date == "17") {
      value = 4762;
    } else if (date == "18") {
      value = 4833;
    }
  }
  // Alert if over 30k
  if (damages > 30000) {
    document.querySelector("#alert").innerHTML = "Costs May Fall Out Of County Court Costs";
  } else {
    document.querySelector("#alert").innerHTML = "";
  }
  // transfer to scale if pre-litigation 
  if (stage == "pre") {
    if (damages <= 5000) {
      value = twoThirds(value);
    } else if (damages > 5000) {
      value = threeQuarters(value);
    }
  }
  return total(value);
}

function twoThirds(value) {
  value = ((value / 3) * 2);
  return value;
}

function threeQuarters(value) {
  value = ((value / 4) * 3);
  return value;
}

// FUNCTION TO DISPLAY NET,VAT,GROSS AMOUNTS 
function total(value) {
  value = parseFloat(value).toFixed(2);
  let vat = parseFloat((value / 100) * 20).toFixed(2);
  let gross = parseFloat(value) + parseFloat(vat);
  document.querySelector("#net").innerHTML = `Net Profit Costs: £${value}`;
  document.querySelector("#vat").innerHTML = `VAT: £${vat}`;
  document.querySelector("#gross").innerHTML = `Gross Profit Costs: £${gross.toFixed(2)}`;
}
// add event listener for whole of doc to be loaded
document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#jurisdiction').onchange = jurisdiction;
  document.querySelector('button').onclick = calculate;
});

