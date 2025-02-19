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

          <div class="payView">
            <select id="selectElement">
              <option value="default">choose how many</option>
              <option value="one">1</option>
              <option value="tow">2</option>
              <option value="three">3</option>
              <option value="four">4</option>
              <option value="five">5</option>
            </select>

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

// EVENT LISTENER FOR "Add to bag" BUTTON
document.querySelector(".addToCart").addEventListener("click", function (event) {
  event.preventDefault(); 
  // Prevents the form from being submitted

  fetch(`https://dummyjson.com/products/${ProductId}`)
    .then((response) => response.json())
    .then((data) => {
      // Data from the API
      const finalPrice = /* Calculate or retrieve final price based on data */;
      const category = data.category;
      const title = data.title;

      // Stores product data in localStorage
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push({
        id: data.id,
        name: data.title,
        price: finalPrice,
        size: document.getElementById("size").value, // Gets size from dropdown
        image: `https://i.dummyjson.com/data/products/${data.id}/thumbnail.jpg`, // Corrected image URL

      });
      localStorage.setItem("cart", JSON.stringify(cart));

      // Redirects user to cart.html
      window.location.href = "cart.html";
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
});
