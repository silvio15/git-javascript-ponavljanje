const form = document.getElementById("recordForm");

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
