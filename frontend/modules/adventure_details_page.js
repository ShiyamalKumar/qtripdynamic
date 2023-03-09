import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  var ad=search.split("=")[1];
  // Place holder for functionality to work in the Stubs
  return ad;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try
  {
    let adventu=await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`).then(res=>{return res.json()});
    console.log(adventu);
    return adventu;
  }
  catch(err){
    return null;
  }

}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  console.log(adventure);
  document.getElementById("adventure-name").textContent=adventure.name;
  document.getElementById("adventure-subtitle").textContent=adventure.subtitle;
  document.getElementById("adventure-content").textContent=adventure.content;
  adventure.images.forEach((key) => {
    document.getElementById("photo-gallery").innerHTML+=`
  <div>
    <img src=${key} class="activity-card-image"/>
  </div>
    `;
  });


}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
let c_ind=`  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>`;
let c_inner=` <div class="carousel-item active"><img src=${images[0]} class="activity-card-image"></div>`;
for(let i=1;i<images.length;i++){
  c_ind+=`
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" aria-label="Slide ${i+1}"></button>
  `;
  c_inner+=` <div class="carousel-item"><img src=${images[i]} class="activity-card-image" >
</div>`;
}


  document.getElementById("photo-gallery").innerHTML=`
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
   ${c_ind} 
  </div>
  <div class="carousel-inner">
  ${c_inner}
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>  
  `;

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  console.log(adventure);
  document.getElementById("reservation-person-cost").textContent=adventure.costPerHead;
  if(adventure.available)
  {
    document.getElementById("reservation-panel-sold-out").style.display="none";
    document.getElementById("reservation-panel-available").style.display="block";

  }
  else{
    document.getElementById("reservation-panel-sold-out").style.display="block";
    document.getElementById("reservation-panel-available").style.display="none";


  }
  

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
 
  var calc=persons*adventure.costPerHead;
  document.getElementById("reservation-cost").textContent=calc;
  
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
let formSub=document.getElementById("myForm");
formSub.addEventListener('submit',function(e){
  e.preventDefault()
  let form= new FormData(formSub)
  let fdata ={
    name: form.get("name"),
    person: form.get("person"),
    date: form.get("date"),
    adventure:adventure.id
  };


  const options = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(fdata),
    };

   fetch(`${config.backendEndpoint}/reservations/new`, options)
  .then(data => {
      if (!data.ok) {
        alert("Failed!");
      }
       return data.json();
      }).then(res => {
        alert("Success!");
      }).catch(e => {
        alert("Failed!");
      });

});






  
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved)
  {
    document.getElementById("reserved-banner").style.display="block";


  }
  else{
    document.getElementById("reserved-banner").style.display="none";
  


  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
