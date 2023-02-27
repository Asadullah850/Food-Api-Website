const loadData = (searchText) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => getData(data.meals))
}
const getData  = e => {
    console.log(e);
    const mealsContainer =document.getElementById('meals-container'); 
    mealsContainer.innerHTML = '';
    e.forEach(element => {

        // console.log(element);
        const mealDiv = document.createElement('div')
        mealDiv.classList.add('crd');
        mealDiv.innerHTML = `
        <!-- card 1 -->
                <div class="card w-96 bg-base-100 shadow-xl">
                    <figure><img src="${element.strMealThumb}" /></figure>
                    <div class="card-body">
                      <h2 class="card-title">
                        ${element.strMeal}
                        <div class="badge badge-secondary">NEW</div>
                      </h2>
                      <h2>Category: ${element.strCategory}</h2>
                      <h2>${element.strArea}</h2>
                      <div class="flex">
                      <p>${element.strIngredient1}</p>
                      <p>${element.strIngredient2}</p>
                      <p>${element.strIngredient2}</p>
                      </div>
                      <div class="card-actions justify-end" onclick="modal(${element.idMeal})">
                      <label  for="details" class="btn btn-active btn-secondary">Details</label>
                      </div>
                    </div>
                  </div>
            <!-- card 1 -->
        `
        mealsContainer.appendChild(mealDiv);
    });
}
const searchMeal = () => {
    const searchText = document.getElementById('search-field').value;
    loadData(searchText)
}
// const modal = idMeal=> {
//     const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
//     fetch(url)
//     .then(res => res.json())
//     .then(data => mealDit(data.meals[0]))
//     .catch(error => {
//         console.log(error);
//     })
    
// }
const modal = async(idMeal) =>{
 const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
 try {
    const res = await fetch(url);
    const data = await res.json();
    mealDit(data.meals[0])

 } catch (error) {
    console.log(error)
 }
}

const mealDit=meals =>{
    // document.getElementById('modalTital').innerText = meals.strMeal;
 const mealsContainer = document.getElementById('modalbody')
 mealsContainer.innerHTML = ' ';
// console.log(element);
// console.log(meals.strMealThumb)

const mealDiv = document.createElement('div')

mealDiv.innerHTML = `

<!-- card 1 -->
        <div class="card w-96 bg-base-100 shadow-xl">
                    <h2 class="card-title">
                        ${meals.strMeal}
                      </h2>
            <figure><img src="${meals.strMealThumb}" /></figure>
            <div class="card-body">
              <h2>Category: ${meals.strCategory}</h2>
              <h2>${meals.strArea}</h2>
              <div class="flex">
              <p>${meals.strIngredient1}</p>
              <p>${meals.strIngredient2}</p>
              <p>${meals.strIngredient2}</p>
              </div>
            </div>
          </div>
    <!-- card 1 -->
`;
mealsContainer.appendChild(mealDiv);

}
loadData('fish')