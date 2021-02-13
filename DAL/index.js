// db initialization
const serviceAccount = require(__root + "data/ServiceAccountKey.json");
const admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ohash-17900-default-rtdb.firebaseio.com"
});

const db = admin.database();

function set(path, data) {
    return db.ref(path).set(data)
}

function read(path) {
    return db.ref(path).limitToFirst(5).once("value")
}

function update(path, data) {
    return db.ref(path).update(data)
}

function push(path, data) {
    return db.ref(path).push(data)
}

function remove(path) {
    return db.ref(path).remove()
}

function search(path, child, text) {
    return db.ref(path).orderByChild(child).startAt(text).endAt(text + "\uf8ff").once("value")
}

module.exports = {
    set,
    read,
    update,
    push,
    remove,
    search
}