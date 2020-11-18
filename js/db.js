const dbPromised = idb.open("premier-league", 1, (upgradeDB) => {
  const teamsObjectStore = upgradeDB.createObjectStore("teams", {
    keyPath: "id",
  });

  teamsObjectStore.createIndex("name", "name", { unique: false });
});

const saveForLater = (team) => {
  dbPromised
    .then((db) => {
      const tx = db.transaction("teams", "readwrite");
      const store = tx.objectStore("teams");
      store.add(team);
      return tx.complete;
    })
    .then(() => {
      console.log("Team berhasil disimpan");
    });
};

const getAll = () => {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        const tx = db.transaction("teams", "readonly");
        const store = tx.objectStore("teams");
        return store.getAll();
      })
      .then((teams) => {
        resolve(teams);
      });
  });
};

const getById = (id) => {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        const tx = db.transaction("teams", "readonly");
        const store = tx.objectStore("teams");
        return store.get(id);
      })
      .then((data) => {
        resolve(data);
      });
  });
};

const deleteById = (id) => {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        const tx = db.transaction("teams", "readwrite");
        const store = tx.objectStore("teams");
        console.log(id);
        return store.delete(id);
      })
      .then((data) => {
        console.log(data);
        resolve(data);
      });
  });
};
