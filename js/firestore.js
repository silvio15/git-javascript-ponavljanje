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
    records.push({
      id: doc.id,
      ...doc.data()
    });
  });

  return records;
}
