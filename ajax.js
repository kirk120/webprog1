const API_URL = "https://api.example.com/data";

function loadData() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            let html = "";
            let sum = 0, max = 0;
            data.forEach(item => {
                html += `<p>ID: ${item.id}, Név: ${item.name}, Magasság: ${item.height}</p>`;
                sum += item.height;
                if (item.height > max) max = item.height;
            });
            document.getElementById("dataContainer").innerHTML = html;
            document.getElementById("sum").innerText = `Összeg: ${sum}`;
            document.getElementById("avg").innerText = `Átlag: ${sum / data.length}`;
            document.getElementById("max").innerText = `Legnagyobb: ${max}`;
        });
}

function createData() {
    let name = document.getElementById("newName").value;
    let height = document.getElementById("newHeight").value;
    if (!name || name.length > 30 || !height) {
        alert("Hibás adat!");
        return;
    }
    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, height })
    }).then(() => {
        document.getElementById("createMessage").innerText = "Sikeres hozzáadás!";
        loadData();
    });
}

function getDataForId() {
    let id = document.getElementById("updateId").value;
    fetch(`${API_URL}/${id}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("updateName").value = data.name;
            document.getElementById("updateHeight").value = data.height;
        });
}

function updateData() {
    let id = document.getElementById("updateId").value;
    let name = document.getElementById("updateName").value;
    let height = document.getElementById("updateHeight").value;
    if (!name || name.length > 30 || !height) {
        alert("Hibás adat!");
        return;
    }
    fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, height })
    }).then(() => {
        document.getElementById("updateMessage").innerText = "Sikeres módosítás!";
        loadData();
    });
}

function deleteData() {
    let id = document.getElementById("deleteId").value;
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(() => {
            document.getElementById("deleteMessage").innerText = "Sikeres törlés!";
            loadData();
        });
}
