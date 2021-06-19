const db = firebase.firestore();
const db2 = firebase.storage();
const form = document.getElementById("people");
const resultado = document.querySelector(".container-2");
const subirdatos = (Nombre, Apellido, url) =>
  db.collection("Personas").doc().set({
    Nombre,
    Apellido,
    url,
  });
const obtenerDatos = () => db.collection("Personas").get();
const Imprimir = async () => {
  resultado.innerHTML = "";
  const querySnapShots = await obtenerDatos();
  querySnapShots.forEach((doc) => {
    // console.log(doc);
    resultado.innerHTML += `
    <div class="card col-3 m-2">
    <div class="card-body">
    <p><label class="col-form-label">Nombre: </label> ${doc.data().Nombre}</p>
    <p>Apellido: ${doc.data().Apellido}</p>
    <img style="max-width: 100px; max-height: 100px;" src = ${doc.data().url}>
    </div> 
    </div>`;
  });
};
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombre = form["name"];
  const apellido = form["lastName"];
  const file = form["file-picker"];
  if (apellido.value != "" && nombre.value != "") {
    const storage = await db2
      .ref("foto_prueba/" + file.files[0].name)
      .put(file.files[0]);
    const url = await storage.ref.getDownloadURL();
    await subirdatos(nombre.value, apellido.value, url);
    form.reset();
    Imprimir();
  }
});
window.addEventListener("DOMContentLoaded", async (e) => {
  Imprimir();
  const querySelector = await db2.ref("foto_prueba").listAll();
});
