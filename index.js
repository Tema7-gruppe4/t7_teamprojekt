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

  // weekly news

  const inspirationCards = [
    {
      title: "Ramen",
      image: "assets/notes.svg",
      items: ["2 packs of noodles", "4 cups broth (chicken/vegetable)", "12 cloves garlic (minced)", "1 inch ginger (grated)", "2 tbsp soy sauce", "1 tsp sesame oil", "1 boiled egg, mushrooms, green onions, spinach"],
    },
    {
      title: "Best reviews",
      image: "assets/notes.svg",
      items: ["Highly impressed! ★★★★★ ", "Excellent quality! ★★★★★", "Would buy again! ★★★★☆", "Very happy with my purchase! ★★★★★", "Great value for money! ★★★★★"],
    },
    {
      title: "Best sellers",
      image: "assets/notes.svg",
      items: ["Essence Mascara Lash Princess by Essence", "Eyeshadow Palette with Mirror by Essence", "Dior J'adore by Dior", "Calvin Klein CK One by Calvin Klein", "Annibale Colombo Sofa by Annibale Colombo", "Bedside Table African Cherry by Furniture Co"],
    },
  ];

  let currentIndex = 0;

  const cardContainer = document.querySelector(".inspiration-card");
  const rightArrow = document.querySelector(".arrow:last-of-type");
  const leftArrow = document.querySelector(".arrow:first-of-type");

  function updateCard() {
    const card = inspirationCards[currentIndex];
    cardContainer.innerHTML = `
    <img class="notes" src="${card.image}" alt="Notes" />
    <h3>${card.title}</h3>
    <ul>
      ${card.items.map((item) => `<li>${item}</li>`).join("")}
    </ul>
    <a href="productlist"> <button class="shop-button">Read more</button></a>
  `;
  }

  rightArrow.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % inspirationCards.length;
    updateCard();
  });

  leftArrow.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + inspirationCards.length) % inspirationCards.length;
    updateCard();
  });

  // Initial visning af første kort
  updateCard();
});
