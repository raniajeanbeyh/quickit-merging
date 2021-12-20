const urlParams = new URLSearchParams(window.location.search);
const Restaurant = urlParams.get("Restaurant");

const url = `https://examassignment-49e3.restdb.io/rest/quickit?q={"Restaurant" : {"$in":["${Restaurant}"]}}`;

const options = {
  headers: {
    "x-apikey": "61bb94e398cf0d3f741b902d",
  },
};

fetch(url, options)
  .then((response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
    handleData(data);
  })
  .catch((e) => {
    console.error("An error occured:", e.message);
  });

function handleData(meals) {
  meals.forEach(handleMeal);
}
function handleMeal(meal) {
  console.log(meal);
  const myTemplate = document.querySelector("template").content;
  const myClone = myTemplate.cloneNode(true);
  myClone.querySelector("figcaption").textContent = meal.name;
  myClone.querySelector(".mealspics").src = meal.pic;
  myClone
    .querySelector("a")
    .setAttribute("href", "product.html?id=" + meal._id);
  document.querySelector("main").appendChild(myClone);
}
