console.log("siden vises");

const listContainer = document.querySelector(".categorylist");

fetch(`https://dummyjson.com/products/`)
  .then((response) => response.json())
  .then((data) => showList(data.products))
  .catch((error) => console.error("Error", error));

function showList(products) {
  console.log(products);

  const uniqueCategories = [...new Set(products.map((product) => product.category))];

  let markup = uniqueCategories.map((category) => `<a class="list" href="productlist.html?category=${category}">${category}</a>`).join("");

  console.log(markup);
  listContainer.innerHTML = markup;
}

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
    items: ["Essence Mascara Lash Princess by Essence", "Eyeshadow Palette with Mirror by Essence", "Dior J'adore by Dior"],
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
