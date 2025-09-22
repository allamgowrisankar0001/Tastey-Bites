const selectedMeal = localStorage.getItem("selectedMeal");
console.log("Retrieved meal:", selectedMeal);

async function des() {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${selectedMeal}`);
    const response = await data.json();
    console.log(response);

    const meal = response.meals[0];
    const main = document.getElementById("main");

    // Generate ingredients dynamically
    let ingredientsHTML = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== "") {
            ingredientsHTML += `
                <div class="boxdiv">
                    <p><b>${ingredient}</b></p>
                    <p>${measure}</p>
                </div>
            `;
        }
    }

    // Insert into main
    main.innerHTML = `
    <div>
    <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="width:300px; border-radius:10px; display:block; margin:10px auto;">
        <p><b>Category:</b> ${meal.strCategory}</p>
        <p><b>Area:</b> ${meal.strArea}</p>
    </div>
        
        <h2>Ingredients</h2>
        <div class="ingredients-grid">
            ${ingredientsHTML}
        </div>

        <h2>Instructions</h2>
        <p style="white-space: pre-line;">${meal.strInstructions}</p>

        <h2>References</h2>
        <p><a href="${meal.strSource}" target="_blank">Original Source</a></p>
        <p><a href="${meal.strYoutube}" target="_blank">Watch on YouTube</a></p>
    `;
}

des();
