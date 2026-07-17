const form = document.getElementById("recordForm");
const recordsContainer = document.getElementById("records");
const inptTitle = document.getElementById("title");
const inptCategory = document.getElementById("category");
const inptDate = document.getElementById("date");
const inptStatus = document.getElementById("status");
const inptDescription = document.getElementById("description");
const searchInput = document.getElementById("search");
const filterSelect = document.getElementById("filter");
const toast = document.getElementById("toast");

let records = [];
let editMode = false;
let currentId = null;

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

recordsContainer.addEventListener("click", async (event) => {
  if (event.target.classList.contains("edit")) {
    const id = event.target.dataset.id;
    const record = getRecordById(id);
    //popunjavanje elemenata za unos u formi
    inptTitle.value = record.title;
    inptCategory.value = record.category;
    inptDate.value = record.date;
    inptStatus.value = record.status;
    inptDescription.value = record.description;

    editMode = true;
    currentId = id;

    document.getElementsByClassName("btn-primary")[0].textContent =
      "Ažuriraj zapis";
  } else if (event.target.classList.contains("delete")) {
    if (confirm("Želite li obrisati zapis?")) {
      const id = event.target.dataset.id;
      await deleteRecord(id);
      showToast("Zapis uspješno obrisan", "warning");
      loadRecords();
    }
  }
});

function getRecordById(id) {
  return records.find((record) => {
    return record.id === id;
  });
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const newRecord = {
    title: inptTitle.value,
    category: inptCategory.value,
    date: inptDate.value,
    status: inptStatus.value,
    description: inptDescription.value
  };

  if (editMode) {
    await updateRecord(currentId, newRecord);
    showToast("Zapis uspješno ažuriran");
    editMode = false;
    currentId = null;

    document.getElementsByClassName("btn-primary")[0].textContent =
      "Spremi zapis";
  } else {
    try {
      await addRecord(newRecord, "records");
      showToast("Zapis uspješno spremljen");
    } catch (error) {
      showToast("Greška kod spremanja", "error");
    }
  }

  form.reset();
  loadRecords();
});

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();
  const filteredRecords = records.filter((record) => {
    return record.title.toLowerCase().includes(value);
  });

  displayRecords(filteredRecords);
});

filterSelect.addEventListener("change", (event) => {
  const category = event.target.value;

  if (category === "Sve") {
    displayRecords(records);
    return;
  }

  const filteredRecords = records.filter((record) => {
    return record.category === category;
  });

  displayRecords(filteredRecords);
});

function showToast(message, type = "success") {
  toast.textContent = message;

  toast.className = "";
  if (type !== "success") {
    toast.classList.add(type);
  }

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

loadRecords();
