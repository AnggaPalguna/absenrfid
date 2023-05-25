// Inisialisasi Firebase
var firebaseConfig = {
  apiKey: "AIzaSyBTaErGcpCeOP7NcdBPBkYqoYFXJhagVhM",
  authDomain: "esp32-sensor-reading-4ac6f.firebaseapp.com",
  databaseURL: "https://esp32-sensor-reading-4ac6f-default-rtdb.firebaseio.com",
  projectId: "esp32-sensor-reading-4ac6f",
  storageBucket: "esp32-sensor-reading-4ac6f.appspot.com",
  messagingSenderId: "403143825478",
  appId: "1:403143825478:web:21be7a573ec7b0e7bb1247",
};
firebase.initializeApp(firebaseConfig);

// Mendapatkan data dari Firebase dan menampilkannya
function getData() {
  var database = firebase.database();
  var rfidTagsRef = database.ref("rfid_tags");

  rfidTagsRef.on("value", function (snapshot) {
    var data = snapshot.val();
    var result = document.getElementById("result");

    // Menghapus konten sebelumnya
    result.innerHTML = "";

    // Mengambil array dari setiap child
    var children = Object.keys(data);

    // Menampilkan child
    children.forEach(function (child, index) {
      var childData = data[child];

      // Membuat elemen dan menambahkan nama class sesuai dengan index child
      var listItem = document.createElement("div");
      listItem.textContent = child;
      listItem.classList.add("child" + (index + 1));

      // Menambahkan elemen ke dalam result
      result.appendChild(listItem);

      // Menampilkan data dalam child jika ada
      if (typeof childData === "object") {
        var childList = document.createElement("div");
        listItem.appendChild(childList);
        displayChildData(childData, childList);
      }
    });
  });
}

// Fungsi rekursif untuk menampilkan data dalam child
function displayChildData(data, parentElement) {
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      var childData = data[key];

      if (typeof childData === "object") {
        // Jika child memiliki child lain, lanjutkan rekursi
        var listItem = document.createElement("div");
        listItem.textContent = key;
        listItem.classList.add("child");
        var childList = document.createElement("div");
        listItem.appendChild(childList);
        parentElement.appendChild(listItem);
        displayChildData(childData, childList);
      } else {
        // Jika child hanya memiliki nilai, tampilkan nilai tanpa kunci
        var listItem = document.createElement("li");
        listItem.textContent = childData;
        listItem.classList.add("data");
        parentElement.appendChild(listItem);
      }
    }
  }
}

// Memanggil fungsi getData saat halaman selesai dimuat
document.addEventListener("DOMContentLoaded", function (event) {
  getData();
});
