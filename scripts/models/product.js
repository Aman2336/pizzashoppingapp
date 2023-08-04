//blueprint , structure, properties of pizza
class product{
    constructor(id,name,desc,price,url){
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.price = price*80;
        this.url = url;
        this.isaddedincart = false;
    }
}
export default product;
