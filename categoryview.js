const selectedcategory = localStorage.getItem("selectedcategory");
console.log("Retrieved category:", selectedcategory);
const heading = document.querySelector(".heading");
heading.innerHTML+=`<h1>Explore Our ${selectedcategory} Recipies`;

async function fetchrec() {
    const cards = document.querySelector(".cards");

    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedcategory}`);
    const response = await data.json();
    console.log(response);
    let arraymeal = [];
    response.meals.slice(0,).forEach(meal => {

        console.log(meal.idMeal)
        arraymeal.push(meal.idMeal);
        // console.log(arraymeal);


    });
    localStorage.setItem("arraymeal", JSON.stringify(arraymeal));
    const arra = JSON.parse(localStorage.getItem("arraymeal"));
    console.log(arra);
    arra.forEach(id => {
        (async () => {
            const data1 = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            const response1 = await data1.json();
            console.log("Meal details:", response1);
              response1.meals.slice(0,).forEach(meal => {
                cards.innerHTML += `
            <div class="card">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <div class="tags">
                    <p>${meal.strArea}</p>
                    <p>${meal.strCategory}</p>
                </div>
                <h2>${meal.strMeal}</h2>
                <p class="ing"><span style="font-weight:800">Ingredients:</span> 
                    ${meal.strIngredient1 || ""}, 
                    ${meal.strIngredient2 || ""}, 
                    ${meal.strIngredient3 || ""}, 
                    ${meal.strIngredient4 || ""}...
                </p>
                <p class="description">${meal.strInstructions}</p>    
                <div class="btns">   

                <a href = "mealdes.html" onclick="selected('${meal.idMeal}')">    <button >View Recipe ↗</button></a>
                    <button onclick="window.open('https://www.youtube.com/watch?v=${meal.strYoutube?.split('v=')[1]}','_blank')">
                        <i class="fa fa-play"></i> Watch Video
                    </button>
                </div>
            </div>`;
              });
        })();
    });
}
fetchrec();
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