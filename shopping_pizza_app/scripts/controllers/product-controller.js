// it is a glue between view and model(mvc)
// i/o operation view layer
// data exchange b/w view and model

//   const rowdiv = document.getElementById("loaddata");
//   let pizzalen = pizza.length;
//   for (let index = 0; index < pizza.length; index++) {
//     const col = document.createElement('div');
//     col.classList.add('col-4');
//     col.innerHTML = `
//     <div class="card" style="width: 18rem;">
//   <img src="${pizza[index].url}" class="card-img-top" alt="...">
//   <div class="card-body">
//     <h5 class="card-title">${pizza[index].name}</h5>
//     <p class="card-text">${pizza[index].desc}</p>
//     <a href="#" class="btn btn-primary"> add to cart Rs.${(pizza[index].price)*15}</a>
//   </div>
// </div>
//     `;
//     rowdiv.appendChild(col);
//   }

import productoperations from "../services/product-operations.js";
async function loadpizza() {
  const pizza = await productoperations.loadproducts();
  console.log("pizza - ", pizza);
  for (let i of pizza) {
    preparecard(i);
  }
}
loadpizza();

function preparecard(pizza) {
  //creating a DOM
  const outputdiv = document.querySelector("#loaddata");
  const coldiv = document.createElement("div");
  coldiv.className = "col-4";
  const cardiv = document.createElement("div");
  cardiv.className = "card m-4";
  //cardiv.classList.add("m-4");
  cardiv.style = "width: 17rem";
  coldiv.appendChild(cardiv);
  const img = document.createElement("img");
  img.src = pizza.url;
  img.className = "card-img-top";
  cardiv.appendChild(img);
  const cardbody = document.createElement("div");
  cardbody.className = "card-body";
  cardiv.appendChild(cardbody);
  const h5 = document.createElement("h5");
  h5.className = "card-title";
  h5.innerText = pizza.name;
  const ptag = document.createElement("p");
  ptag.className = "card-text";
  ptag.innerText = pizza.desc;
  const button = document.createElement("button");
  button.setAttribute("product-id", pizza.id);
  button.addEventListener("click", addpizzatocart);
  button.innerText = "add to cart";
  button.className = "btn btn-primary";
  cardiv.appendChild(h5);
  cardiv.appendChild(ptag);
  cardiv.appendChild(button);
  outputdiv.appendChild(coldiv);
  return outputdiv;
}
function addpizzatocart() {
  const pizzaId = this.getAttribute("product-id");
  console.log(this);
  console.log("pizza clicked - ", pizzaId);
  const pizza = productoperations.searchproducts(pizzaId);
  //printcart();
  var p;
  pizza.isaddedincart = !pizza.isaddedincart;
  if (pizza.isaddedincart) {
    this.className = "btn btn-danger";
    this.innerText = "Remove from Cart";
    p = productoperations.getproductsincart();
  } else {
    this.className = "btn btn-primary";
    this.innerText = "add to cart";
    p = productoperations.removefromcart();
  }
  printcart();
}


function printcart() {
  const cartproducts = productoperations.getproductsincart();
  const basket = document.querySelector("#cart");
  basket.innerHTML = "";
  for (let product of cartproducts) {
    const li = document.createElement("li");
    li.innerText = `${product.name} : Rs. ${product.price}`;
    basket.appendChild(li);
  }
  gettotal();
}
// function printcart() {
//   const cartproducts = productoperations.getproductsincart();
//   const basket = document.querySelector("#cart");
//   const tbl = document.createElement("table");
//   const tblBody = document.createElement("tbody");

 
//   for (let i = 0; i < 2; i++) {

//     const row = document.createElement("tr");

//     for (let j = 0; j < 2; j++) {
      
//       const cell = document.createElement("td");
//       const cellText = document.createTextNode(`cell in row ${i}, column ${j}`);
//       cell.appendChild(cellText);
//       row.appendChild(cell);
//     }


//     tblBody.appendChild(row);
//   }

  
//   tbl.appendChild(tblBody);

//   document.body.appendChild(tbl);

//   tbl.setAttribute("border", "2");
//   basket.appendChild(tbl);
//   gettotal();
// }

function gettotal() {
  const cartproducts = productoperations.getproductsincart();
  if (cartproducts.length) {
    const basket = document.querySelector("#cart");
    var total = cartproducts.reduce((sum, e) => {
      console.log(sum);
      return sum + parseFloat(e.price);
    }, 0);
    const div = document.createElement("div");
    div.innerText = `subtotal : Rs. ${Math.round(total)}
                  total tax (18%) :Rs. ${Math.round(total * 0.18)}
                  payable amount : Rs. ${Math.round(total * 1.18)}`;
    basket.appendChild(div);
  }
}
// function printcart(){
//   const cart = productoperations.carts;
//   cart.forEach(h)
// }
// function h(item)
// {
// const outputdiv = document.getElementById('cart');
// const coldiv = document.createElement("div");
//   coldiv.className = "col-4";
//   const cardiv = document.createElement("div");
//   cardiv.className = "card";
//   //cardiv.classList.add("m-4");
//   cardiv.style = "width: 12rem";
//   coldiv.appendChild(cardiv);
//   const cardbody = document.createElement("div");
//   cardbody.className = "card-body";
//   cardiv.appendChild(cardbody);
//   const h5 = document.createElement("h5");
//   h5.className = "card-title";
//   h5.innerText = item.name;
//   cardiv.appendChild(h5);
//   outputdiv.appendChild(coldiv);
// }
/*window.addEventListener(
    'load',bindevents()
)
function bindevents(){
    document.getElementById('clickme').addEventListener(
        'click',
        ()=>{
            alert('hello')
        }
    )    
}*/
