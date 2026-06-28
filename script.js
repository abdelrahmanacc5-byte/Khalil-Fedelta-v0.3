/*=========================================
KHALIL FEDELTÀ
=========================================*/

/*========== PRODUCTS ==========*/

const products = [

{
id:1,
name:"Candeggina ACE",
category:"Detergenti",
price:4.99,
stock:15,
badge:"HOT",
featured:true,
image:"images/ace.jpg"
},

{
id:2,
name:"Chanteclair Sgrassatore",
category:"Detergenti",
price:5.90,
stock:20,
badge:"NEW",
featured:true,
image:"images/chanteclair.jpg"
},

{
id:3,
name:"Dash Pods",
category:"Detergenti",
price:9.99,
stock:18,
badge:"SALE",
featured:true,
image:"images/dashpods.jpg"
},

{
id:4,
name:"Scopa Professionale",
category:"Accessori",
price:12.90,
stock:10,
badge:"",
featured:false,
image:"images/scopa.jpg"
},

{
id:5,
name:"Mop Professionale",
category:"Accessori",
price:14.90,
stock:12,
badge:"",
featured:false,
image:"images/mop.jpg"
},

{
id:6,
name:"Aspiraliquidi",
category:"Macchine",
price:299.00,
stock:3,
badge:"TOP",
featured:true,
image:"images/macchina.jpg"
}

];

/*========== VARIABLES ==========*/

let cart = [];

let currentCategory = "all";

/*========== ELEMENTS ==========*/

const productsContainer = document.getElementById("productsContainer");

const featuredSlider = document.getElementById("featuredSlider");

const searchInput = document.getElementById("searchInput");

const cartItems = document.getElementById("cartItems");

const cartTotal = document.getElementById("cartTotal");

const cartCount = document.getElementById("cartCount");
/*=========================================
RENDER PRODUCTS
=========================================*/

function renderProducts(){

if(!productsContainer) return;

productsContainer.innerHTML="";

const keyword = searchInput ? searchInput.value.toLowerCase() : "";

const filtered = products.filter(product=>{

const matchCategory = currentCategory==="all" || product.category===currentCategory;

const matchSearch = product.name.toLowerCase().includes(keyword);

return matchCategory && matchSearch;

});

filtered.forEach(product=>{

productsContainer.innerHTML += `

<div class="product-card">

${product.badge ? `<div class="badge">${product.badge}</div>` : ""}

<img src="${product.image}" alt="${product.name}">

<h3>${product.name}</h3>

<p>${product.category}</p>

<div class="stars">
${"⭐".repeat(5)}
</div>

<h2>€ ${product.price.toFixed(2)}</h2>

<p class="stock">

Disponibili: ${product.stock}

</p>

<button

class="buy-btn"

onclick="addToCart(${product.id})">

<i class="fa-solid fa-cart-shopping"></i>

Aggiungi al Carrello

</button>

</div>

`;

});

}
/*=========================================
FEATURED PRODUCTS
=========================================*/

function renderFeatured(){

if(!featuredSlider) return;

featuredSlider.innerHTML="";

const featured = products.filter(product => product.featured);

featured.forEach(product=>{

featuredSlider.innerHTML += `

<div class="featured-card">

<img src="${product.image}" alt="${product.name}">

<h3>${product.name}</h3>

<p>${product.category}</p>

<h2>€ ${product.price.toFixed(2)}</h2>

</div>

`;

});

}

/*=========================================
AUTO SLIDER
=========================================*/

let sliderPosition = 0;

setInterval(()=>{

if(!featuredSlider) return;

sliderPosition += 305;

if(sliderPosition >= featuredSlider.scrollWidth){

sliderPosition = 0;

}

featuredSlider.scrollTo({

left:sliderPosition,

behavior:"smooth"

});

},3000);
/*=========================================
START WEBSITE
=========================================*/

renderProducts();

renderFeatured();
/*=========================================
SEARCH
=========================================*/

if(searchInput){

searchInput.addEventListener("input",()=>{

renderProducts();

});

}

/*=========================================
FILTERS
=========================================*/

const filterButtons=document.querySelectorAll(".filter-btn");

filterButtons.forEach(button=>{

button.addEventListener("click",()=>{

filterButtons.forEach(btn=>btn.classList.remove("active"));

button.classList.add("active");

currentCategory=button.dataset.category;

renderProducts();

});

});
/*=========================================
ADD TO CART
=========================================*/

function addToCart(id){

const product = products.find(p => p.id === id);

if(!product) return;

if(product.stock <= 0){

alert("Prodotto esaurito!");

return;

}

const item = cart.find(i => i.id === id);

if(item){

item.quantity++;

}else{

cart.push({

id:product.id,

name:product.name,

price:product.price,

image:product.image,

quantity:1

});

}

product.stock--;

renderProducts();

updateCart();

}
/*=========================================
UPDATE CART
=========================================*/

function updateCart(){

if(!cartItems) return;

cartItems.innerHTML="";

let total=0;

let totalQuantity=0;

if(cart.length===0){

cartItems.innerHTML="<p class='empty-cart'>Il carrello è vuoto.</p>";

cartTotal.innerText="€0.00";

cartCount.innerText="0";

return;

}

cart.forEach(item=>{

total += item.price * item.quantity;

totalQuantity += item.quantity;

cartItems.innerHTML += `

<div class="cart-item">

<img src="${item.image}" alt="${item.name}">

<div class="cart-info">

<h4>${item.name}</h4>

<p>€ ${item.price.toFixed(2)}</p>

<div class="qty-box">

<button onclick="decreaseQuantity(${item.id})">-</button>

<span>${item.quantity}</span>

<button onclick="increaseQuantity(${item.id})">+</button>

</div>

</div>

<button class="delete-btn" onclick="removeItem(${item.id})">

<i class="fa-solid fa-trash"></i>

</button>

</div>

`;

});

cartTotal.innerText="€"+total.toFixed(2);

cartCount.innerText=totalQuantity;

}
/*=========================================
QUANTITY
=========================================*/

function increaseQuantity(id){

const item = cart.find(i=>i.id===id);
const product = products.find(p=>p.id===id);

if(!item || !product) return;

if(product.stock<=0){

alert("Prodotto esaurito!");

return;

}

item.quantity++;

product.stock--;

renderProducts();

updateCart();

}

function decreaseQuantity(id){

const item = cart.find(i=>i.id===id);
const product = products.find(p=>p.id===id);

if(!item || !product) return;

item.quantity--;

product.stock++;

if(item.quantity<=0){

cart = cart.filter(i=>i.id!==id);

}

renderProducts();

updateCart();

}

/*=========================================
REMOVE ITEM
=========================================*/

function removeItem(id){

const item = cart.find(i=>i.id===id);
const product = products.find(p=>p.id===id);

if(item && product){

product.stock += item.quantity;

}

cart = cart.filter(i=>i.id!==id);

renderProducts();

updateCart();

}
/*=========================================
WHATSAPP ORDER
=========================================*/

function sendOrderWhatsApp(){

if(cart.length===0){

alert("Il carrello è vuoto!");

return;

}

let text = `🛒 *NUOVO ORDINE*%0A%0A`;

let total = 0;

cart.forEach(item=>{

const subtotal = item.price * item.quantity;

total += subtotal;

text += `• ${item.name}%0A`;
text += `Quantità: ${item.quantity}%0A`;
text += `Prezzo: €${subtotal.toFixed(2)}%0A%0A`;

});

text += `💰 Totale: €${total.toFixed(2)}%0A%0A`;

text += `Nome:%0A`;
text += `Telefono:%0A`;
text += `Indirizzo:%0A`;
text += `Note:%0A`;

window.open(

"https://wa.me/393934020090?text="+text,

"_blank"

);

}
