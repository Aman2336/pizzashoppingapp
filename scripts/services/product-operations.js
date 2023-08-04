// contains the logic for fetching or crud operations
// it talks to network layer to bring the JSON and convert JSON into objects or vice-versa
import makenwcall from "./api-client.js";
import product from "../models/product.js";
const data = makenwcall();

const productoperations = {
  products: [],
  carts: [],
  searchproducts(pizzaid) {
    
    const p = this.products.find(current =>current.id==pizzaid);
    console.log("product found",p);
    //p.isaddedincart = true;
    return p;
    //p.isaddedincart = true;
  },
  getproductsincart(){
    const productincart = this.products.filter(product => product.isaddedincart);
    //productoperations.carts = productincart;
    return productincart;
  },
  // addtocart(product) {
  //   this.carts.push(product);
  // },
  removefromcart() {
    const p =  this.products.filter((current) => current.isaddedincart==false);
    console.log("product removed  ");
     return p;
    },
  async loadproducts() {
    const pizzas = await makenwcall();
    const pizzaArray = pizzas["Vegetarian"];
    const productArray = pizzaArray.map((pizza) => {
      const currentpizza = new product(
        pizza.id,
        pizza.name,
        pizza.menu_description,
        pizza.price,
        pizza.assets.product_details_page[0].url
      );
      return currentpizza;
    });
    console.log(productArray);
    this.products = productArray;
    return productArray;
  },
 
};

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
}
*/
export default productoperations;
