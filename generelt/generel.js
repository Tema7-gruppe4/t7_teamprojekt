// BURGER MENU OG SØGEFELT
var searchIcon = document.getElementById("search-icon");
var searchField = document.getElementById("search-field");

// Klik på forstørrelsesglasset
searchIcon.addEventListener("click", function (event) {
  event.stopPropagation();
  searchField.classList.toggle("active");
  searchField.focus();
});

// Skjul søgefeltet hvis der klikkes et andet sted
document.addEventListener("click", function (event) {
  if (!searchField.contains(event.target) && event.target !== searchIcon) {
    searchField.classList.remove("active");
  }
});

// Hent produkter fra API
fetch("https://dummyjson.com/products")
  .then((response) => response.json())
  .then((data) => {
    showProducts(data.products);
    setupSearch(data.products);
  })
  .catch((error) => console.error("Fejl ved hentning af produkter", error));

const productContainer = document.querySelector(".product-list");

function showProducts(products) {
  let markup = products
    .map(
      (product) => `
      <div class="product-card">
        <img src="${product.thumbnail}" alt="${product.title}" />
        <h3>${product.title}</h3>
        <p>${product.price} kr.</p>
      </div>
    `
    )
    .join("");

  productContainer.innerHTML = markup;
}

// Søgning
function setupSearch(products) {
  searchField.addEventListener("input", function () {
    const searchText = searchField.value.toLowerCase();

    const filteredProducts = products.filter((product) => product.title.toLowerCase().includes(searchText));

    showProducts(filteredProducts);
  });
}

// BURGER MENU
function toggleMenu() {
  const menu = document.querySelector(".menu");
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

// newsletter

document.getElementById("subscribe-btn").addEventListener("click", function () {
  const emailInput = document.getElementById("email-input").value;
  const successMessage = document.getElementById("success-message");

  if (emailInput.includes("@") && emailInput.includes(".")) {
    successMessage.textContent = "Thanks for signing up at Fresh Cart! You will get an email with a discount code and get 20% off on your next buy!";
    successMessage.style.display = "block";
  } else {
    alert("Please enter a valid email address!");
  }
});
