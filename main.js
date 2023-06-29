const btn = document.querySelector(".submit");
const fullName = document.querySelector("#name");
const errorName = document.querySelector(".name_error");
const email = document.querySelector("#email");
const errorEmail = document.querySelector(".email_error");
const phoneNumber = document.querySelector("#phone");
const errorPhone = document.querySelector(".phone_error");
const steps = document.querySelectorAll(".num");
const switchInput = document.querySelector("#switch");
const monthly = document.querySelector(".monthly");
const yearly = document.querySelector(".yearly");
const plans = document.querySelectorAll(".plan");
const backBtn = document.querySelector(".back");
const freeTry = document.querySelectorAll(".free_try");
const addOnsPrice = document.querySelectorAll(".addons_price");
const summary = document.querySelector(".summary_container");
const addOneResultPrice = document.querySelector(".summary_addone");
const totalPrice = document.querySelector(".total_price");

const fullNameRegex = /^[A-Z][a-zA-Z]{1,}\s[A-Z][a-zA-Z]{1,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneNumberRegex = /^\d{10}$/;
let navigationPage = 1;
let billingPlan = { name: "arcade", price: 9 };
let billingTime = "Monthly";
let addOne = [];

function validateForm() {
  const isFullNameValid = fullNameRegex.test(fullName.value);
  const isEmailValid = emailRegex.test(email.value);
  const isPhoneNumberValid = phoneNumberRegex.test(phoneNumber.value);

  errorName.style.display = isFullNameValid ? "none" : "block";
  errorEmail.style.display = isEmailValid ? "none" : "block";
  errorPhone.style.display = isPhoneNumberValid ? "none" : "block";

  btn.disabled = !(isFullNameValid && isEmailValid && isPhoneNumberValid);
}

function switchBilling(e) {
  billingPlan = e.target.checked;
  if (billingPlan) {
    monthly.classList.toggle("disable");
    monthly.classList.remove("active");
    yearly.classList.remove("disable");
    billingTime = "Yearly";

    freeTry.forEach((value) => {
      value.classList.toggle("show_try");
    });

    plans.forEach((item) => {
      if (item.classList[1] === "pro") {
        item.children[1].children[1].innerHTML = "$150/yr";
      } else if (item.classList[1] === "advanced") {
        item.children[1].children[1].innerHTML = "$120/yr";
      } else if (item.classList[1] === "arcade") {
        item.children[1].children[1].innerHTML = "$9/yr";
      }
    });

    addOnsPrice.forEach((item) => {
      if (item.classList[1] === "larger") {
        item.innerHTML = "$20/mo";
      } else if (item.classList[1] === "service") {
        item.innerHTML = "$10/mo";
      } else if (item.classList[1] === "custom") {
        item.innerHTML = "$20/mo";
      }
    });
  } else {
    yearly.classList.toggle("disable");
    yearly.classList.remove("active");
    monthly.classList.remove("disable");
    billingTime = "Monthly";

    freeTry.forEach((value) => {
      value.classList.remove("show_try");
    });

    plans.forEach((item) => {
      if (item.classList[1] === "pro") {
        item.children[1].children[1].innerHTML = "$15/mo";
      } else if (item.classList[1] === "advanced") {
        item.children[1].children[1].innerHTML = "$12/mo";
      } else if (item.classList[1] === "arcade") {
        item.children[1].children[1].innerHTML = "$9/mo";
      }
    });

    addOnsPrice.forEach((item) => {
      if (item.classList[1] === "custom") {
        item.innerHTML = "$2/mo";
      } else if (item.classList[1] === "service") {
        item.innerHTML = "$1/mo";
      } else if (item.classList[1] === "larger") {
        item.innerHTML = "$2/mo";
      }
    });
  }
}

function selectPlan(value) {
  plans.forEach((item) => {
    if (item.classList.contains(value)) {
      item.classList.toggle("selected");
      if (billingTime === "yearly") {
        if (value === "arcade") {
          billingPlan = { name: value, price: 90 };
        } else if (value === "advanced") {
          billingPlan = { name: value, price: 120 };
        } else if (value === "pro") {
          billingPlan = { name: value, price: 150 };
        }
      } else {
        if (value === "arcade") {
          billingPlan = { name: value, price: 9 };
        } else if (value === "advanced") {
          billingPlan = { name: value, price: 12 };
        } else if (value === "pro") {
          billingPlan = { name: value, price: 15 };
        }
      }
    } else {
      item.classList.remove("selected");
    }
  });
}

const selectAddOns = (addone) => {
  const selectedAddOn = document.getElementById(addone);
  const selectedAddOnLabel = document.querySelector(`.${addone}`);
  selectedAddOnLabel.classList.toggle("selected");

  if (addOne.some((ad) => ad.name === addone)) {
    addOne = addOne.filter((a) => a.name !== addone);

    selectedAddOn.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  } else {
    let newAddone;
    if (billingTime === "Yearly") {
      if (addone === "online") {
        newAddone = { name: addone, price: 10 };
      } else if (addone === "larger") {
        newAddone = { name: addone, price: 20 };
      } else if (addone === "custom") {
        newAddone = { name: addone, price: 20 };
      }
    } else {
      if (addone === "online") {
        newAddone = { name: addone, price: 1 };
      } else if (addone === "larger") {
        newAddone = { name: addone, price: 2 };
      } else if (addone === "custom") {
        newAddone = { name: addone, price: 2 };
      }
    }
    addOne.push(newAddone);
    selectedAddOn.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }
};

fullName.addEventListener("input", validateForm);
email.addEventListener("input", validateForm);
phoneNumber.addEventListener("input", validateForm);
switchInput.addEventListener("input", switchBilling);

const goToPage = () => {
  changeNavigation(navigationPage);
  const currentPage = document.querySelector(`#page${navigationPage}`);
  currentPage.style.display = "none";

  navigationPage++;

  const nextPage = document.querySelector(`#page${navigationPage}`);
  nextPage.style.display = "block";

  if (navigationPage === 5) {
    btn.style.display = "none";
    backBtn.style.display = "none";
  }

  if (navigationPage > 1) {
    backBtn.disabled = false;
  } else {
    backBtn.disabled = true;
  }

  if (navigationPage === 4) {
    // Plan
    const plan = document.createElement("div");
    const nameSpan = document.createElement("span");
    const priceSpan = document.createElement("span");
    nameSpan.innerText = billingPlan.name;
    priceSpan.innerText = `$${billingPlan.price}/${billingTime.substring(
      0,
      2
    )}`;
    plan.appendChild(nameSpan);
    plan.appendChild(priceSpan);
    plan.classList.add("summary_plan");
    plan.classList.add("summary");
    summary.appendChild(plan);

    // Addons
    addOne.forEach((value) => {
      const addonDiv = document.createElement("div");
      addonDiv.classList.add("summary");
      addonDiv.classList.add("summary_addone");
      const nameSpan = document.createElement("span");
      const priceSpan = document.createElement("span");
      nameSpan.innerText = value.name;
      priceSpan.innerText = `$${value.price}/${billingTime.substring(0, 2)}`;
      addonDiv.appendChild(nameSpan);
      addonDiv.appendChild(priceSpan);
      summary.appendChild(addonDiv);
    });

    // Total
    const addoneTotal = addOne.reduce((acc, item) => acc + item.price, 0);
    const addOn = document.createElement("div");
    const nameSpanTotal = document.createElement("span");
    const priceSpanTotal = document.createElement("span");
    nameSpanTotal.innerText = `Total ${
      billingTime === "Monthly" ? "(per month)" : "(per year)"
    }`;
    priceSpanTotal.innerText = `$${
      billingPlan.price + addoneTotal
    }/${billingTime.substring(0, 2)}`;
    addOn.appendChild(nameSpanTotal);
    addOn.appendChild(priceSpanTotal);
    addOn.classList.add("summary_total");
    addOn.classList.add("summary");
    summary.appendChild(addOn);
  }
};

const goBack = () => {
  changeNavigation(navigationPage);
  const currentPage = document.querySelector(`#page${navigationPage}`);
  currentPage.style.display = "none";

  navigationPage--;

  const nextPage = document.querySelector(`#page${navigationPage}`);
  nextPage.style.display = "block";

  summary.innerHTML = "";
};

const changeNavigation = (navigationPage) => {
  steps.forEach((step, i) => {
    if (i === navigationPage) {
      step.classList.toggle("active");
    } else {
      step.classList.remove("active");
    }
  });
};
