const producttList = document.querySelector(".productlist_container");

const getString = window.location.search;
const getSearch = new URLSearchParams(getString);
const category = getSearch.get("category");

let gemData;
const filterSelecter = document.querySelector("#filter");
let filter = "all";

fetch(`https://dummyjson.com/products?category=${category}&limit=10`)
  .then((response) => response.json())
  .then((dataJSON) => {
    gemData = dataJSON.products; // Brug ".products"
    showList(gemData);
  });

function showList(data) {
  const filteredData = data.filter((product) => {
    if (filter === "all") {
      return true;
    } else if (filter === "saleLabel") {
      return product.discount; // Hvis rabat eksisterer
    } else if (filter == "soldOutLabel") {
      return !product.soldOut; // Rigtig stavning af soldOut
    }
  });

  const markup = filteredData
    .map(
      (product) => `
      <article class="productlist_card">
          <div class="img_productlist">
            <h2>${product.title}</h2>
            <a href="product.html">
              <img src="${product.thumbnail}" alt="${product.title}" />
            </a>
          </div>

          <div class="pris_addtocart">
            <a href="#" class="add-to-cart">add to cart</a>
            <div class="price-container">
              <img class="icon" src="assets/coin.svg" alt="Ikon" />
              <span class="price">${Math.round(product.price)} </span>
            </div>
          </div>
          <p>Category: ${product.category}</p>
        </article>
      `
    )
    .join("");

  producttList.innerHTML = markup;
}
filterSelecter.addEventListener("change", (event) => {
  filter = filterSelecter.value;
  console.log("filter", filter);
  showList(gemData);
});
