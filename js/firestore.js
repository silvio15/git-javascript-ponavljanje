//Dodavanje zapisa
async function addRecord(record, collectionName) {
  try {
    console.log(firebaseConfig);
    await db.collection(collectionName).add({
      ...record
      //   createdAt: firebaseConfig.firestore.FieldValue.serverTimeStamp()
    });

    console.log("zapis dodan");
  } catch (error) {
    console.error(error);
  }
}

//Dohvaćanje zapisa
async function getRecords() {
  const snapshot = await db.collection("records").get();

  let records = [];

  snapshot.forEach((doc) => {
    try {
      records.push({
        id: doc.id,
        ...doc.data()
      });
    } catch (error) {
      showToast("Greška u dohvaćanju", "error");
    }
  });

  return records;
}

//Ažuriranje zapisa
async function updateRecord(id, data) {
  await db.collection("records").doc(id).update(data);
}

//Brisanje zapisa
async function deleteRecord(id) {
  await db.collection("records").doc(id).delete();
}
