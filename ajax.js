const API_URL = "http://gamf.nhely.hu/ajax2/";
const CODE = "GF8NSNbbf209"; // ← IDE ÍRD BE A SAJÁT KÓDODAT

function validateFields(name, height, weight) {
  if (!name || !height || !weight) return "Minden mezőt ki kell tölteni!";
  if (name.length > 30 || height.length > 30 || weight.length > 30) return "Mezők max 30 karakter hosszúak lehetnek!";
  return null;
}

function createData() {
  const name = document.getElementById("createName").value;
  const height = document.getElementById("createHeight").value;
  const weight = document.getElementById("createWeight").value;

  const error = validateFields(name, height, weight);
  if (error) return showMessage("createMsg", error, true);

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      op: "create",
      code: CODE,
      name,
      height,
      weight
    })
  })
    .then(res => res.json())
    .then(data => {
      showMessage("createMsg", data.affectedRows === 1 ? "Sikeres mentés!" : "Mentés sikertelen!");
    });
}

function getDataForId() {
  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `op=read&code=${CODE}`
  })
    .then(res => res.json())
    .then(data => {
      const id = document.getElementById("updateId").value;
      const record = data.list.find(e => e.id === id);
      if (record) {
        document.getElementById("updateName").value = record.name;
        document.getElementById("updateHeight").value = record.height;
        document.getElementById("updateWeight").value = record.weight;
        showMessage("updateMsg", "Adatok betöltve.");
      } else {
        showMessage("updateMsg", "Nem található adat ezzel az ID-vel.", true);
      }
    });
}

function updateData() {
  const id = document.getElementById("updateId").value;
  const name = document.getElementById("updateName").value;
  const height = document.getElementById("updateHeight").value;
  const weight = document.getElementById("updateWeight").value;

  const error = validateFields(name, height, weight);
  if (error) return showMessage("updateMsg", error, true);

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      op: "update",
      id,
      code: CODE,
      name,
      height,
      weight
    })
  })
    .then(res => res.json())
    .then(data => {
      showMessage("updateMsg", data.affectedRows === 1 ? "Sikeres frissítés!" : "Frissítés sikertelen!", data.affectedRows !== 1);
    });
}

function deleteData() {
  const id = document.getElementById("deleteId").value;

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `op=delete&code=${CODE}&id=${id}`
  })
    .then(res => res.json())
    .then(data => {
      showMessage("deleteMsg", data.affectedRows === 1 ? "Sikeres törlés!" : "Törlés sikertelen!", data.affectedRows !== 1);
    });
}

function readData() {
  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `op=read&code=${CODE}`
  })
    .then(res => res.json())
    .then(data => {
      const resultDiv = document.getElementById("result");
      resultDiv.innerHTML = "";
      let heightSum = 0;
      let maxHeight = -Infinity;

      data.list.forEach(item => {
        const div = document.createElement("div");
        div.textContent = `ID: ${item.id}, Név: ${item.name}, Magasság: ${item.height}, Súly: ${item.weight}`;
        resultDiv.appendChild(div);

        const h = parseFloat(item.height);
        if (!isNaN(h)) {
          heightSum += h;
          if (h > maxHeight) maxHeight = h;
        }
      });

      const avgHeight = (heightSum / data.list.length).toFixed(2);
      document.getElementById("stat").innerHTML = `
        <strong>Magasság összesen:</strong> ${heightSum.toFixed(2)}<br>
        <strong>Átlag:</strong> ${avgHeight}<br>
        <strong>Legnagyobb:</strong> ${maxHeight}
      `;
    });
}

function showMessage(elementId, message, isError = false) {
  const el = document.getElementById(elementId);
  el.textContent = message;
  el.className = isError ? "error" : "message";
}
