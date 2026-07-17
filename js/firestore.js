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
