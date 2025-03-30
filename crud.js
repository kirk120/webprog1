function hozzaad() {
    const nev = document.getElementById('nev').value.trim();
    const email = document.getElementById('email').value.trim();
    const varos = document.getElementById('varos').value.trim();
    const kor = document.getElementById('kor').value.trim();

    if (!nev || !email || !varos || !kor) {
        alert("Minden mezőt ki kell tölteni!");
        return;
    }

    if (!/^[\w\.-]+@[\w\.-]+\.\w{2,}$/.test(email)) {
        alert("Érvénytelen email formátum!");
        return;
    }

    const tbody = document.getElementById('tabla-torzs');
    const sor = document.createElement('tr');

    sor.innerHTML = `
        <td>${nev}</td>
        <td>${email}</td>
        <td>${varos}</td>
        <td>${kor}</td>
        <td><button onclick="torol(this)">Törlés</button></td>
    `;

    tbody.appendChild(sor);
    document.getElementById("form").reset();
}

function torol(elem) {
    if (confirm("Biztosan törlöd ezt a sort?")) {
        elem.parentElement.parentElement.remove();
    }
}

function szures() {
    const input = document.getElementById('kereses').value.toLowerCase();
    const sorok = document.querySelectorAll('#tabla tbody tr');

    sorok.forEach(sor => {
        const szoveg = sor.textContent.toLowerCase();
        sor.style.display = szoveg.includes(input) ? '' : 'none';
    });
}

let irany = true;
function rendez(oszlopIndex) {
    const tabla = document.getElementById("tabla");
    const tbody = tabla.tBodies[0];
    const sorok = Array.from(tbody.rows);

    sorok.sort((a, b) => {
        const A = a.cells[oszlopIndex].textContent.trim().toLowerCase();
        const B = b.cells[oszlopIndex].textContent.trim().toLowerCase();
        return irany ? A.localeCompare(B, 'hu') : B.localeCompare(A, 'hu');
    });

    sorok.forEach(sor => tbody.appendChild(sor));
    irany = !irany;
}
