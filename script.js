const catalog = [];
function addProducts(prefix, names, category, basePrice, subcategory = "") {
  names.forEach((name, index) => catalog.push({
    name, category, subcategory, price: basePrice + (index % 5) * 100,
    image: `Product images/${prefix}${index + 1}.jpg`,
    keywords: `${name} ${category} ${subcategory} shopping fashion`,
    rating: Number((4.2 + ((catalog.length * 7) % 8) / 10).toFixed(1)),
    reviewCount: 12 + ((catalog.length * 11) % 83)
  }));
}
addProducts("Electronic gadgets", ["Bluetooth Neckband Earphones","Wireless Over-Ear Headphones","True Wireless Earbuds","Digital Smart Watch","Fitness Smartwatch","Colorful Smartphone","Decorative Phone Case","Windows Laptop","Gaming Laptop"], "Electronics", 799);
addProducts("kids girls night_wear", ["Pink Girls Night Suit","Red Printed Night Suit","Color Block Pajama Set","Cute Printed Nightwear Set","Lavender Girls Night Suit"], "Kids Wear", 499, "Girls Wear");
addProducts("kids girls_wear", ["Green Floral Frock","Colorful Party Dress","Pink Tutu Party Dress","Green Festive Frock","Printed Girls Dress","Traditional Girls Gown"], "Kids Wear", 599, "Girls Wear");
addProducts("kids-girls-saree", ["Navy Blue Girls Saree","Black Festive Girls Saree","Blue Traditional Girls Saree","Maroon Party Girls Saree"], "Kids Wear", 799, "Girls Wear");
addProducts("kids-boys-night wears", ["Navy Blue Boys Night Suit","Printed Boys Pajama Set","Blue Boys Nightwear","Colorful Boys Night Suit"], "Kids Wear", 499, "Boys Wear");
addProducts("kids-boys-pant", ["Boys Casual Trousers","Green Cargo Pants for Boys","Everyday Boys Joggers"], "Kids Wear", 499, "Boys Wear");
catalog.push(...[
  {name:"Boys Pink Shirt and Jeans",category:"Kids Wear",subcategory:"Boys Wear",price:499,image:"Product images/kids-boys-shirt-1.jpg",keywords:"boys kids shirt jeans clothes"},
  {name:"Boys Maroon Casual Outfit",category:"Kids Wear",subcategory:"Boys Wear",price:599,image:"Product images/kids-boys-shirt2.jpg",keywords:"boys kids maroon shirt outfit"},
  {name:"Boys Printed Shirt Set",category:"Kids Wear",subcategory:"Boys Wear",price:699,image:"Product images/kids-boys-shirt3.jpg",keywords:"boys kids printed shirt clothes"}
].map(p=>({...p,rating:4.6,reviewCount:24})));
addProducts("kids toys", ["Soft Animal Plush Toy Set","Blue Robot Toy","Cute Elephant Plush Toy","Colorful Spinning Toy Set","Building Blocks Set","Kids Kitchen Play Set","Colorful Toy Playhouse"], "Kids Toys", 299);
addProducts("kids-boys products", ["Boys Cap and Sunglasses Set","Kids Strawberry Face Wash","Boys Colorful Sunglasses Set"], "Kids Products", 199, "Boys Products");
addProducts("kids-boys shoes", ["White Boys Sports Shoes","Black Boys Casual Sneakers","Colorful Boys Sneakers"], "Kids Products", 699, "Boys Products");
addProducts("kids-girls products", ["Colorful Girls Bangles Set","Pink Heart Girls Sandals","Girls Party Sandals","Colorful Girls Necklace Set","Blue Beaded Jewellery Set","Girls Earrings Collection","Girls Anklet Set"], "Kids Products", 199, "Girls Products");
addProducts("mens pants wear", ["Olive Green Casual Pants","Grey Formal Trousers","Light Grey Slim Fit Pants","Blue Denim Jeans","Men's Grey Casual Trousers"], "Men's Wear", 699);
addProducts("mens shirts wear", ["Light Blue Casual Shirt","Red and Blue Checked Shirt","White Printed Casual Shirt","Pink Men's Formal Shirt","Purple Slim Fit Shirt"], "Men's Wear", 599);
addProducts("mens traditional wear", ["White Traditional Kurta Set","Green Kurta and Dhoti Set","Pink Festive Sherwani Set"], "Men's Wear", 999);
addProducts("mens products", ["Brown Casual Sneakers","Blue Sports Shoes","Men's Sunglasses Set","Classic Black Eyeglasses","Black Men's Belt Set","Green Dial Wristwatch","Classic Men's Wristwatch"], "Men's Products", 299);
addProducts("girls traditional wear", ["Green Traditional Lehenga","Lavender Party Lehenga","Purple Embroidered Lehenga","Colorful Festive Lehenga Set"], "Women's Wear", 999);
addProducts("girls wear", ["Lavender Party Gown","Navy and Yellow Ethnic Outfit","Blue Silver Party Gown","Purple Anarkali Dress"], "Women's Wear", 799);
addProducts("women sarees", ["Emerald Green Saree","Cream and Red Border Saree","Maroon Embroidered Saree","Teal Green Party Saree","Mustard Yellow Festive Saree","Black and Gold Saree"], "Women's Wear", 999);
addProducts("women jewellery", ["Traditional Gold Tone Earrings","Colorful Beaded Necklace Set","Festive Jewellery Set","Gold Tone Necklace Set","Bridal Jewellery Collection","Colorful Necklace and Earring Set"], "Women's Jewellery", 299);
addProducts("women products", ["Makeup and Beauty Kit","Saffron Face Wash","Lavender Women's Sandals","Women's Casual Slippers","Colorful Hair Ties Set","Women's Hair Care Combo","Floral Hair Clip Set","Pearl Hair Clips Set","Rose Gold Women's Watch","Colorful Fashion Watches"], "Women's Products", 199);

const trendingNames = new Set(["Bluetooth Neckband Earphones","Wireless Over-Ear Headphones","True Wireless Earbuds","Digital Smart Watch","Green Floral Frock","Building Blocks Set","Blue Sports Shoes","Green Traditional Lehenga","Emerald Green Saree","Maroon Embroidered Saree","Traditional Gold Tone Earrings","Makeup and Beauty Kit"]);
catalog.forEach((p, i) => { p.trending = trendingNames.has(p.name); p.isNew = i >= catalog.length - 8; });
const keys = {cart:"novacart-cart", wishlist:"novacart-wishlist", user:"novacart-user", theme:"novacart-theme", reviews:"novacart-reviews", care:"novacart-care-messages", notRead:"novacart-notifications-read"};
const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
let cart = read(keys.cart, []), wishlist = read(keys.wishlist, []), user = window.NovaBackend?.configured ? null : read(keys.user, null);
let reviews = read(keys.reviews, {}), selectedCategory = "All", selectedSubcategory = "All", currentProduct = null;
const subcategoryOptions = {"Kids Products":["All","Boys Products","Girls Products"],"Kids Wear":["All","Girls Wear","Boys Wear"]};
const $ = id => document.getElementById(id);
const productGrid = $("productGrid"), trendingGrid = $("trendingGrid"), searchInput = $("searchInput"), categoryFilters = $("categoryFilters"), sortSelect = $("sortSelect"), cartDetails = $("cartDetails"), wishlistDetails = $("wishlistDetails"), productDialog = $("productDialog"), productDialogBody = $("productDialogBody"), accountDialog = $("accountDialog"), accountDialogBody = $("accountDialogBody"), notificationPanel = $("notificationPanel"), message = $("message");
const save = () => { localStorage.setItem(keys.cart, JSON.stringify(cart)); localStorage.setItem(keys.wishlist, JSON.stringify(wishlist)); if (window.NovaBackend?.configured && window.NovaBackend.user) { window.NovaBackend.saveCart(cart).catch(error => { message.textContent = `Could not save cart to your account: ${error.message}`; }); window.NovaBackend.saveWishlist(wishlist).catch(error => { message.textContent = `Could not save wishlist to your account: ${error.message}`; }); } };
const esc = value => String(value).replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
const money = value => `₹${Number(value).toLocaleString("en-IN")}`;
function stars(value) { const full=Math.round(value); return `<span class="stars" aria-label="${value} out of 5 stars">${"★".repeat(full)}${"☆".repeat(5-full)}</span>`; }
function updateCounts() { $("cartCount").textContent = cart.length; $("accountButton").textContent = user ? `Hi, ${user.name.split(" ")[0]}` : "Sign in"; }
function productCard(product, compact=false) {
  const wished = wishlist.includes(product.name);
  return `<article class="product ${compact?"compact-product":""}" data-open-product="${esc(product.name)}" tabindex="0" role="button" aria-label="View ${esc(product.name)} details">
    ${product.trending?'<span class="trending-badge">↗ Trending</span>':product.isNew?'<span class="new-badge">New</span>':''}
    <button class="wishlist-button ${wished?"is-wishlisted":""}" data-wishlist="${esc(product.name)}" aria-label="${wished?"Remove from":"Add to"} wishlist">${wished?"♥":"♡"}</button>
    <div class="product-picture"><img src="${esc(product.image)}" alt="${esc(product.name)}" loading="lazy" onerror="this.closest('.product-picture').classList.add('image-missing');this.hidden=true"></div>
    <div class="product-info"><div class="category">${esc(product.category)}${product.subcategory?` · ${esc(product.subcategory)}`:""}</div><h3>${esc(product.name)}</h3><div class="rating-line">${stars(product.rating)} <span>${product.rating} (${product.reviewCount})</span></div>
      <div class="price-row"><span class="price">${money(product.price)}</span><button class="add-button" data-add-cart="${esc(product.name)}">Add to cart</button></div>
    </div></article>`;
}
function showCategories() {
  const categories=["All",...new Set(catalog.map(p=>p.category))];
  let html=categories.map(c=>`<button class="category-button ${c===selectedCategory?"active":""}" data-category="${esc(c)}">${esc(c)}</button>`).join("");
  const subcats=subcategoryOptions[selectedCategory];
  if(subcats) html+=`<span class="subcategory-heading">${esc(selectedCategory)}:</span>`+subcats.map(s=>`<button class="category-button subcategory-button ${s===selectedSubcategory?"active":""}" data-subcategory="${esc(s)}">${esc(s)}</button>`).join("");
  categoryFilters.innerHTML=html;
}
function matchingProducts() {
  const term=searchInput.value.toLowerCase().trim();
  const found=catalog.filter(p=>`${p.name} ${p.category} ${p.subcategory||""} ${p.keywords}`.toLowerCase().includes(term)&& (selectedCategory==="All"||p.category===selectedCategory) && (!subcategoryOptions[selectedCategory]||selectedSubcategory==="All"||p.subcategory===selectedSubcategory));
  const sort=sortSelect.value;
  if(sort==="price-low") found.sort((a,b)=>a.price-b.price);
  else if(sort==="price-high") found.sort((a,b)=>b.price-a.price);
  else if(sort==="rating") found.sort((a,b)=>b.rating-a.rating);
  else found.sort((a,b)=>Number(b.trending)-Number(a.trending));
  return found;
}
function showProducts() {
  const found=matchingProducts();
  $("resultCount").textContent=`${found.length} product${found.length===1?"":"s"} found`;
  $("noResults").hidden=found.length>0;
  productGrid.innerHTML=found.map(p=>productCard(p)).join("");
  trendingGrid.innerHTML=catalog.filter(p=>p.trending).slice(0,8).map(p=>productCard(p,true)).join("");
}
function addToCart(name) { cart.push(name); save(); updateCounts(); message.textContent=`${name} added to your cart.`; }
function toggleWishlist(name) { wishlist=wishlist.includes(name)?wishlist.filter(n=>n!==name):[...wishlist,name]; save(); showProducts(); if(!wishlistDetails.hidden) renderWishlist(); }
function reviewsFor(name) { return [{name:"NovaCart shopper",rating:5,text:"Lovely quality and exactly what I expected.",image:"",date:"Recent"},...(reviews[name]||[])]; }
async function showProduct(name) {
  const p=catalog.find(item=>item.name===name); if(!p)return; currentProduct=name;
  if (window.NovaBackend?.configured) { try { reviews[name] = await window.NovaBackend.getReviews(name); } catch (error) { message.textContent = `Could not load reviews: ${error.message}`; } }
  const userReviews=reviews[name]||[];const ratedTotal=p.rating*p.reviewCount+userReviews.reduce((sum,r)=>sum+Number(r.rating||0),0);const displayCount=p.reviewCount+userReviews.length;const displayRating=Number((ratedTotal/displayCount).toFixed(1));const productReviews=reviewsFor(name);
  productDialogBody.innerHTML=`<div class="detail-layout"><div class="detail-image"><img src="${esc(p.image)}" alt="${esc(p.name)}" onerror="this.closest('.detail-image').classList.add('image-missing');this.hidden=true"></div><div class="detail-copy"><span class="eyebrow">${esc(p.category)}${p.subcategory?` · ${esc(p.subcategory)}`:""}</span><h2>${esc(p.name)}</h2><div class="detail-rating">${stars(displayRating)} <b>${displayRating}</b> <span>(${displayCount} ratings)</span></div><p class="detail-price">${money(p.price)}</p><p class="detail-description">A thoughtfully selected NovaCart pick. Add it to your cart or save it to your wishlist.</p><div class="detail-actions"><button class="primary-button" data-add-cart="${esc(p.name)}">Add to cart</button><button class="buy-button" data-buy-now="${esc(p.name)}">Buy now →</button><button class="wishlist-detail ${wishlist.includes(p.name)?"is-wishlisted":""}" data-wishlist="${esc(p.name)}" aria-label="Toggle wishlist">${wishlist.includes(p.name)?"♥ Saved":"♡ Wishlist"}</button></div><div class="review-summary"><h3>Customer reviews <span>${productReviews.length}</span></h3>${productReviews.map(r=>`<article class="review-card"><div>${stars(r.rating)} <strong>${esc(r.name)}</strong></div><p>${esc(r.text)}</p>${r.image?`<img class="review-photo" src="${r.image}" alt="Customer uploaded product photo">`:""}<small>${esc(r.date||"Customer review")}</small></article>`).join("")}</div><form id="reviewForm" class="review-form"><h3>Share your review</h3><label>Your rating<select name="rating" required><option value="5">★★★★★ — Loved it</option><option value="4">★★★★☆ — Very good</option><option value="3">★★★☆☆ — It’s okay</option><option value="2">★★☆☆☆ — Could be better</option><option value="1">★☆☆☆☆ — Not for me</option></select></label><label>Your review<textarea name="text" rows="3" maxlength="500" required placeholder="Tell others what you think"></textarea></label><label>Add a photo <input type="file" name="photo" accept="image/*"></label><button class="secondary-button" type="submit">Post review</button><p class="form-status">Sign in to save your review and photo for everyone to see. Photos must be under 5 MB.</p></form></div></div>`;
  productDialog.showModal();
}
function cartMarkup() {
  const counts={};cart.forEach(n=>counts[n]=(counts[n]||0)+1);let total=0;
  const html=Object.entries(counts).map(([name,qty])=>{const p=catalog.find(x=>x.name===name);if(!p)return"";total+=p.price*qty;return `<div class="cart-item"><img src="${esc(p.image)}" alt=""><div class="cart-item-info"><strong>${esc(name)}</strong><span>${money(p.price)} each</span><div class="quantity-controls"><button data-action="minus" data-name="${esc(name)}">−</button><span>Qty ${qty}</span><button data-action="plus" data-name="${esc(name)}">+</button></div></div><strong>${money(p.price*qty)}</strong><button class="remove-item" data-action="remove-cart" data-name="${esc(name)}">Remove</button></div>`;}).join("");
  return `<h2>Your cart</h2><div class="cart-list">${html||'<p class="empty-state">Your cart is empty. Explore the collection to add something.</p>'}</div><h3 class="cart-total">Total: ${money(total)}</h3><a class="checkout-link" href="checkout.html">Proceed to checkout →</a><button class="clear-cart-button" data-action="clear-cart">Clear cart</button>`;
}
function renderCart() { cartDetails.innerHTML=`<section class="panel-card"><button class="overlay-close" data-action="close" aria-label="Close">×</button>${cartMarkup()}</section>`;cartDetails.hidden=false; }
function renderWishlist() { const html=wishlist.map(n=>catalog.find(p=>p.name===n)).filter(Boolean).map(p=>`<div class="cart-item"><img src="${esc(p.image)}" alt=""><div class="cart-item-info"><strong>${esc(p.name)}</strong><span>${money(p.price)}</span></div><button class="add-button" data-add-cart="${esc(p.name)}">Add to cart</button><button class="remove-item" data-action="remove-wishlist" data-name="${esc(p.name)}">Remove</button></div>`).join("");wishlistDetails.innerHTML=`<section class="panel-card"><button class="overlay-close" data-action="close" aria-label="Close">×</button><h2>Your wishlist ♡</h2><div class="cart-list">${html||'<p class="empty-state">Nothing saved yet. Tap a heart on a product to add it here.</p>'}</div></section>`;wishlistDetails.hidden=false; }
function notificationItems() { return catalog.filter(p=>p.isNew).slice().reverse().map(p=>`<button class="notification-item" data-open-product="${esc(p.name)}"><span class="new-pill">NEW</span><span><strong>${esc(p.name)}</strong><small>New in ${esc(p.category)} · ${money(p.price)}</small></span></button>`).join(""); }
function showNotifications() { const items=notificationItems();notificationPanel.innerHTML=`<div class="notification-head"><strong>Notifications</strong><button data-action="close-notifications" aria-label="Close">×</button></div><p class="notification-note">New arrivals from the current catalog</p>${items}<small class="demo-note">Demo alerts are stored on this device.</small>`;notificationPanel.hidden=!notificationPanel.hidden;if(!notificationPanel.hidden){localStorage.setItem(keys.notRead,"true");$("notificationDot").hidden=true;} }
function openAccount() { accountDialogBody.innerHTML=`<span class="eyebrow">Your NovaCart</span><h2>${user?`Welcome back, ${esc(user.name)}`:"Sign in or create an account"}</h2><p class="form-status">${window.NovaBackend?.configured ? "Your account uses Supabase authentication." : "Backend is not connected yet. Configure Supabase to enable accounts shared across devices."}</p><div class="auth-tabs"><button class="auth-tab active" data-auth-mode="signin">Sign in</button><button class="auth-tab" data-auth-mode="signup">Sign up</button></div><form id="authForm" class="dialog-form"><label id="authNameLabel">Your name<input name="name" autocomplete="name" ${user?`value="${esc(user.name)}"`:""} required></label><label>Email<input name="email" type="email" autocomplete="email" ${user?`value="${esc(user.email)}"`:""} required></label><label>Password<input name="password" type="password" minlength="8" autocomplete="current-password" required></label><button class="primary-button" type="submit">Continue</button></form>${user?'<button class="secondary-button" data-action="signout">Sign out</button>':""}<p id="authStatus" class="form-status" aria-live="polite"></p>`;accountDialog.showModal(); const form=$("authForm"); form.dataset.mode="signin"; form.querySelector("[name=name]").required=false; $("authNameLabel").hidden=true; }
function resizeImage(file) { return new Promise((resolve,reject)=>{if(!file||!file.size)return resolve("");const img=new Image(),url=URL.createObjectURL(file);img.onload=()=>{const scale=Math.min(1,640/Math.max(img.width,img.height)),canvas=document.createElement("canvas");canvas.width=Math.round(img.width*scale);canvas.height=Math.round(img.height*scale);canvas.getContext("2d").drawImage(img,0,0,canvas.width,canvas.height);URL.revokeObjectURL(url);resolve(canvas.toDataURL("image/jpeg",.68));};img.onerror=()=>{URL.revokeObjectURL(url);reject(new Error("Could not read that image."));};img.src=url;}); }

categoryFilters.addEventListener("click",e=>{const c=e.target.closest("[data-category]"),s=e.target.closest("[data-subcategory]");if(c){selectedCategory=c.dataset.category;selectedSubcategory="All";showCategories();showProducts();}else if(s){selectedSubcategory=s.dataset.subcategory;showCategories();showProducts();}});
searchInput.addEventListener("input",()=>{selectedCategory="All";selectedSubcategory="All";showCategories();showProducts();});searchInput.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();$("productSection").scrollIntoView({behavior:"smooth",block:"start"});}});sortSelect.addEventListener("change",showProducts);
function handleProductClick(e) { const heart=e.target.closest("[data-wishlist]");if(heart){e.stopPropagation();toggleWishlist(heart.dataset.wishlist);if(productDialog.open&&currentProduct){productDialog.close();showProduct(currentProduct);}return;}const add=e.target.closest("[data-add-cart]");if(add){e.stopPropagation();addToCart(add.dataset.addCart);if(productDialog.open)productDialog.close();return;}const buy=e.target.closest("[data-buy-now]");if(buy){e.stopPropagation();addToCart(buy.dataset.buyNow);location.href="checkout.html";return;}const target=e.target.closest("[data-open-product]");if(target)showProduct(target.dataset.openProduct);}
productGrid.addEventListener("click",handleProductClick);trendingGrid.addEventListener("click",handleProductClick);productDialogBody.addEventListener("click",handleProductClick);wishlistDetails.addEventListener("click",handleProductClick);
[productGrid,trendingGrid].forEach(grid=>grid.addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&e.target.matches("[data-open-product]")){e.preventDefault();showProduct(e.target.dataset.openProduct);}}));
$("cartButton").addEventListener("click",renderCart);$("wishlistButton").addEventListener("click",renderWishlist);$("notificationButton").addEventListener("click",showNotifications);notificationPanel.addEventListener("click",e=>{const target=e.target.closest("[data-open-product]");if(target){showProduct(target.dataset.openProduct);notificationPanel.hidden=true;}});$("accountButton").addEventListener("click",openAccount);$("careButton").addEventListener("click",()=>$("careDialog").showModal());$("footerCare").addEventListener("click",()=>$("careDialog").showModal());
$("themeButton").addEventListener("click",()=>{const next=document.documentElement.dataset.theme==="dark"?"light":"dark";document.documentElement.dataset.theme=next;localStorage.setItem(keys.theme,next);$("themeButton").textContent=next==="dark"?"☀":"☾";$("themeButton").setAttribute("aria-label",next==="dark"?"Switch to light theme":"Switch to dark theme");});
const savedTheme=localStorage.getItem(keys.theme)||"light";document.documentElement.dataset.theme=savedTheme;$("themeButton").textContent=savedTheme==="dark"?"☀":"☾";$("themeButton").setAttribute("aria-label",savedTheme==="dark"?"Switch to light theme":"Switch to dark theme");
document.addEventListener("click",e=>{const close=e.target.closest("[data-close]");if(close){$(close.dataset.close).close();return;}const action=e.target.closest("[data-action]");if(action){const {action:act,name}=action.dataset;if(act==="close"){cartDetails.hidden=true;wishlistDetails.hidden=true;}else if(act==="close-notifications"){notificationPanel.hidden=true;}else if(act==="plus")cart.push(name);else if(act==="minus"){const i=cart.indexOf(name);if(i>-1)cart.splice(i,1);}else if(act==="remove-cart")cart=cart.filter(n=>n!==name);else if(act==="clear-cart")cart=[];else if(act==="remove-wishlist")wishlist=wishlist.filter(n=>n!==name);else if(act==="signout"){if(window.NovaBackend?.configured)window.NovaBackend.signOut().catch(error=>{message.textContent=error.message;});user=null;localStorage.removeItem(keys.user);accountDialog.close();}save();updateCounts();if(!cartDetails.hidden)renderCart();if(!wishlistDetails.hidden)renderWishlist();}const overlay=e.target.closest(".overlay");if(overlay&&e.target===overlay)overlay.hidden=true;});
document.addEventListener("submit",async e=>{
  if(e.target.id==="authForm"){
    e.preventDefault(); const fd=new FormData(e.target), status=$("authStatus"), name=String(fd.get("name")||"").trim(), email=String(fd.get("email")).trim(), password=String(fd.get("password"));
    status.textContent="Working…";
    try {
      if(window.NovaBackend?.configured){
        if(e.target.dataset.mode==="signup") { const result=await window.NovaBackend.signUp(name,email,password); status.textContent=result.session?"Account created and signed in.":"Account created. Check your email to confirm, then sign in."; if(result.session)setTimeout(()=>accountDialog.close(),900); }
        else { await window.NovaBackend.signIn(email,password); status.textContent="Signed in successfully."; setTimeout(()=>accountDialog.close(),500); }
      } else { user={name,email}; localStorage.setItem(keys.user,JSON.stringify(user)); updateCounts(); status.textContent="Demo profile saved on this device. Connect Supabase for shared accounts."; setTimeout(()=>accountDialog.close(),900); }
    } catch(error) { status.textContent=error.message||"Could not complete sign in."; }
  }
  if(e.target.id==="reviewForm"){
    e.preventDefault(); const fd=new FormData(e.target), text=String(fd.get("text")).trim(); if(!text)return; const submit=e.target.querySelector("button[type=submit]"); submit.disabled=true;
    try {
      const imageData=await resizeImage(fd.get("photo"));
      if(window.NovaBackend?.configured){
        const imageBlob=imageData?await (await fetch(imageData)).blob():null;
        await window.NovaBackend.saveReview(currentProduct,Number(fd.get("rating")),text,imageBlob);
        reviews[currentProduct]=await window.NovaBackend.getReviews(currentProduct);
      } else {
        reviews[currentProduct]=[...(reviews[currentProduct]||[]),{name:user?.name||"NovaCart shopper",rating:Number(fd.get("rating")),text,image:imageData,date:"Just now"}];
        localStorage.setItem(keys.reviews,JSON.stringify(reviews));
      }
      showProduct(currentProduct);
    } catch(error) { submit.disabled=false; e.target.querySelector(".form-status").textContent=error.message||"Could not post your review. Try again."; }
  }
  if(e.target.id==="careForm"){
    e.preventDefault(); const body=$("careMessage").value.trim(), status=$("careStatus");
    try { if(window.NovaBackend?.configured) { await window.NovaBackend.sendSupportMessage(body); status.textContent="Your message was sent to NovaCart support."; } else { const msgs=read(keys.care,[]); msgs.push({text:body,date:new Date().toLocaleString()}); localStorage.setItem(keys.care,JSON.stringify(msgs)); status.textContent="Demo message saved on this device. Connect Supabase to send it to support."; } e.target.reset(); }
    catch(error) { status.textContent=error.message||"Could not send your message."; }
  }
});document.addEventListener("click",e=>{
  const tab=e.target.closest("[data-auth-mode]"); if(!tab)return;
  const signup=tab.dataset.authMode==="signup"; document.querySelectorAll(".auth-tab").forEach(t=>t.classList.toggle("active",t===tab));
  const form=$("authForm"); form.dataset.mode=signup?"signup":"signin";
  const nameInput=form.querySelector('[name="name"]'); nameInput.required=signup; $("authNameLabel").hidden=!signup;
  form.querySelector('[name="password"]').autocomplete=signup?"new-password":"current-password";
  form.querySelector("button[type=submit]").textContent=signup?"Create account":"Sign in";
});$("notificationDot").hidden=localStorage.getItem(keys.notRead)==="true";showCategories();showProducts();updateCounts();
localStorage.setItem("novacart-catalog",JSON.stringify(catalog));
if(!window.NovaBackend?.configured) message.textContent="Supabase setup needed: follow BACKEND_SETUP.md, then add your project URL and publishable key.";
if(window.NovaBackend?.configured){
  let lastBackendUserId=null;
  async function loadAccount(authUser){if(lastBackendUserId && (!authUser || lastBackendUserId!==authUser.id)){cart=[];wishlist=[];localStorage.setItem(keys.cart,"[]");localStorage.setItem(keys.wishlist,"[]");} lastBackendUserId=authUser?.id||null;
    user=authUser?{id:authUser.id,name:window.NovaBackend.displayName(authUser),email:authUser.email}:null;
    if(user){
      try {
        const [remoteCart,remoteWishlist]=await Promise.all([window.NovaBackend.getCart(),window.NovaBackend.getWishlist()]);
        if(remoteCart.length) cart=remoteCart; else if(cart.length) await window.NovaBackend.saveCart(cart);
        if(remoteWishlist.length) wishlist=remoteWishlist; else if(wishlist.length) await window.NovaBackend.saveWishlist(wishlist);
        localStorage.setItem(keys.cart,JSON.stringify(cart)); localStorage.setItem(keys.wishlist,JSON.stringify(wishlist));
      } catch(error) { message.textContent=`Backend sync issue: ${error.message}`; }
    }
    updateCounts(); showProducts();
  }
  window.NovaBackend.onAuthChange(authUser=>{queueMicrotask(()=>loadAccount(authUser));});
  window.NovaBackend.getSessionUser().then(loadAccount).catch(error=>{message.textContent=`Could not restore account: ${error.message}`;});
}










