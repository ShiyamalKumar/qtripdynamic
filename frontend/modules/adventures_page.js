
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  return search.split("=")[1];

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {

  try
  {
    let adv=await fetch(`${config.backendEndpoint}/adventures/?city=${city}`).then(res => {return res.json()});
     return adv;
  }
  catch(err){
    return null;
  }
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach((key) => {
    document.getElementById("data").innerHTML+=`
  <div class="col-12 col-sm-6 col-lg-3 mb-4 position-relative">
  <div class="category-banner">${key.category}</div>
    <a href="detail/?adventure=${key.id}" id=${key.id}>
    <div class="card activity-card">
    <img src=${key.image} class="activity-card img"/>
    <div class="card-body">
    <div class="row">
    <div class="col-6 d-flex justify-content-start">${key.name}</div> 
    <div class="col-6 d-flex justify-content-end">${key.costPerHead}</div> 
    <div class="col-6 d-flex justify-content-start">Duration</div> 
    <div class="col-6 d-flex justify-content-end">${key.duration} Hours</div> 

    </div>

    </div>
    </div>
    </a>
  </div>
    `;
  });

  

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  list=list.filter(element =>{
    return (low<=element.duration) && (high>=element.duration) })
     return list;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  list=list.filter(element => {
    return categoryList.includes(element.category)
  })
  console.log(list);
  return list;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  if(filters.duration!="")
 list=filterByDuration(list,filters.duration.split("-")[0],filters.duration.split("-")[1]);
 if(filters.category.length!=0)
 list=filterByCategory(list,filters.category);


  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters",JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  var x = JSON.parse(localStorage.getItem("filters"));
  return x;

  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

  filters.category.forEach(e => {
    document.getElementById("category-list").innerHTML+=`
<div class="category-filter">
 <div>${e}</div>
</div>
  `;
  })
  
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
