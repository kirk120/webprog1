const API_URL = "http://gamf.nhely.hu/ajax2/";
const CODE = "GF8NSNbbf209"; // ← IDE ÍRD BE A SAJÁT KÓDODAT

function validateFields(name, height, weight) {
  if (!name || !height || !weight) return "Minden mezőt ki kell tölteni!";
  if (name.length > 30 || height.length > 30 || weight.length > 30) return "Mezők max 30 karakter hosszúak lehetnek!";
  return null;
}

function createData() {
    const name = document.getElementById("createName").value.trim();
    const height = document.getElementById("createHeight").value.trim();
    const weight = document.getElementById("createWeight").value.trim();
  
    if (!name || !height || !weight || name.length > 30 || height.length > 30 || weight.length > 30) {
      document.getElementById("createStatus").textContent = "❌ Hiba: mezők nem lehetnek üresek és max 30 karakter hosszúak!";
      return;
    }
  
    const formData = new URLSearchParams();
    formData.append("op", "create");
    formData.append("code", "GF8NSNbbf209");
    formData.append("name", name);
    formData.append("height", height);
    formData.append("weight", weight);
  
    fetch("http://gamf.nhely.hu/ajax2/", {
      method: "POST",
      body: formData
    })
      .then(res => res.text()) // <- Mert nem JSON!
      .then(text => {
        if (text.trim() === "1") {
          document.getElementById("createStatus").textContent = "✅ Sikeres létrehozás!";
          document.getElementById("createForm").reset();
          readData(); // frissítjük az adatokat
        } else {
          document.getElementById("createStatus").textContent = "❌ Sikertelen létrehozás.";
        }
      })
      .catch(error => {
        console.error("Hiba:", error);
        document.getElementById("createStatus").textContent = "❌ Hiba történt a kérés során.";
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
      const record = data.list.find(e => e.id == id);
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
    const deleteId = document.getElementById("deleteId").value.trim();
    const code = CODE; // Kódot itt helyben átadjuk

    // Ellenőrizzük, hogy az ID nem üres
    if (!deleteId) {
        document.getElementById("deleteMsg").innerText = "Kérlek add meg a törlendő ID-t!";
        return;
    }

    // API hívás a törléshez
    fetch(API_URL, {
        method: 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            op: 'delete',
            code: CODE,
            id: deleteId,
            code: code
        })
    })
    .then(response => response.text())  // Válasz szövegként jön vissza
    .then(data => {
        // Ellenőrizzük a választ
        if (data === '1') {
            document.getElementById("deleteMsg").innerText = "✅ Sikeres törlés!";
            readData();  // Frissítjük a listát
        } else {
            document.getElementById("deleteMsg").innerText = "❌ A törlés nem sikerült. Lehet, hogy hibás ID-t vagy kódot adtál meg.";
        }
    })
    .catch(error => {
        console.error("Hiba történt a törlés során:", error);
        document.getElementById("deleteMsg").innerText = "❌ Hiba történt a törlés során.";
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
