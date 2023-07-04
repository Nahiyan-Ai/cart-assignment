import { products } from "./components/product.js";
import { addToCart, clearCart, getCartItems } from "./components/cart.js";

const productListContainer = document.getElementById("product-list");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalContainer = document.getElementById("cart-total");
const clearCartButton = document.getElementById("clear-cart");

function renderProductList() {
  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "p-4";

    const productName = document.createElement("h3");
    productName.className = "text-lg font-medium";
    productName.textContent = product.name;

    const productPrice = document.createElement("p");
    productPrice.className = "text-gray-500";
    productPrice.textContent = `$${product.price}`;

    const addToCartButton = document.createElement("button");
    addToCartButton.className =
      "mt-2 bg-red-500 text-white px-4 py-2 rounded-lg";
    addToCartButton.textContent = "Add to Cart";

    addToCartButton.addEventListener("click", () => {
      addToCart(product);
      renderCartItems();
    });

    productCard.appendChild(productName);
    productCard.appendChild(productPrice);
    productCard.appendChild(addToCartButton);

    productListContainer.appendChild(productCard);
  });
}

function renderCartItems() {
  cartItemsContainer.innerHTML = "";

  const cartItems = getCartItems();

  cartItems.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.className = "p-4";

    const itemName = document.createElement("h3");
    itemName.className = "text-lg font-medium";
    itemName.textContent = item.product.name;

    const itemQuantity = document.createElement("p");
    itemQuantity.textContent = `Quantity: ${item.quantity}`;

    const itemPrice = document.createElement("p");
    itemPrice.textContent = `Price: $${item.product.price}`;

    cartItem.appendChild(itemName);
    cartItem.appendChild(itemQuantity);
    cartItem.appendChild(itemPrice);

    cartItemsContainer.appendChild(cartItem);
  });

  renderCartTotal();
}

function renderCartTotal() {
  const cartItems = getCartItems();
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  cartTotalContainer.innerHTML = `<p class="text-xl font-medium">Total: $${totalAmount}</p>`;
}

clearCartButton.addEventListener("click", () => {
  clearCart();
  renderCartItems();
});

renderProductList();
renderCartItems();
