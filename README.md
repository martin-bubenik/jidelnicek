# 📱 Návod: Jak aktualizovat Jídelníček na Vercelu

Tento návod slouží jako rychlá příručka, když upravíš kód aplikace (přidáš recept, změníš vzhled nebo opravíš chybu) a chceš novou verzi dostat do iPhonu.

---

## 📋 Než začneš (Rychlý přehled)
Kdykoliv uděláš změnu v kódu, musíš udělat **2 věci**:
1. Zvýšit verzi mezipaměti v souboru `sw.js` (aby iPhone poznal, že je nová verze).
2. Odeslat změny na Vercel pomocí 1 příkazu v Terminálu.

---

## 🛠️ Postup aktualizace v 5 krocích

### Krok 1: Uprav kód aplikace
Udělej v projektu jakékoliv změny (např. v `App.jsx` nebo `index.html`), které potřebuješ.

### Krok 2: Změň číslo verze v `sw.js`
Otevři soubor `public/sw.js` (nebo `sw.js`) a na prvním řádku změň číslo verze na vyšší:

```javascript
// Starý stav:
const CACHE_NAME = 'jidelnicek-v1';

// Nový stav (při první aktualizaci změníš na v2, příště na v3 atd.):
const CACHE_NAME = 'jidelnicek-v2';
```
> ⚠️ **DŮLEŽITÉ:** Pokud číslo verze nezměníš, iPhone si bude dál načítat starou uloženou verzi ze své paměti a nové změny neuvidíš!

### Krok 3: Otevři Terminál ve složce projektu
1. Otevři **Terminál** na Macu.
2. Napiš `cd ` (včetně mezery na konci).
3. Přetáhni složku s projektem z Finderu do okna Terminálu a stiskni **Enter**.

### Krok 4: Pošli aktualizaci na Vercel
V Terminálu zadej tento jediný příkaz a stiskni **Enter**:

```bash
npx vercel --prod
```

*(Příznak `--prod` říká Vercelu, že jde o ostrou verzi pro tvoji hlavní webovou adresu).*

Terminál chvíli poběží (cca 10–20 vteřin) a jakmile napíše `Production: https://jidelnicek-xxx.vercel.app [Copied to clipboard]`, **hotovo!** Nová verze je na cloudu.

---

## 📲 Co se stane na iPhonu po aktualizaci?

1. Při nejbližším otevření aplikace se ještě může načíst stará verze, ale iPhone si **na pozadí sám stáhne verzi novou**.
2. Jakmile aplikaci zavřeš (vytáhnutím nahoru z paměti) a **znovu otevřeš**, automaticky naskočí nová verze.
3. Funguje to i offline!

---

## 🔍 Řešení problémů: Nová verze se stále neukazuje

Pokud jsi provedel aktualizaci na Vercelu, ale na iPhonu vidíš pořád starou verzi (i po zavření a znovuotevření aplikace), vyzkoušej tyto kroky v daném pořadí:

### 1. Zkontroluj, zda jsi nezapomněl na `sw.js`
* Nejčastější chyba: Úprava kódu proběhla, ale v `sw.js` zůstalo stejné `CACHE_NAME` (např. pořád `v1`).
* **Řešení:** Otevři `sw.js`, zvyš verzi (např. na `v2` nebo `v3`) a spusť znovu `npx vercel --prod`.

### 2. Zkontroluj připojení k internetu
* iPhone dokáže stáhnout novou verzi **pouze v momentě, kdy je připojen k Wi-Fi nebo mobilním datům**.
* **Řešení:** Ujisti se, že jsi online, otevři aplikaci na 10–15 vteřin, zavři ji z paměti a znovu otevři.

### 3. Vynucení obnovy přes Safari
Pokud iOS tvrdohlavě drží starou mezipaměť a nechce ji pustit:
1. Otevři **Safari** na iPhonu.
2. Jdi na svou Vercel adresu (např. `https://jidelnicek-xxx.vercel.app`).
3. Dvakrát obnov stránku (ikona šipky v adresním řádku).
4. Zavři Safari, otevři aplikaci z plochy a nová verze by měla naskočit.

### 4. Vymazání mezipaměti Safari v Nastavení iOS
Pokud nepomohlo ani Safari, vymaž paměť přímo v systému:
1. Na iPhonu otevři **Nastavení** -> **Safari** -> **Pokročilé** -> **Data stránek**.
2. Vyhledej doménu `vercel.app` (nebo názvy své aplikace).
3. Přejeď po ní prstem doleva a dej **Smazat** (případně klikni na *Odstranit všechna data*).
4. Otevři aplikaci na ploše – při prvním spuštění si znovu stáhne nejnovější verzi z Vercelu.

### 5. Krajní řešení: Odstranění a opětné přidání na plochu
Pokud vše selže:
1. Podrž ikonu Jídelníčku na ploše a zvol **Odstranit záložku**.
2. Otevři Safari, jdi na svou Vercel URL adresu.
3. Klikni na tlačítko **Sdílet** -> **Přidat na plochu**.
