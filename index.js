console.log("siden vises");

// her hentes cart og kategorierne
const cart = document.getElementById("cart");
const categoryLinks = document.querySelectorAll(".categorylist a");

// funktionen der rykker kurven til kategorierne
function moveCartToCategory(category) {
  const categoryPosition = category.getBoundingClientRect();
  console.log("Category Position:", categoryPosition);

  // Beregner den nye position for kurven (midten af kategorien), man ændre den ved at + 40, så tilføj eller tag fra
  const cartLeftPosition = categoryPosition.left + categoryPosition.width / 2 - 50 + 40;
  console.log("New Cart Position:", cartLeftPosition);

  // kører
  cart.style.left = `${cartLeftPosition}px`;
  cart.style.transition = "left 1s ease-in-out";
  console.log("Cart Position after update:", cart.style.left);
}

// Tilføj event listeners til kategorierne
categoryLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    // Forhindrer, at der navigeres med det samme, så kurven når at kører derhen inden man blir sendt videre

    // Flyt indkøbsvognen til den kategori, der blev klikket på
    moveCartToCategory(event.target);

    // så kommer man videre
    setTimeout(() => {
      window.location.href = event.target.href;
    }, 1000);
    // Venter på animationen, inden man går videre
  });
});
