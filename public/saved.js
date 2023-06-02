'use strict'

const refreshBtn = document.querySelector("#refresh-btn");
const personalList = document.querySelector("#personal-saved-list");
const publicList = document.querySelector("#public-saved-list");

refreshBtn.addEventListener("click", refreshHandler());

async function refreshHandler() {
  console.log("clicked refresh");
  // listingsAll = await retrieveSavedAll();
  // updateListings(listingsAll);
  retrieveSavedAll().then((listingsAll) => updateListings(listingsAll));
}

async function retrieveSavedAll() { 
  const response = await fetch("http://localhost:4000/api/BrowseCmdSet", {
    method: "GET",
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
  .then((response) => response.json())
  .then((jsonResponse) => {
      console.log(typeof(jsonResponse));
      return jsonResponse;
    })
  console.log(response);
  return response;
  // .then((jsonResponse) => updateListings(jsonResponse));
}

function updateListings(listings) {
  publicList.innerHTML = "";
  for (const cmdset of listings) {
    publicList.appendChild(createCard(cmdset));
  }
}

function createCard(cmdset) {
  console.log("creating card")
  const cardHC = document.createElement("h5");
  cardHC.textContent = cmdset.cmd;
  cardHC.className = "card-title";
  const cardPI = document.createElement("p");
  cardPI.textContent = cmdset.stdin;
  cardPI.className = "card-text";
  const cardPO = document.createElement("p");
  cardPO.textContent = cmdset.stdout;
  cardPO.className = "card-text";
  const cardPE = document.createElement("p");
  cardPE.textContent = cmdset.stderr;
  cardPE.className = "card-text";

  const editBtn = document.createElement("button");
  editBtn.textContent = "Go To Editor";
  editBtn.className = "btn btn-dark";

  let newCardBody = document.createElement("div");
  newCardBody.appendChild(cardHC);
  newCardBody.appendChild(cardPI);
  newCardBody.appendChild(cardPO);
  newCardBody.appendChild(cardPE);
  newCardBody.className = "card-body";

  let newCard = document.createElement("div");
  newCard.appendChild(newCardBody);
  newCard.className = "card text-white bg-dark";
  
  console.log(newCard.toString())
  return newCard;
}

let listingsAll = await retrieveSavedAll();
updateListings(listingsAll);
