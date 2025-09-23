async function fetchrec() {
    const cards = document.querySelector(".cards");
    const input = document.getElementById("input1").value.trim();
    const description = document.getElementById("norecipes");
    description.style.display="none";

    // clear old cards before new search
    cards.innerHTML = "";

    // fetch data
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`);
    const response = await data.json();
    console.log(response);
    if (!response.meals) {
        // no meals found
        cards.innerHTML = `<p style="text-align:center; color:gray;">No recipes found for "${input}"</p>`;
        return;
    }

    response.meals.slice(0, ).forEach(meal => {
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
}
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