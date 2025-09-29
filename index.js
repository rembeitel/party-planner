const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2508-FTB-ET-WEB-FT"; // Make sure to change this!
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;

// STATE
let parties = [];
let selectedParty;

async function getParty(id) {
  try {
    const res = await fetch(`${API}/${id}`);
    const json = await res.json();
    console.log(json.data);
    selectedParty = json.data;
  } catch (err) {
    console.error(err);
  }
}

async function getParties() {
  try {
    const res = await fetch(API);
    const json = await res.json();
    parties = json.data;
    // call render
  } catch (err) {
    console.error(err);
  }
}

function PartyListItem(party) {
  const $li = document.createElement("li");
  $li.innerHTML = `<a href="#selected">${party.name}</a>`;
  $li.addEventListener("click", async function () {
    await getParty(party.id);
    render();
  });
  return $li;
}

function PartyList() {
  const $ul = document.createElement("ul");
  $ul.classList.add("parties");
  const $parties = parties.map(PartyListItem);
  $ul.replaceChildren(...$parties);
  return $ul;
}

function SelectedParty() {
  if (!selectedParty) {
    const $p = document.createElement("p");
    $p.textContent = "Please select a party to learn more";
    return $p;
  }
  const $party = document.createElement("section");
  $party.innerHTML = `
  <h3>${selectedParty.name} #${selectedParty.id}</h3>
  <time datetime="${selectedParty.date}">
  ${selectedParty.date.slice(0, 10)}</time>
  <address>${selectedParty.location}</address>
  <p>${selectedParty.description}</p>
  `;
  return $party;
}

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
  <h1>Party Planner</h1>
  <main>
    <section>
        <h2>Upcoming Parties</h2>
        <PartyList></PartyList>
    </section>
    <section>
        <h2>Party Details</h2>
        <SelectedParty></SelectedParty>
    </section>
  </main>
  `;

  $app.querySelector("PartyList").replaceWith(PartyList());
  $app.querySelector("SelectedParty").replaceWith(SelectedParty());
}

async function init() {
  await getParties();
  render();
}

init();
