async function fetchrec() {
    const cards = document.querySelector(".cards");
        cards.innerHTML = ""; // clear old cards

    for(let i = 0; i < 6; i++){

        const data = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
        const response = await data.json();
        // console.log(response);
        let meal = response.meals[0];
       
        cards.innerHTML +=`
        <div class="card">
        <img src="${response.meals[0].strMealThumb}" alt="Pasta">
        <div class="tags">
        <p>${meal.strArea}</p>
        <p>${meal.strCategory}</p>
        </div>
        <h2>${response.meals[0].strMeal}</h2>
        <p class="ing"><span style="font-weight:800">Ingredients:</span> ${meal.strIngredient1},${meal.strIngredient2},${meal.strIngredient3},${meal.strIngredient4}...</p>
        <p class="description">${meal.strInstructions}</p>    
        <div class="btns">    
                <a href = "mealdes.html" onclick="selected('${meal.idMeal}')">    <button >View Recipe ↗</button></a>
        <button onclick="window.open('https://www.youtube.com/watch?v=wuZffe60q4M','_blank')"><i class="fa fa-play"></i>Watch Video</button></div>

        </div>`
    }
    
}


fetchrec();
async function fetchcat(){
    const Category = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    const CategoryRes = await Category.json();
    console.log(CategoryRes);
    CategoryRes.categories.forEach(category => {
        
                console.log(category.strCategory); // Category name
        const container = document.querySelector(".fcategories");
        const categoriesdiv = document.createElement('div');
        categoriesdiv.className = "categoriesdiv";
        categoriesdiv.innerHTML=`
        <img src="${category.strCategoryThumb}">
        <p>${category.strCategory}</p>`;
        container.appendChild(categoriesdiv);

    });
}
fetchcat();
function selected(meal){
    localStorage.setItem("selectedMeal", meal); // use a string key
    const getit = localStorage.getItem("selectedMeal");
    console.log("Saved meal:", getit);
}
document.querySelector(".menu-icon").addEventListener("click", () => {
    if(document.querySelector(".nav-links").style.display === "flex"){
        document.querySelector(".nav-links").style.display = "none";
        document.querySelector(".menu-icon").innerHTML = `<i class="fa-solid fa-bars"></i>`;
    }else{
        document.querySelector(".nav-links").style.display = "flex";
        document.querySelector(".menu-icon").innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    }
   
});
