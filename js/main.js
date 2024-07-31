let defaultImage = "https://www.cahrservices.com/wp-content/uploads/2022/10/placeholder-wire-image-white-768x576.jpg"
let currentCountry = "us"
let currentCategory = "general"

async function getNewsApi(countryCode, categoryCode){
    let response = await fetch (`https://newsapi.org/v2/top-headlines?country=${countryCode}&category=${categoryCode}&apiKey=624e9a6a3bf046e19e725d41ccb0f1e8`)
    let data = await response.json();
    // console.log(data.articles);
    displayNews(data.articles)
}

getNewsApi(currentCountry,currentCategory)


function displayNews(newsArr){
    let cartona = "";
    for (var i=0 ; i<newsArr.length ; i++ ){
        cartona += `
        <div class="col-lg-3 col-md-4 col-sm-6">
        <div class="card">
         <img src="${newsArr[i].urlToImage || defaultImage}" class="w-100">
    <div class="card-body">
    <h5 class="card-title">${newsArr[i].title}</h5>
   
    <h5 class="card-title">${newsArr[i].title?.split(" ").slice(0, 10).join(" ")}</h5>
    <a href="${newsArr[i].url}" class="btn btn-primary">Read More</a>
  </div>
</div>
        </div>
        `
    }
    document.getElementById("demo").innerHTML = cartona ;
}



let countryLinks = document.querySelectorAll("nav ul li a");
for (let i=0 ; i<countryLinks.length ; i++){
    countryLinks[i].addEventListener("click",function(){


        let activeCountry = document.querySelector(" nav ul li a.active");
        activeCountry.classList.remove("active");
        countryLinks[i].classList.add("active");
        currentCountry = countryLinks[i].dataset.country;
        getNewsApi(currentCountry,currentCategory);
    })
}

let categoryLinks = document.querySelectorAll(".offcanvas  ul li a");
for (let i=0 ; i<categoryLinks.length ;i++){
    categoryLinks[i].addEventListener("click",function(){
        let activeCategory = document.querySelector(".offcanvas-body ul li a.active");
        activeCategory.classList.remove("active");
        categoryLinks[i].classList.add("active");
        console.log("ahmed");
        currentCategory = categoryLinks[i].dataset.category;
        getNewsApi(currentCountry,currentCategory);
    })
}