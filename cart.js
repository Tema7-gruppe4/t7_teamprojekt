// Når siden er indlæst, kører denne funktion
document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.querySelector(".cart-items"); // Hvor produkterne vises
  const receiptDetails = document.querySelector("#receipt-details"); // Kvitteringssektion
  const checkoutBtn = document.querySelector("#checkout"); // "Pay Now"-knap

  // Henter kurven fra localStorage eller laver en tom array, hvis ingen produkter findes
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Opdaterer UI
  function updateCartUI() {
    cartContainer.innerHTML = "";
    receiptDetails.innerHTML = "";

    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }

    cart.forEach((item, index) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");

      cartItem.innerHTML = `
            <h3>${item.name}</h3>
            <img src="${item.image}" alt="${item.name}">
            <p class="price-container">
                <img src="assets/coin.svg" alt="Coin"> ${item.price.toFixed(2)}
            </p>
            <div class="quantity-controls">
                <button class="decrease-qty" data-index="${index}">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="increase-qty" data-index="${index}">+</button>
            </div>
            <button class="remove-item" data-index="${index}">X</button>
          `;

      cartContainer.appendChild(cartItem);
    });

    addEventListeners();
  }

  // Tilføjer event listeners til +, -, og fjern-knappen
  function addEventListeners() {
    document.querySelectorAll(".increase-qty").forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = event.target.dataset.index;
        cart[index].quantity++;
        saveAndUpdate();
      });
    });

    document.querySelectorAll(".decrease-qty").forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = event.target.dataset.index;
        if (cart[index].quantity > 1) {
          cart[index].quantity--;
        } else {
          cart.splice(index, 1);
        }
        saveAndUpdate();
      });
    });

    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = event.target.dataset.index;
        cart.splice(index, 1);
        saveAndUpdate();
      });
    });
  }

  // Gemmer kurven og opdaterer UI
  function saveAndUpdate() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
  }

  // Håndtering af "PAY NOW"-knappen
  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    // Genererer kvitteringsindhold med det rigtige layout
    receiptDetails.innerHTML = `
        ${cart
          .map(
            (item) => `
          <p>${item.quantity} X ${item.name} <span class="receipt-price">${item.price.toFixed(2)}</span></p>
        `
          )
          .join("")}
        <hr>
        <p>TOTAL <span class="receipt-price">${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</span></p>
      `;

    localStorage.removeItem("cart");
    cart = [];
    updateCartUI();
  });

  // Opdater UI ved start
  updateCartUI();
});
