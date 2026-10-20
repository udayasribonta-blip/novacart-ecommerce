const cart = JSON.parse(localStorage.getItem("novacart-cart") || "[]");
const catalog = JSON.parse(localStorage.getItem("novacart-catalog") || "[]");

const checkoutItems = document.getElementById("checkoutItems");
const checkoutTotal = document.getElementById("checkoutTotal");
const checkoutForm = document.getElementById("checkoutForm");
const orderConfirmation = document.getElementById("orderConfirmation");

const quantities = {};

cart.forEach(name => {
  quantities[name] = (quantities[name] || 0) + 1;
});

let total = 0;
let itemsHTML = "";

Object.keys(quantities).forEach(name => {
  const product = catalog.find(item => item.name === name);
  if (!product) return;

  const quantity = quantities[name];
  const itemTotal = product.price * quantity;
  total += itemTotal;

  itemsHTML += `
    <div class="checkout-product">
      <img src="${product.image}" alt="${product.name}">
      <div>
        <strong>${product.name}</strong>
        <p>Qty: ${quantity}</p>
      </div>
      <strong>₹${itemTotal.toLocaleString("en-IN")}</strong>
    </div>
  `;
});

if (cart.length === 0) {
  itemsHTML = '<p>Your cart is empty. <a href="index.html">Go shopping</a>.</p>';
  checkoutForm.hidden = true;
}

checkoutItems.innerHTML = itemsHTML;
checkoutTotal.textContent = `Total: ₹${total.toLocaleString("en-IN")}`;

checkoutForm.addEventListener("submit", event => {
  event.preventDefault();

  if (cart.length === 0) return;

  const order = {
    orderId: `NC${Date.now()}`,
    date: new Date().toLocaleString(),
    customerName: document.getElementById("customerName").value.trim(),
    phone: document.getElementById("customerPhone").value.trim(),
    address: document.getElementById("customerAddress").value.trim(),
    city: document.getElementById("customerCity").value.trim(),
    pincode: document.getElementById("customerPincode").value.trim(),
    paymentMethod: "Cash on Delivery",
    items: cart,
    total
  };

  const orders = JSON.parse(localStorage.getItem("novacart-orders") || "[]");
  orders.push(order);
  localStorage.setItem("novacart-orders", JSON.stringify(orders));
  localStorage.setItem("novacart-cart", "[]");

  checkoutForm.hidden = true;

  document.querySelectorAll("button, input[type='submit']").forEach(button => {
    const label = (button.innerText || button.value || "")
      .trim()
      .toLowerCase();

    if (label.includes("place order")) {
      button.hidden = true;
    }
  });

  orderConfirmation.hidden = false;
  orderConfirmation.innerHTML = `
    <h2>Order placed successfully!</h2>
    <p>Thank you, ${order.customerName}.</p>
    <p>Your order number is <strong>${order.orderId}</strong>.</p>
    <p>Payment: Cash on Delivery</p>
    <p>Total: ₹${order.total.toLocaleString("en-IN")}</p>
    <a href="index.html">Continue shopping</a>
  `;
});