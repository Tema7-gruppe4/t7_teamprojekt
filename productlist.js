const producttList = document.querySelector(".productlist_container");

const getString = window.location.search;
const getSearch = new URLSearchParams(getString);
const category = getSearch.get("category");

let gemData;
const filterSelecter = document.querySelector("#filter");
let filter = "all";

fetch(`https://dummyjson.com/products?category=${category}&limit=55`)
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
      return product.discountPercentage; // Hvis rabat eksisterer
    } else if (filter === "soldOutLabel") {
      return product.availabilityStatus === "Sold Out"; // Rigtig stavning af soldOut
    }
  });

  const markup = filteredData
    .map(
      (product) => `
      <article class="productlist_card">
          <div class="img_productlist">
            <h2>${product.title}</h2>
            <a href="product.html">
              <img src="${product.thumbnail}"      
              alt="${product.productdisplayname}" 
            style="${product.availabilityStatus === "Sold Out" ? "opacity: 0.4;" : ""}" />
           
            <!-- UDSOLGT Label -->
       <span class="saleLabel ${product.discountPercentage && "saleOn_img"}">sale : ${product.discountPercentage} % </span>
<span class="soldOutLabel ${product.availabilityStatus === "Sold Out" ? "soldOut_img" : ""}">Sold out</span>
          </div>
           </a>
          <div class="pris_addtocart">
            
            <div class="price-container">
            <a href="#" class="add-to-cart">add to cart</a>
              <img class="icon" src="assets/coin.svg" alt="Ikon" />
               ${product.discountPercentage ? `<span class="dashed">${Math.round(product.price)}</span> <span class="new-price">${Math.round(product.price * (1 - product.discountPercentage / 100))}</span>` : `${Math.round(product.price)}`}
            </div>
            
          </div>
           <p class="product-category">Category: ${product.category}</p>
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
