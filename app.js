// Alap gumiabroncs osztály
class Tire {
    constructor(type, size, brand, durability) {
        this.type = type;
        this.size = size;
        this.brand = brand;
        this.durability = durability;
        log(`Tire constructor: ${this.type} ${this.size} ${this.brand}`);
    }

    // Az abroncs bemutatása
    describe() {
        log(`Tire describe called: ${this.brand} ${this.size}`);
        return `${this.brand} ${this.size} típusú gumiabroncs, típus: ${this.type}, élettartam: ${this.durability} év.`;
    }

    // Az abroncs adatainak kártyán történő megjelenítése
    createCard() {
        log('Tire createCard called');
        const card = document.createElement('div');
        card.classList.add('tire-card');

        const title = document.createElement('h3');
        title.textContent = `${this.brand} ${this.size}`;
        
        const description = document.createElement('p');
        description.textContent = this.describe();

        card.appendChild(title);
        card.appendChild(description);

        // Visszaadjuk a kártyát, hogy hozzá lehessen adni a dokumentumhoz
        return card;
    }
}

// Sport típusú gumiabroncs osztály, amely az alap Tire osztályt örökli
class SportTire extends Tire {
    constructor(size, brand, durability) {
        super('Sport', size, brand, durability);
        log(`SportTire constructor: ${this.type} ${this.size} ${this.brand}`);
    }

    // Sport gumiabroncs leírása
    describe() {
        log('SportTire describe called');
        return `${super.describe()} Ez egy sport típusú gumiabroncs, amely kiváló tapadást biztosít.`;
    }
}

// Cruiser típusú gumiabroncs osztály, amely az alap Tire osztályt örökli
class CruiserTire extends Tire {
    constructor(size, brand, durability) {
        super('Cruiser', size, brand, durability);
        log(`CruiserTire constructor: ${this.type} ${this.size} ${this.brand}`);
    }

    // Cruiser gumiabroncs leírása
    describe() {
        log('CruiserTire describe called');
        return `${super.describe()} Ez egy cruiser típusú gumiabroncs, amely hosszú élettartamot biztosít kényelmes vezetéshez.`;
    }
}

// Enduro típusú gumiabroncs osztály, amely az alap Tire osztályt örökli
class EnduroTire extends Tire {
    constructor(size, brand, durability) {
        super('Enduro', size, brand, durability);
        log(`EnduroTire constructor: ${this.type} ${this.size} ${this.brand}`);
    }

    // Enduro gumiabroncs leírása
    describe() {
        log('EnduroTire describe called');
        return `${super.describe()} Ez egy Enduro típusú gumiabroncs, ideális terepezéshez.`;
    }
}

// Véletlenszerű gumiabroncs generálása
function generateRandomTire() {
    log('generateRandomTire called');
    
    const types = ['Sport', 'Cruiser', 'Enduro'];
    const sizes = ['120/70 ZR17', '150/80 B16', '180/55 ZR17', '140/90 B15'];
    const brands = ['Michelin', 'Bridgestone', 'Pirelli', 'Dunlop'];
    const durabilities = [3, 5, 6, 4]; // Élettartam (év)

    const randomType = types[Math.floor(Math.random() * types.length)];
    const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
    const randomBrand = brands[Math.floor(Math.random() * brands.length)];
    const randomDurability = durabilities[Math.floor(Math.random() * durabilities.length)];

    let newTire;

    if (randomType === 'Sport') {
        newTire = new SportTire(randomSize, randomBrand, randomDurability);
    } else if (randomType === 'Cruiser') {
        newTire = new CruiserTire(randomSize, randomBrand, randomDurability);
    } else if (randomType === 'Enduro') {
        newTire = new EnduroTire(randomSize, randomBrand, randomDurability);
    }

    log(`Random tire generated: ${newTire.describe()}`);
    return newTire;
}

// Funkció, amely új gumiabroncsot ad hozzá
function addRandomTire() {
    // Kiürítjük a log konténert
    const logContainer = document.getElementById("logContainer");
    logContainer.innerHTML = ''; // Ez kiüríti a log konténer tartalmát

    log('addRandomTire called');
    const newTire = generateRandomTire(); // Véletlenszerű gumiabroncs létrehozása

    // Az új gumiabroncs kártyájának hozzáadása a dokumentumhoz
    const tireContainer = document.getElementById('tireContainer');
    tireContainer.appendChild(newTire.createCard());
}

// Funkció a log üzenetek kiírására
function log(message) {
    const logContainer = document.getElementById("logContainer");

    if (!logContainer) {
        console.error("Log container element not found!");
        return;
    }

    // Log üzenet létrehozása és hozzáadása a loghoz
    const logMessage = document.createElement('div');
    logMessage.textContent = message;
    logContainer.appendChild(logMessage);

    // Alapértelmezett opacity biztosítása
    logContainer.style.opacity = '1'; // Kézzel állítjuk be, hogy a log látható legyen

    // Animáció hozzáadása
    logContainer.style.transition = 'opacity 0.5s ease-in-out'; // Animációt beállítunk
    logContainer.style.opacity = '0';  // Elhalványítjuk a logot

    // Visszaállítjuk az opacity-t, hogy látható legyen az új üzenet
    setTimeout(() => {
        logContainer.style.opacity = '1';  // Visszaállítjuk az opacity-t
    }, 100);  // Kis késleltetéssel
}
