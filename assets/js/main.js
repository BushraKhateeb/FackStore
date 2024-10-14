const getCategories= async ()=>{
    const {data}= await axios.get('https://dummyjson.com/products/category-list');
    console.log(data);
    return data
}
 
const displayCategories= async ()=>{
    const category=await getCategories();
    const result= category.map((cat)=>{
        return `<div class="Category">
        <h2>${cat}</h2>
        <a href='./categoryDetails.html?category=${cat}'>details</a>
        </div>`;
    }).join(' ');
    document.querySelector(".catogereis .row").innerHTML=result;
}

const getproducts= async()=>{
    const {data}= await axios.get(`https://dummyjson.com/products`)
    return data
}
const displayproducts= async()=>{
    const products= await getproducts();
    const result =products.products.map((products)=>{
        return`<div class="product">
        <img src="${products.thumbnail}" alt="${products.description}"/>
        <h3>${products.title}</h3>
        <span>${products.price}</span>
        </div>`
    }).join(' ');
    document.querySelector('.products .row').innerHTML=result;
}

displayCategories();
displayproducts();