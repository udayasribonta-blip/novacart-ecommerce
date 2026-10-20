const catalog = [];

function addProducts(prefix, names, category, basePrice, subcategory = "") {
  names.forEach((name, index) => {
    const product = {
      name,
      category,
      price: basePrice + (index % 5) * 100,
      image: `Product images/${prefix}${index + 1}.jpg`,
      keywords: `${name} ${category} ${subcategory} shopping fashion`
    };

    if (subcategory) product.subcategory = subcategory;
    catalog.push(product);
  });
}

// Electronics
addProducts("Electronic gadgets", [
  "Bluetooth Neckband Earphones",
  "Wireless Over-Ear Headphones",
  "True Wireless Earbuds",
  "Digital Smart Watch",
  "Fitness Smartwatch",
  "Colorful Smartphone",
  "Decorative Phone Case",
  "Windows Laptop",
  "Gaming Laptop"
], "Electronics", 799);

// Kids Wear — Girls
addProducts("kids girls night_wear", [
  "Pink Girls Night Suit",
  "Red Printed Night Suit",
  "Color Block Pajama Set",
  "Cute Printed Nightwear Set",
  "Lavender Girls Night Suit"
], "Kids Wear", 499, "Girls Wear");

addProducts("kids girls_wear", [
  "Green Floral Frock",
  "Colorful Party Dress",
  "Pink Tutu Party Dress",
  "Green Festive Frock",
  "Printed Girls Dress",
  "Traditional Girls Gown"
], "Kids Wear", 599, "Girls Wear");

addProducts("kids-girls-saree", [
  "Navy Blue Girls Saree",
  "Black Festive Girls Saree",
  "Blue Traditional Girls Saree",
  "Maroon Party Girls Saree"
], "Kids Wear", 799, "Girls Wear");

// Kids Wear — Boys
addProducts("kids-boys-night wears", [
  "Navy Blue Boys Night Suit",
  "Printed Boys Pajama Set",
  "Blue Boys Nightwear",
  "Colorful Boys Night Suit"
], "Kids Wear", 499, "Boys Wear");

addProducts("kids-boys-pant", [
  "Boys Casual Trousers",
  "Green Cargo Pants for Boys",
  "Everyday Boys Joggers"
], "Kids Wear", 499, "Boys Wear");

catalog.push(
  {
    name: "Boys Pink Shirt and Jeans",
    category: "Kids Wear",
    subcategory: "Boys Wear",
    price: 499,
    image: "Product images/kids-boys-shirt-1.jpg",
    keywords: "boys kids shirt jeans clothes"
  },
  {
    name: "Boys Maroon Casual Outfit",
    category: "Kids Wear",
    subcategory: "Boys Wear",
    price: 599,
    image: "Product images/kids-boys-shirt2.jpg",
    keywords: "boys kids maroon shirt outfit"
  },
  {
    name: "Boys Printed Shirt Set",
    category: "Kids Wear",
    subcategory: "Boys Wear",
    price: 699,
    image: "Product images/kids-boys-shirt3.jpg",
    keywords: "boys kids printed shirt clothes"
  }
);

// Kids Toys
addProducts("kids toys", [
  "Soft Animal Plush Toy Set",
  "Blue Robot Toy",
  "Cute Elephant Plush Toy",
  "Colorful Spinning Toy Set",
  "Building Blocks Set",
  "Kids Kitchen Play Set",
  "Colorful Toy Playhouse"
], "Kids Toys", 299);

// Kids Products — Boys and Girls
addProducts("kids-boys products", [
  "Boys Cap and Sunglasses Set",
  "Kids Strawberry Face Wash",
  "Boys Colorful Sunglasses Set"
], "Kids Products", 199, "Boys Products");

addProducts("kids-boys shoes", [
  "White Boys Sports Shoes",
  "Black Boys Casual Sneakers",
  "Colorful Boys Sneakers"
], "Kids Products", 699, "Boys Products");

addProducts("kids-girls products", [
  "Colorful Girls Bangles Set",
  "Pink Heart Girls Sandals",
  "Girls Party Sandals",
  "Colorful Girls Necklace Set",
  "Blue Beaded Jewellery Set",
  "Girls Earrings Collection",
  "Girls Anklet Set"
], "Kids Products", 199, "Girls Products");

// Men's Wear
addProducts("mens pants wear", [
  "Olive Green Casual Pants",
  "Grey Formal Trousers",
  "Light Grey Slim Fit Pants",
  "Blue Denim Jeans",
  "Men's Grey Casual Trousers"
], "Men's Wear", 699);

addProducts("mens shirts wear", [
  "Light Blue Casual Shirt",
  "Red and Blue Checked Shirt",
  "White Printed Casual Shirt",
  "Pink Men's Formal Shirt",
  "Purple Slim Fit Shirt"
], "Men's Wear", 599);

addProducts("mens traditional wear", [
  "White Traditional Kurta Set",
  "Green Kurta and Dhoti Set",
  "Pink Festive Sherwani Set"
], "Men's Wear", 999);

// Men's Products
addProducts("mens products", [
  "Brown Casual Sneakers",
  "Blue Sports Shoes",
  "Men's Sunglasses Set",
  "Classic Black Eyeglasses",
  "Black Men's Belt Set",
  "Green Dial Wristwatch",
  "Classic Men's Wristwatch"
], "Men's Products", 299);

// Women's Wear
addProducts("girls traditional wear", [
  "Green Traditional Lehenga",
  "Lavender Party Lehenga",
  "Purple Embroidered Lehenga",
  "Colorful Festive Lehenga Set"
], "Women's Wear", 999);

addProducts("girls wear", [
  "Lavender Party Gown",
  "Navy and Yellow Ethnic Outfit",
  "Blue Silver Party Gown",
  "Purple Anarkali Dress"
], "Women's Wear", 799);

addProducts("women sarees", [
  "Emerald Green Saree",
  "Cream and Red Border Saree",
  "Maroon Embroidered Saree",
  "Teal Green Party Saree",
  "Mustard Yellow Festive Saree",
  "Black and Gold Saree"
], "Women's Wear", 999);

// Women's Jewellery
addProducts("women jewellery", [
  "Traditional Gold Tone Earrings",
  "Colorful Beaded Necklace Set",
  "Festive Jewellery Set",
  "Gold Tone Necklace Set",
  "Bridal Jewellery Collection",
  "Colorful Necklace and Earring Set"
], "Women's Jewellery", 299);

// Women's Products
addProducts("women products", [
  "Makeup and Beauty Kit",
  "Saffron Face Wash",
  "Lavender Women's Sandals",
  "Women's Casual Slippers",
  "Colorful Hair Ties Set",
  "Women's Hair Care Combo",
  "Floral Hair Clip Set",
  "Pearl Hair Clips Set",
  "Rose Gold Women's Watch",
  "Colorful Fashion Watches"
], "Women's Products", 199);

// Save the catalog so checkout.js can show the cart items
localStorage.setItem("novacart-catalog", JSON.stringify(catalog));

// Cart and wishlist
const cartKey = "novacart-cart";
const wishlistKey = "novacart-wishlist";

let cart = JSON.parse(localStorage.getItem(cartKey) || "[]");
let wishlist = JSON.parse(localStorage.getItem(wishlistKey) || "[]");
let selectedCategory = "All";
let selectedSubcategory = "All";

const subcategoryOptions = {
  "Kids Products": ["All", "Boys Products", "Girls Products"],
  "Kids Wear": ["All", "Girls Wear", "Boys Wear"]
};

// Page elements
const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilters = document.getElementById("categoryFilters");
const cartDetails = document.getElementById("cartDetails");
const cartButton = document.getElementById("cartButton");
const cartCount = document.getElementById("cartCount");
const resultCount = document.getElementById("resultCount");
const noResults = document.getElementById("noResults");
const message = document.getElementById("message");

function saveCart() {
  localStorage.setItem(cartKey, JSON.stringify(cart));
}

function saveWishlist() {
  localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
}

function updateCartCount() {
  if (cartCount) cartCount.textContent = cart.length;
}

function showCategories() {
  if (!categoryFilters) return;

  const categories = [
    "All",
    ...new Set(catalog.map(product => product.category))
  ];

  let html = categories.map(category => {
    const active = category === selectedCategory ? "active" : "";

    return `
      <button class="category-button ${active}" data-category="${category}">
        ${category}
      </button>
    `;
  }).join("");

  const subcategories = subcategoryOptions[selectedCategory];

  if (subcategories) {
    html += `<span class="subcategory-heading">${selectedCategory}:</span>`;

    html += subcategories.map(subcategory => {
      const active = subcategory === selectedSubcategory ? "active" : "";

      return `
        <button class="category-button ${active}"
                data-subcategory="${subcategory}">
          ${subcategory}
        </button>
      `;
    }).join("");
  }

  categoryFilters.innerHTML = html;
}

function showProducts() {
  if (!productGrid || !searchInput) return;

  const searchTerm = searchInput.value.toLowerCase().trim();

  const matchingProducts = catalog.filter(product => {
    const searchableText =
      `${product.name} ${product.category} ${product.subcategory || ""} ${product.keywords}`
        .toLowerCase();

    const matchesSearch = searchableText.includes(searchTerm);
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    const hasSubcategories = Boolean(subcategoryOptions[selectedCategory]);
    const matchesSubcategory =
      !hasSubcategories ||
      selectedSubcategory === "All" ||
      product.subcategory === selectedSubcategory;

    return matchesSearch && matchesCategory && matchesSubcategory;
  });

  if (resultCount) {
    resultCount.textContent = `${matchingProducts.length} product(s) found`;
  }

  if (noResults) {
    noResults.hidden = matchingProducts.length > 0;
  }

  productGrid.innerHTML = matchingProducts.map(product => {
    const categoryLabel = product.subcategory
      ? `${product.category} · ${product.subcategory}`
      : product.category;

    const heart = wishlist.includes(product.name) ? "♥" : "♡";
    const heartClass = wishlist.includes(product.name) ? "is-wishlisted" : "";

    return `
      <article class="product">
        <button class="wishlist-button ${heartClass}"
                data-wishlist="${product.name}"
                aria-label="Add ${product.name} to wishlist">
          ${heart}
        </button>

        <div class="product-picture">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
        </div>

        <div class="product-info">
          <h3>${product.name}</h3>
          <div class="category">${categoryLabel}</div>

          <div class="price-row">
            <span class="price">₹${product.price.toLocaleString("en-IN")}</span>
            <button class="add-button" data-product="${product.name}">
              Add to cart
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function renderCartAndWishlist() {
  if (!cartDetails) return;

  const quantities = {};
  cart.forEach(name => {
    quantities[name] = (quantities[name] || 0) + 1;
  });

  let total = 0;
  let cartHTML = "";

  Object.keys(quantities).forEach(name => {
    const product = catalog.find(item => item.name === name);
    if (!product) return;

    const quantity = quantities[name];
    const itemTotal = product.price * quantity;
    total += itemTotal;

    cartHTML += `
      <div class="cart-item">
        <img src="${product.image}" alt="${product.name}">

        <div class="cart-item-info">
          <strong>${product.name}</strong>
          <span>₹${product.price.toLocaleString("en-IN")} each</span>

          <div class="quantity-controls">
            <button data-action="minus" data-name="${product.name}">−</button>
            <span>Qty: ${quantity}</span>
            <button data-action="plus" data-name="${product.name}">+</button>
          </div>
        </div>

        <strong>₹${itemTotal.toLocaleString("en-IN")}</strong>

        <button class="remove-item"
                data-action="remove-cart"
                data-name="${product.name}">
          Remove
        </button>
      </div>
    `;
  });

  if (!cartHTML) cartHTML = "<p>Your cart is empty.</p>";

  let wishlistHTML = "";

  wishlist.forEach(name => {
    const product = catalog.find(item => item.name === name);
    if (!product) return;

    wishlistHTML += `
      <div class="cart-item wishlist-item">
        <img src="${product.image}" alt="${product.name}">

        <div class="cart-item-info">
          <strong>${product.name}</strong>
          <span>${product.category}</span>
          <span>₹${product.price.toLocaleString("en-IN")}</span>
        </div>

        <button class="add-button"
                data-action="wishlist-to-cart"
                data-name="${product.name}">
          Add to cart
        </button>

        <button class="remove-item"
                data-action="remove-wishlist"
                data-name="${product.name}">
          Remove
        </button>
      </div>
    `;
  });

  if (!wishlistHTML) {
    wishlistHTML = "<p>Your wishlist is empty. Tap a product heart to save it.</p>";
  }

  cartDetails.innerHTML = `
    <div class="cart-panel">
      <button class="overlay-close" data-action="close" aria-label="Close">×</button>

      <h2>Your Cart</h2>
      <div class="cart-list">${cartHTML}</div>
      <h3 class="cart-total">Cart total: ₹${total.toLocaleString("en-IN")}</h3>
      <a class="checkout-link" href="checkout.html">Proceed to checkout</a>
      <button class="clear-cart-button" data-action="clear-cart">Clear cart</button>

      <hr>

      <h2>Your Wishlist ♥</h2>
      <div class="cart-list">${wishlistHTML}</div>
    </div>
  `;

  cartDetails.hidden = false;
}

// Category and subcategory buttons
if (categoryFilters) {
  categoryFilters.addEventListener("click", event => {
    const categoryButton = event.target.closest("[data-category]");
    const subcategoryButton = event.target.closest("[data-subcategory]");

    if (categoryButton) {
      selectedCategory = categoryButton.dataset.category;
      selectedSubcategory = "All";
      showCategories();
      showProducts();
      return;
    }

    if (subcategoryButton) {
      selectedSubcategory = subcategoryButton.dataset.subcategory;
      showCategories();
      showProducts();
    }
  });
}

// Search
if (searchInput) {
  searchInput.addEventListener("input", showProducts);
}

// Product clicks: wishlist heart or Add to cart
if (productGrid) {
  productGrid.addEventListener("click", event => {
    const heartButton = event.target.closest("[data-wishlist]");

    if (heartButton) {
      const name = heartButton.dataset.wishlist;

      if (wishlist.includes(name)) {
        wishlist = wishlist.filter(item => item !== name);
        if (message) message.textContent = `${name} removed from your wishlist.`;
      } else {
        wishlist.push(name);
        if (message) message.textContent = `${name} added to your wishlist!`;
      }

      saveWishlist();
      showProducts();

      if (cartDetails && !cartDetails.hidden) {
        renderCartAndWishlist();
      }
      return;
    }

    const addButton = event.target.closest(".add-button");
    if (!addButton) return;

    cart.push(addButton.dataset.product);
    saveCart();
    updateCartCount();

    if (message) {
      message.textContent = `${addButton.dataset.product} added to your cart!`;
    }
  });
}

// Cart button opens the cart and wishlist popup
if (cartButton) {
  cartButton.addEventListener("click", renderCartAndWishlist);
}

// Popup actions
if (cartDetails) {
  cartDetails.addEventListener("click", event => {
    // Clicking the dark area outside the popup closes it.
    if (event.target === cartDetails) {
      cartDetails.hidden = true;
      return;
    }

    const button = event.target.closest("[data-action]");
    if (!button) return;

    const action = button.dataset.action;
    const name = button.dataset.name;

    if (action === "close") {
      cartDetails.hidden = true;
      return;
    }

    if (action === "plus") {
      cart.push(name);
    } else if (action === "minus") {
      const index = cart.indexOf(name);
      if (index !== -1) cart.splice(index, 1);
    } else if (action === "remove-cart") {
      cart = cart.filter(item => item !== name);
    } else if (action === "clear-cart") {
      cart = [];
    } else if (action === "remove-wishlist") {
      wishlist = wishlist.filter(item => item !== name);
    } else if (action === "wishlist-to-cart") {
      cart.push(name);
    }

    saveCart();
    saveWishlist();
    updateCartCount();
    renderCartAndWishlist();
  });
}

// Initial display
showCategories();
showProducts();
updateCartCount();