async function fetchcat() {
    const Category = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    const CategoryRes = await Category.json();
    console.log(CategoryRes);
    CategoryRes.categories.forEach(category => {

        console.log(category.strCategory); // Category name
        const container = document.querySelector(".fcategories");
        const categoriesdiv = document.createElement('div');
        categoriesdiv.className = "categoriesdiv";
        categoriesdiv.innerHTML = `
        <img src="${category.strCategoryThumb}">
        <p class="pp">${category.strCategory}</p>
        <p class="descrip">${category.strCategoryDescription}</p>
        <a href="categoryview.html" class="explore" onclick="selected('${category.strCategory}')"><button>Explore Recipes →</button></a>`;
        container.appendChild(categoriesdiv);
        const ppElement = categoriesdiv.querySelector(".pp");

        // List of Non-Veg IDs
        const nonVegIds = ["1", "2", "4", "7", "8", "14"];

        if (nonVegIds.includes(category.idCategory)) {
            ppElement.style.backgroundColor = "white"; // Non-Veg highlight
            ppElement.style.color = "red";         // For visibility
            ppElement.innerHTML = `🥩${category.strCategory}`; // chicken leg icon
            ppElement.style.border = "1px solid red";

        } else {
            ppElement.style.backgroundColor = "white"; // Veg highlight
            ppElement.style.color = "green";
            ppElement.innerHTML = `🌱${category.strCategory}`; // chicken leg icon
            ppElement.style.border = "1px solid green";


        }

    });
}
fetchcat();
function selected(category){
    localStorage.setItem("selectedcategory", category); // use a string key
    const getcate = localStorage.getItem("selectedcategory");
    console.log("Saved category:", getcate);
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