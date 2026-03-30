const API_URL = "https://www.course-api.com/javascript-store-products";

function fetchProductsThen() {
  fetch(API_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return response.json();
    })
    .then(data => {
      data.forEach(product => {
        console.log(product.fields.name);
      });
    })
    .catch(error => {
      console.error("Error fetching products:", error.message);
    });
}

async function fetchProductsAsync() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const products = await response.json();

    displayProducts(products);

  } catch (error) {
    handleError(error); 
  }
}

function displayProducts(products) {
  const container = document.getElementById("product-container");

  container.innerHTML = "";

  const firstFive = products.slice(0, 5);

  firstFive.forEach(product => {
    const { name, price, image } = product.fields;

    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${image[0].url}" alt="${name}">
      <h3 class="product-name">${name}</h3>
      <p class="product-price">$${(price / 100).toFixed(2)}</p>
    `;

    container.appendChild(card);
  });
}

function handleError(error) {
  console.error(`An error occurred: ${error.message}`);
}

fetchProductsThen();
fetchProductsAsync();