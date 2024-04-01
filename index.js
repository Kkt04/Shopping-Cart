var productslist = [];
var cart = [];

async function logProducts() {
  const response = await fetch(
    'https://content.newtonschool.co/v1/pr/65f821a4f6a42e24cda7e50c/productsData'
  )
  productslist = await response.json();
  displayProducts();
  addToCart();
}

logProducts()

function displayProducts() {
  let productcontainer = document.querySelector('.productscontainer')

  productslist.forEach((e, index) => {
    let productDiv = document.createElement('div')
    productDiv.classList.add('product')

    productDiv.innerHTML = `
      <img class='pimage' width="250px" height="350px" src="${e.image}" alt="">
      <p class='ptitle'>${e.title}</p>
      <div class="priceandaddtocart">
        <p class="pprice">${e.price} DH</p>
        <button class="addtocart" data-productid="${e.id}">
          
        </button>
      </div>`

    productcontainer.appendChild(productDiv)
  })
}

let header = document.querySelector('header');
let sticky = header.offsetTop;
window.onscroll = function () {
  myFunction()
}

function myFunction() {
  console.log('working')
  if (window.scrollY >= sticky) {
    header.style.position = 'sticky'
    header.style.top = 0
  }
}

let cartui = document.querySelector('.cartui')
let overlay = document.querySelector('.overlay')
let carticon = document.querySelector('.carticon')

carticon.onclick = () => {
  cartui.classList.add('cartopened')
}
document.querySelector('.closecart').onclick = () => {
  cartui.classList.remove('cartopened')
}
function remove(){
  const removeFromCart = document.querySelectorAll('.delete');
  removeFromCart.forEach((button) => {
    
    button.addEventListener(('click'), (event) => {
      
      const productId = button.getAttribute('data-productid');
      const productDetails = productslist.find((p) => p.id == productId);
      cart.pop(productDetails);
      console.log(cart);
      const closestDiv = event.target.closest('div');
      pccontainer.removeChild(closestDiv);
      let count = Number(carticon.getAttribute('items'));
      count -= 1;
      carticon.setAttribute('items', count);
      
    })
  })
}
let pccontainer = document.querySelector('.pccontainer');

function addToCart() {
  const addToCart = document.querySelectorAll('.addtocart');
  
  pccontainer.innerHTML = ``;
  addToCart.forEach((button) => {
    button.addEventListener(('click'), () => {
      const productId = button.getAttribute('data-productid');
      const productDetails = productslist.find((p) => p.id == productId);
     
      if (!cart.find((item) => item.id == productId)){
        var count = Number(carticon.getAttribute('items'));
        count += 1
        carticon.setAttribute('items', count);
        cart.push(productDetails);
        let html = `<div class = "cartproduct">
                  <div class="pnp">
                    <img class = "img" src=${productDetails.image}>
                    <div class = "nameandprice">
                      <p>${productDetails.title}</p>
                      <p>${productDetails.price}</p>
                      
                      <div class="plusminus">
                        <p>Qty:</p>
                        <button class = "addqtt" productid=${productDetails.id}>+</button>
                        <p class="qtt">1</p>
                        <button class = "minusqtt" productid=${productDetails.id}>-</button>
                      </div>
                    </div>
                    
                    
                  </div>
                  <button class = "delete" productid=${productDetails.id}>X</button>
                  
                  </div>`;
        pccontainer.innerHTML += html;
        
        remove();
      }
    })
  })
  document.querySelector('.pccontainer').addEventListener('click', function(event) {
    if (event.target.matches('.addqtt')) {
        var cartProduct = event.target.closest('.cartproduct');
        var qtyD = cartProduct.querySelector('.qtt');
        var quantity = Number(qtyD.innerText);
        quantity += 1;
        qtyD.innerText = quantity;
        var count = Number(carticon.getAttribute('items'));
        count += 1;
        carticon.setAttribute('items', count);
    } else if (event.target.matches('.minusqtt')) {
        var cartProduct = event.target.closest('.cartproduct');
        var qtyD = cartProduct.querySelector('.qtt');
        var quantity = Number(qtyD.innerText);
        if (quantity > 1) {
            quantity -= 1;
            qtyD.innerText = quantity;
            var count = Number(carticon.getAttribute('items'));
            count -= 1;
            carticon.setAttribute('items', count);
        }
    }
});
}