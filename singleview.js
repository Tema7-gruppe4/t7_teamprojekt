// aditional info
const additionalInfo = document.getElementById("collapsible");
const content = document.getElementById("content");
const more = document.getElementById("viewMore");
const less = document.getElementById("viewLess");

additionalInfo.addEventListener("click", (event) => {
  console.log("click");

  if (content.style.display === "block") {
    content.style.display = "none";
    less.style.visibility = "hidden";
    more.style.visibility = "visible";
  } else {
    content.style.display = "block";
    more.style.visibility = "hidden";
    less.style.visibility = "visible";
  }
});

// dynamisk
const singeViewContainer = document.querySelector("#singleView");
const commentsViewContainer = document.querySelector("#commentsView");

const ProductId = new URLSearchParams(window.location.search).get("id");
console.log("produkt loader... med id:", ProductId);

fetch(`https://dummyjson.com/products/${ProductId}`)
  .then((Response) => Response.json())
  .then((data) => {
    singeViewContainer.innerHTML = `
    <div class="productView">
          <img id="imageView" src="${thumbnail}" alt="product image" /> 

          <div id="onSaleLabel">
            <h2 id="onSale" class="${data.discount && "show"}">-${data.discount}%</h2>
          </div>

          <div class="textOnImage">
            <p class="brandView">${data.brand}</p>
            <h1 class="h1View">${data.title}</h1>
          </div>

          <div class="priceView">
            <!-- id="onSaleCoin" på img for udalgs design -->
            <img class="coinView" id="${data.discountPercentage && "onSaleCoin"}" src="assets/coin.svg" alt="coin" />
            <!-- id="onSalePrice" på h2 for udalgs design -->
            <h2 id="${data.discountPercentage && "onSalePrice"}">10.00</h2>
            <p>(for 1)</p>
          </div>

          <h2 id="nowPrice" class="${data.discount && "show"}>NOW ${data.discount && Math.floor(data.price * (data.discountPercentage / 100))}</h2>

            <!-- id="soldOut" for udslogt design -->
            <button class="addToCart">ADD TO CART</button>
          </div>

          <div id="inStock">
            <p class="${data.stock && "block"}">in stock</p>
            <p class="${data.stock && "none"}">sold out</p>
          </div>
        </div>

        <div class="line">
          <div class="info">
            <button id="collapsible">ADDITIONAL INFO</button>
            <p id="viewMore">+</p>
            <p id="viewLess">-</p>
          </div>
          <div id="content">
            <p><strong>weight:</strong> ${data.weight}g.</p>
            <p><strong>dimentions:</strong> ${data.width} width, ${data.height} height, ${data.depth} depth</p>
            <p><strong>shipping time:</strong> ${data.shippingInformation}</p>
          </div>
        </div>
        `;
  });

fetch(`https://dummyjson.com/products/${ProductId}`)
  .then((Response) => Response.json())
  .then((data) => showComments(data));

function showComments(comments) {
  console.log(comments);

  const markup = comments

    .map(
      (comment) => `
         <div class="line lineDesktop">
          <p class="costumerName">${data.reviewerName}</p>
          <p class="commentDAte">date: ${data.date}</p>
          <p class="comment">"${data.comment}"</p>
        </div>
      `
    )

    .join("");
  console.log(markup);
  commentsViewContainer.innerHTML = markup;
}

// Initialize clickCount
let clickCount = 1;

// EVENT LISTENER FOR "Add to bag" BUTTON
document.querySelector(".addToCart").addEventListener("click", function (event) {
  event.preventDefault();
  // Prevents the form from being submitted

  fetch(`https://dummyjson.com/products/${ProductId}`)
    .then((response) => response.json())
    .then((data) => {
      // Data from the API
      const finalPrice = data.price * clickCount; // clickCount is always 1 in this case
      const category = data.category;
      const title = data.title;

      // Stores product data in localStorage
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingItem = cart.find((item) => item.id === data.id);

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.price += data.price;
      } else {
        cart.push({
          id: data.id,
          name: title,
          price: finalPrice,
          quantity: 1, // Always adding 1 item
          size: document.getElementById("size").value,
          image: data.thumbnail,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      console.log(`Added item to cart. Total items: ${cart.reduce((sum, item) => sum + item.quantity, 0)}`);

      // Redirects user to cart.html
      window.location.href = "cart.html";
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
});
