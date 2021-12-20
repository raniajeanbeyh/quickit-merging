const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const url = `https://examassignment-49e3.restdb.io/rest/quickit?q={"_id" : {"$in":["${id}"]}}`;

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
  myClone.querySelector("h2.meal-title").textContent = meal.name;
  myClone.querySelector(".meal-pic").src = meal.pic;
  myClone.querySelector("ul.ingredients").innerHTML = meal.components;
  myClone.querySelector("p.descrp").innerHTML = meal.descrp;
  myClone.querySelector("p.price").textContent = meal.Price + ",00 DKK";
  document.querySelector("main").appendChild(myClone);
}
