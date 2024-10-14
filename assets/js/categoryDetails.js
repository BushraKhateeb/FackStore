const getproducts= async ()=>{
    const parms = new URLSearchParams(window.location.search);
    const catogory= parms.get('category');
    const {data} = await axios.get(`https://dummyjson.com/products/category/${catogory}`);
    console.log(catogory);
    console.log(data);
    return data;

}

const displayproducts= async()=>{
    const data= await getproducts();
    const result =data.products.map((products)=>{
        return`<div class="product">
        <img src="${products.thumbnail}" alt="${products.description}"/>
        <h3>${products.title}</h3>
        <span>${products.price}</span>
        </div>`
    }).join(' ');
    document.querySelector('.products .row').innerHTML=result;
}
getproducts();
displayproducts();