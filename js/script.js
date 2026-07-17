const form = document.getElementById("recordForm");
const recordsContainer = document.getElementById("records");
let records = [];

async function loadRecords() {
  records = await getRecords();
  displayRecords(records);
}

function displayRecords(records) {
  recordsContainer.innerHTML = "";

  records.forEach((record) => {
    const card = document.createElement("article");
    card.classList.add("card");
    card.innerHTML = `
      <h3>${record.title}</h3>
      <p>${record.category}</p>
      <p>${record.date}</p>
      <p>${record.status}</p>  
      <p>${record.description}</p>   
      <button class="edit" data-id="${record.id}">Uredi</button> 
      <button class="delete" data-id="${record.id}">Obriši</button> 

    `;

    recordsContainer.append(card);
  });
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const newRecord = {
    title: document.getElementById("title").value,
    category: document.getElementById("category").value,
    date: document.getElementById("date").value,
    status: document.getElementById("status").value,
    description: document.getElementById("description").value
  };

  try {
    await addRecord(newRecord, "records");
    console.log("Zapis uspješno spremljen");
  } catch (error) {
    console.error(error);
  }
});

loadRecords();
