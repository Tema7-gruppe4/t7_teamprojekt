// Når siden er indlæst, kører denne funktion
document.addEventListener("DOMContentLoaded", () => {
  // Henter HTML-elementer fra DOM'en, så vi kan bruge dem senere
  const cartContainer = document.querySelector(".cart-items"); // Her skal produkterne vises i kurven
  const receiptDetails = document.querySelector("#receipt-details"); // Her vises kvitteringen
  const checkoutBtn = document.querySelector("#checkout"); // "PAY NOW"-knappen

  // Henter produktdata fra localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    console.log("No products in cart.");
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    receiptDetails.innerHTML = "<p>No items in receipt</p>";
    return;
  }

  // Funktion til at opdatere UI med produkter i kurven
  function updateCartUI() {
    cartContainer.innerHTML = ""; // Rydder kurven i HTML
    receiptDetails.innerHTML = ""; // Rydder kvitteringen i HTML

    // Gennemgår alle produkter i kurven og tilføjer dem til HTML
    cart.forEach((item, index) => {
      cartContainer.innerHTML += `
                <div class="cart-item">
                    <h3>${item.name}</h3>
                    <img src="${item.image}" alt="${item.name}">
                    <p class="price-container">
                        <img src="assets/coin.svg" alt="Coin">
                        ${item.price.toFixed(2)}
                    </p>
                    <div class="quantity-controls">
                        <button class="decrease-qty" data-index="${index}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="increase-qty" data-index="${index}">+</button>
                    </div>
                    <button class="remove-item" data-index="${index}">X</button>
                </div>
              `;
    });

    // Opdaterer kvitteringen med de produkter, der er i kurven
    receiptDetails.innerHTML =
      cart
        .map(
          (item) => `
                <p class="receipt-line">
                  ${item.quantity} X ${item.name} 
                  <span class="receipt-price">${(item.price * item.quantity).toFixed(2)}</span>
                </p>
              `
        )
        .join("") +
      `
            <p class="receipt-total">
              TOTAL <span>${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</span>
            </p>
          `;

    // Tilføjer event listeners til knapperne (+, -, og fjern-knap)
    addEventListeners();
  }

  // Funktion til at tilføje event listeners til ændring af antal produkter i kurven
  function addEventListeners() {
    // Lytter efter klik på "+" knapperne
    document.querySelectorAll(".increase-qty").forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = event.target.dataset.index; // Finder det rigtige produkt
        cart[index].quantity++; // Øger antal
        saveAndUpdate(); // Opdaterer localStorage og UI
      });
    });

    // Lytter efter klik på "-" knapperne
    document.querySelectorAll(".decrease-qty").forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = event.target.dataset.index;
        if (cart[index].quantity > 1) {
          cart[index].quantity--; // Mindsker antal, hvis der er mere end 1 stk.
        } else {
          cart.splice(index, 1); // Fjerner produktet fra kurven, hvis der kun er 1 stk.
        }
        saveAndUpdate();
      });
    });

    // Lytter efter klik på "X" fjern-knapperne
    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = event.target.dataset.index;
        cart.splice(index, 1); // Fjerner produktet fra kurven
        saveAndUpdate();
      });
    });
  }

  // Funktion til at gemme ændringer i localStorage og opdatere UI
  function saveAndUpdate() {
    localStorage.setItem("cart", JSON.stringify(cart)); // Gemmer kurven i localStorage
    updateCartUI(); // Opdaterer UI
  }

  // Opdater UI ved start
  updateCartUI();
});
