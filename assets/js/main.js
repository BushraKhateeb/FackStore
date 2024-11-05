
const getCategories= async ()=>{
    const {data}= await axios.get('https://dummyjson.com/products/category-list');
    return data

}
const displayCategories= async ()=>{
    const loader=document.querySelector('.loader-container');
    loader.classList.add('active');
    try{
    const category=await getCategories();
    const result= category.map((cat)=>{
        return `<div class="Category">
        <h2>${cat}</h2>
        <a class="a"  href='./categoryDetails.html?category=${cat}'>details</a>
        </div>`;
    }).join(' ');
    document.querySelector(".catogereis .row").innerHTML=result;
}catch(error){
    document.querySelector(".catogereis .row").innerHTML=`<p>error loading</p>`;
}finally{
    loader.classList.remove('active');
}
}


const getproducts= async(page)=>{
    const skip =( page - 1 ) * 20;
    const {data}= await axios.get(`https://dummyjson.com/products?limit=30&skip=${skip}`)
    return data
}
const displayproducts= async(page=1)=>{
    const loader=document.querySelector('.loader-container');
    loader.classList.add('active');
    try{
    const products= await getproducts(page);
    const noOfPage=Math.ceil(products.total/20);
    const result =products.products.map((products)=>{
        return`<div class="product">
        <img src="${products.thumbnail}" alt="${products.description}" class='images'/>
        <h3>${products.title}</h3>
        <span>${products.price}</span>
        </div>`
    }).join(' ');
    document.querySelector('.products .row').innerHTML=result;
    let pagenationLink = ``;
    
    if( page==1){
        pagenationLink= `<li class="page-item"><button class="page-link" >&laquo;</button></li> `;
    }
    else{
        pagenationLink = `<li class="page-item"><button onclick=displayproducts('${page-1}') class="page-link" >&laquo;</button></li> `;
    }
    for(let i=1;i<=noOfPage;i++) {
        pagenationLink+=`<li class="page-item ${i==page?'active':''}"><button onclick=displayproducts('${i}') class="page-link" >${i}</button></li>`
    }
    if(page==noOfPage){
        pagenationLink+=`<li class="page-item"><button  class="page-link" >&raquo;</button></li>`
    }else{
        pagenationLink+=`<li class="page-item"><button onclick=displayproducts('${parseInt(page)+1}') class="page-link" >&raquo;</button></li>`
    }

    document.querySelector(".pagination").innerHTML=pagenationLink;
    modal();



}catch(error){
    document.querySelector(".catogereis .row").innerHTML=`<p>error loading</p>`;
}finally{
   
    loader.classList.remove('active');
}
}

displayCategories();
displayproducts();
window.onscroll=function(){
    const nav=document.querySelector(".header");
    const category=document.querySelector(".catogereis");
    const otherpage=document.querySelector(".products");
     if(window.scrollY>category.scrollTop){
        nav.classList.add("scrollnav");
     }
     if(window.scrollY>otherpage.scrollTop){
        nav.classList.add("scrollnav");
     }
     else{
        nav.classList.remove("scrollnav");
     }
}

const countdown=()=>{
    const date= new Date("2026-08-10T00:00:00");
    const now=new Date();
    const diff=date-now;
    const day=Math.floor(diff/(1000*60*60*24));
    const hour=Math.floor((diff%(1000*60*60*24))/(1000*60*60));
    const minute=Math.floor((diff%(1000*60*60))/(1000*60));
    const second=Math.floor((diff%(1000*60))/1000);

    document.querySelector(".days").textContent=day;
    document.querySelector(".hours").textContent=hour;
    document.querySelector(".minutes").textContent=minute;
    document.querySelector(".seconds").textContent=second;
}
setInterval(() => {
    countdown();   
}, 1000);


function modal (){
    const modal=document.querySelector(".modal");
    const closeBtn=document.querySelector(".close-btn");
    const leftBtn=document.querySelector(".left-btn");
    const rightBtn=document.querySelector(".right-btn");
    const imeges=Array.from(document.querySelectorAll(".images"));

    let currentIndex=0;

    imeges.forEach(function(img){
        img.addEventListener('click',function(e){
            modal.classList.remove("d-none");
            modal.querySelector("img").setAttribute("src",e.target.src);

            const currentImg =e.target;
             currentIndex=imeges.indexOf(currentImg);

        })

    })
    closeBtn.addEventListener('click',function(){
        modal.classList.add("d-none");
    })

    rightBtn.addEventListener('click',function(){
        currentIndex++;
        if(currentIndex>=imeges.length){
            currentIndex=0;
        }
        const src = imeges[currentIndex].src;
        modal.querySelector("img").setAttribute("src",src);
    });

    leftBtn.addEventListener('click',function(){
        currentIndex--;
        if(currentIndex<=0){
            currentIndex=imeges.length-1;
        }
        const src = imeges[currentIndex].src;
        modal.querySelector('img').setAttribute("src",src);
    });

    document.addEventListener("keydown",function(e){
        console.log(e.code);
        if(e.code == 'ArrowRight'){
            currentIndex++;
            if(currentIndex >= imeges.length){
                currentIndex=0;
            }
            const src = imeges[currentIndex].src;
            modal.querySelector("img").setAttribute("src",src);
        }
    });

    document.addEventListener("keydown",function(e){
        if(e.code == 'ArrowLeft'){
            currentIndex--;
            if(currentIndex <= 0){
                currentIndex=imeges.length-1;
            }
            const src = imeges[currentIndex].src;
            modal.querySelector("img").setAttribute("src",src);
        }
    });
    document.addEventListener('keydown',function(e){
        if (e.code=='Escape'){
            modal.classList.add("d-none");
        }
    });


}   



