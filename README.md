# umw-inz-sem6_cw-TechMob-Bot

## Opis Zadania

```text
Zadanie projektowe — Inteligentny Agent AI na stronę WWW
Temat: Bot doradzający ubiór do pogody (HTML + CSS + JavaScript)
Cel projektu
Celem projektu jest zaprojektowanie nowoczesnego, dynamicznego chatbota webowego, który:
działa bezpośrednio na stronie internetowej,
komunikuje się z użytkownikiem przez interfejs czatu,
analizuje dane wejściowe użytkownika,
rekomenduje odpowiedni ubiór do pogody,
posiada nowoczesny frontend z animacjami i responsywnością.
Technologie obowiązkowe
Student musi wykorzystać:
HTML5
CSS3
JavaScript (Vanilla JS)
Responsive Web Design
Dodatkowo (opcjonalnie):
OpenWeather API
LocalStorage
Fetch API
GitHub Pages / Azure Static Web Apps
Funkcjonalności wymagane
Bot powinien:
przyjmować dane od użytkownika,
analizować pogodę,
odpowiadać dynamicznie,
rekomendować:
strój,
dodatki,
ochronę przed deszczem/zimnem,
styl ubioru.
Scenariusz działania
Przykład:
Użytkownik wpisuje:
Jest 7 stopni i pada deszcz
Bot odpowiada:
Załóż ciepłą kurtkę przeciwdeszczową oraz wodoodporne buty. Zabierz parasol.
Architektura rozwiązania
Frontend (HTML/CSS)
 ↓
JavaScript Chat Engine
 ↓
Logika warunkowa
 ↓
Analiza danych użytkownika
 ↓
Generowanie odpowiedzi
 ↓
( opcjonalnie )
OpenWeather API
Struktura projektu
/project
│
├── index.html
├── style.css
├── script.js
├── assets/
│ ├── bot.png
│ ├── background.jpg
│
└── README.md
Techniczne kroki wykonania projektu
ETAP 1 — Utworzenie struktury projektu
Krok 1
Założyć folder projektu:
weather-chatbot
Krok 2
Utworzyć pliki:
index.html
style.css
script.js
ETAP 2 — Budowa strony HTML
Krok 1 — Utworzenie layoutu
Student powinien stworzyć:
nagłówek,
sekcję główną,
okno czatu,
pole wpisywania wiadomości,
przycisk wysyłania.
Przykładowa struktura HTML
<div class="chat-container">
 <div class="chat-header">
 Weather AI Assistant
 </div>
 <div id="chat-box"></div>
 <div class="chat-input">
 <input type="text" id="user-input">
 <button onclick="sendMessage()">Send</button>
 </div>
</div>
ETAP 3 — Stylowanie CSS
Wymagania UI/UX
Student musi zastosować:
nowoczesny wygląd,
responsywność,
animacje,
hover effects,
glassmorphism lub gradienty.
Elementy wymagane w CSS
Responsywność
@media(max-width:768px)
Animacje
transition: 0.3s;
animation: fadeIn 0.5s;
Styl wiadomości
Oddzielne style:
dla użytkownika,
dla bota.
Przykład:
.user-message {
 background: #4CAF50;
}
.bot-message {
 background: #1E1E1E;
}
ETAP 4 — Mechanizm chatbota w JavaScript
Krok 1 — Pobranie danych z inputu
const input = document.getElementById("user-input").value;
Krok 2 — Dodanie wiadomości do DOM
function addMessage(message, sender) {
 const chatBox = document.getElementById("chat-box");
 const div = document.createElement("div");
 div.classList.add(sender);
 div.innerText = message;
 chatBox.appendChild(div);
}
Krok 3 — Analiza wiadomości użytkownika
Student musi użyć:
if/else,
switch,
funkcji,
manipulacji DOM.
Przykład logiki warunkowej
function botResponse(userInput) {
 if(userInput.includes("zimno")) {
 return "Załóż kurtkę zimową.";
 }
 else if(userInput.includes("deszcz")) {
 return "Nie zapomnij o parasolu.";
 }
 else {
 return "Sprawdź aktualną pogodę.";
 }
}
ETAP 5 — Dynamiczny chatbot
Funkcja wysyłania wiadomości
function sendMessage() {
 const input = document.getElementById("user-input");
 const userText = input.value;
 addMessage(userText, "user-message");
 const response = botResponse(userText);
 addMessage(response, "bot-message");
 input.value = "";
}
ETAP 6 — Integracja z API pogodowym (opcjonalnie)
Cel
Bot automatycznie pobiera pogodę dla miasta użytkownika.
API
Przykład:
OpenWeatherMap API
Krok 1 — Rejestracja API Key
Student zakłada konto:
OpenWeather
Krok 2 — Fetch API
fetch(apiURL)
.then(response => response.json())
.then(data => {
 console.log(data);
});
Krok 3 — Odczyt temperatury
const temperature = data.main.temp;
Krok 4 — Dynamiczna rekomendacja
if(temperature < 10) {
 recommendation = "Załóż kurtkę zimową";
}
ETAP 7 — Ulepszenia premium
Student może dodać:
Dark mode
document.body.classList.toggle("dark");
Typing animation
typing...
Scroll automatyczny
chatBox.scrollTop = chatBox.scrollHeight;
LocalStorage
Zapisywanie historii rozmów:
localStorage.setItem()
ETAP 8 — Responsywność
Bot musi działać:
desktop,
tablet,
mobile.
ETAP 9 — Deployment online
Student publikuje projekt:
Opcje:
GitHub Pages
Azure Static Web Apps
Netlify
ETAP 10 — Dokumentacja projektu
Student przygotowuje README.md zawierający:
opis projektu,
technologie,
sposób uruchomienia,
architekturę,
screenshoty,
przykładowe rozmowy.
Kryteria oceny
Kryterium
Punkty
HTML i struktura
15
CSS i UI/UX
20
JavaScript
25
Dynamiczne odpowiedzi
15
Responsywność
10
API pogodowe
10
Kreatywność
5
Wymagania dla oceny bardzo dobrej
Student powinien:
używać modularnego JS,
zadbać o accessibility (WCAG),
zastosować clean code,
używać fetch API,
dodać animacje,
wykonać deployment online.
Możliwe rozszerzenia projektu
Alternatywne tematy
Zamiast pogodowego agenta student może stworzyć:
agenta dietetycznego,
agenta fitness,
agenta cyberbezpieczeństwa,
agenta podróżniczego,
agenta HR,
agenta AI rekomendującego filmy.
Efekt końcowy
Student prezentuje:
działającą stronę,
dynamicznego chatbota,
architekturę rozwiązania,
kod źródłowy,
demo rozmowy,
deployment online.
Bonus dla ambitnych studentów
Dodatkowe punkty za:
integrację z Azure OpenAI,
Copilot Studio,
użycie AI,
historię rozmów,
panel administratora,
Progressive Web App (PWA),
mikroanimacje i nowoczesny design AI assistant.
wszystko musi byc realizowane w github
print screens z github
```

## 1. Wprowadzenie i zaplanowanie pracy

Należy zrealizować projekt aplikacji internetowej typu chatbot. Wprowadzam zatem podejście modułowe - zakres prac określony w etapach realizuje samo działanie podstawowe ale należy uwzględnić otoczenie i ustawienie usług Azure Cloud, wraz z odpowiednim ustawieniem środowiska.

Sam projekt strony internetowej jest założony w realizacji etapami - więc wprowadzam założenie publikowania commits na platformie github. Screenshoty z postepem prac zostaną umieszczone w repozytorium oraz śledzenie postępów odbędzie się w ramach git commits tracking.

Realizuję zadanie przy pomocy separowanego lab-a w maszynie wirtualnej dla czystości rozwiązania.

Brakujące a wymagane jest założenie osobnego tenanta Azure - skorzystam z uczelnianego konta aby założyć darmowe konto MS Azure do propgacji - jednak zrobię to w dalszych krokach.

Dedykuję katalog /notes w repozytorium do własnych notatek, działania ogólnego itd.

## 2. Realizacja etapów i opis wdrożonej architektury

W ramach realizacji projektu zaimplementowałem pełną architekturę modułową (zgodną z ES6) oraz stworzyłem nowoczesny interfejs użytkownika z zachowaniem zasad dostępności WCAG. Poniżej opisuję poszczególne etapy i komponenty, które wdrożyłem w aplikacji:

### 2.1. Podział na moduły (Clean Code)
Aplikacja została podzielona na logiczne moduły JS, co pozwala uniknąć monolitycznego kodu i ułatwia rozwój:
- `main.js` – Punkt wejścia aplikacji, uruchamiający inicjalizację po pełnym załadowaniu struktury DOM.
- `js/chatUI.js` – Odpowiada za obsługę interfejsu (wysyłanie wiadomości, animację pisania bota `typing...`, automatyczny scroll na dół oraz dynamiczny przełącznik trybu Dark Mode).
- `js/Recommender.js` – Silnik rekomendacyjny. Za pomocą wyrażeń regularnych (RegEx) parsuje tekst użytkownika w poszukiwaniu temperatury i warunków pogodowych (deszcz, wiatr, śnieg, słońce). Na tej podstawie generuje precyzyjną, sformatowaną rekomendację stroju i stylu.
- `js/weatherAPI.js` – Moduł asynchroniczny (Fetch API / async/await) pobierający aktualne dane pogodowe. Wdrożyłem mechanizm dynamicznego fallbacku: przy braku klucza API, system realistycznie symuluje pogodę dla miast (np. Warszawa, Bydgoszcz, Gdańsk, Zakopane), dzięki czemu aplikacja jest w pełni interaktywna nawet w trybie offline.
- `js/storage.js` – Obsługa trwałego zapisu historii czatu w `LocalStorage`.

### 2.2. Interfejs UI/UX (Glassmorphism)
Zaprojektowałem nowoczesny wygląd czatu:
- Zastosowałem stylizację **Glassmorphism** (`backdrop-filter` z rozmyciem tła i półprzezroczystymi ramkami).
- Wdrożyłem pełną responsywność (RWD) – na desktopie czat prezentuje się jako elegancka, wyśrodkowana karta, a na urządzeniach mobilnych rozciąga się na pełny ekran.
- Dodałem zestaw szybkich tagów (sugestii pogodowych), które pozwalają przetestować bota jednym kliknięciem.
- Wdrożyłem obsługę motywów (Dark/Light Mode) zapamiętywaną w pamięci przeglądarki.

### 2.3. Dostępność (WCAG) i standardy HTML5
- Struktura dokumentu bazuje na semantycznych tagach (`<main>`, `<section>`, `<header>`, `<footer>`).
- Zastosowałem odpowiednie atrybuty dostępności cyfrowej (`aria-label`, `aria-live="polite"` dla dynamicznie dodawanych wiadomości czatu oraz `aria-hidden` dla wskaźników dekoracyjnych).

### 2.4. Przebieg prac w systemie Git
Cały projekt był realizowany z podziałem na gałęzie funkcjonalne (feature branches), a commity były wykonywane zgodnie ze standardami (np. `feat: ...`, `chore: ...`):
1. `chore: add .gitignore` – przygotowanie plików ignorowanych.
2. `feat: setup modular architecture framework` – szkielet i puste moduły JS.
3. `feat: implement responsive layout and modern glassmorphism design` – wdrożenie stylów i struktury HTML.
4. `feat: implement chatbot intelligence, storage and API integration` – integracja logiki JS, LocalStorage i OpenWeather API.

Wszystkie gałęzie oraz główny branch `main` zostały wypchnięte na serwer GitHub.

## 3. Podsumowanie zrealizowanych rozszerzeń funkcjonalnych (Sprawozdanie)

W trakcie dalszych prac nad projektem zaimplementowano szereg zaawansowanych rozszerzeń funkcjonalnych oraz wizualnych, podnoszących jakość interakcji, estetykę oraz stabilność systemu. Poniżej znajduje się szczegółowy opis wdrożonych elementów:

### 3.1. Uwierzytelnianie użytkownika i zarządzanie sesją
W celu zabezpieczenia dostępu do asystenta pogodowego wprowadzono moduł uwierzytelniania działający w architekturze Single Page Application (SPA):
* **Szklany Ekran Logowania**: Zrealizowany w pełnej spójności wizualnej (iOS Glassmorphism).
* **Dane Testowe**: Bezpośrednio pod formularzem umieszczono dane logowania dla celów demonstracyjnych i ewaluacyjnych:
  - Użytkownik: `admin`
  - Hasło: `admin123`
* **Zarządzanie Stanem**: Stan zalogowania jest zapisywany w `LocalStorage` (`is_logged_in: true`). Po poprawnym uwierzytelnieniu następuje płynne ukrycie formularza i pokazanie okna czatu.
* **Wylogowanie**: W nagłówku czatu dodano przycisk wylogowania, który czyści flagę sesji i przywraca ekran logowania.
* **Tryb Demonstracyjny (Bypass)**: Zaimplementowano automatyczny bypass logowania przy przekazaniu parametru query `?demo=true` (lub dowolnej innej wartości dla klucza `demo`), co umożliwia bezproblemowe działanie testów automatycznych i skryptów bezobsługowych.

### 3.2. Nowoczesny Interfejs iOS Glassmorphism (High-Fidelity UI)
Przeniesiono stylistykę wizualną na poziom premium, opierając się na systemie iOS:
* **Głębokie Szkło (Acrylic Blur)**: Karta czatu oraz okno logowania posiadają właściwość `backdrop-filter: blur(45px)` połączoną z bardzo cienką, jasną półprzezroczystą obwódką imitującą refleksy świetlne na krawędziach szkła.
* **Pływające Kule Gradientowe (Background Blobs)**: Pod warstwą szkła umieszczono dwa duże, rozmyte obiekty wektorowe z radialnymi gradientami (fioletowo-różowym oraz niebiesko-morskim). Pływają one płynnie po ekranie dzięki asynchronicznym animacjom CSS (`floatBlob1` oraz `floatBlob2`), dając efekt głębi trójwymiarowej.
* **Dymki Wiadomości w Stylu Apple iMessage**: Wiadomości użytkownika są ostylowane z użyciem gradientu Apple Blue (`#007aff` do `#5856d6`) z zaokrąglonymi rogami, natomiast wiadomości bota to kontrastowe, półprzezroczyste szklane bąbelki, świetnie prezentujące się zarówno w motywie jasnym, jak i ciemnym.

### 3.3. Subtelne Animacje Tła (Wiatraczek i Jaskółki)
Wprowadzono delikatne animacje dekoracyjne podnoszące dynamikę interfejsu bez naruszania dostępności WCAG:
* **Wirujący Wiatraczek**: W lewym dolnym rogu umieszczono makietę papierowego wiatraczka (SVG) kręcącego się płynnie i powoli (`14s` na pełny obrót) za pomocą animacji `@keyframes spinWindmill`.
* **Lecące Jaskółki**: Stado trzech jaskółek (SVG) przelatuje nad taflą czatu od lewej do prawej strony. Każdy ptak leci z inną prędkością (od `22s` do `32s`) i z innym opóźnieniem, a same skrzydła mają organiczną animację trzepotania (`@keyframes birdFlap` wykorzystujące szybkie, naprzemienne przekształcenia `scaleY` i `skewX`).
* **Zgodność z WCAG (Dostępność)**: Elementy ruchome mają celowo ustawioną bardzo niską przezroczystość (około `0.07`–`0.14`), aby nie odciągać uwagi użytkownika od tekstu wiadomości i nie wywoływać dyskomfortu.

### 3.4. Bezkluczykowa Integracja z API Pogodowym (Open-Meteo)
Usunięto problematyczny wymóg posiadania kluczy API (np. OpenWeatherMap) na rzecz w pełni bezpłatnej, niewymagającej logowania integracji:
* **Geokodowanie i Pobieranie Danych**: Aplikacja pobiera dane dwuetapowo za pomocą Fetch API z Open-Meteo. Najpierw wyszukiwane są współrzędne geograficzne (szerokość i długość) dla podanej nazwy miasta, a następnie odpytywane jest API pogodowe o aktualną temperaturę oraz kod pogody (WMO Code).
* **Niezawodny Fallback**: W przypadku braku połączenia internetowego lub błędu sieci, system automatycznie przechodzi na predefiniowane, realistyczne dane pogodowe dla kluczowych miast, gwarantując ciągłość działania aplikacji.

### 3.5. Integracja z Modelami GPT AI (Pollinations AI)
Aplikacja została wzbogacona o tryb konwersacyjny oparty na sztucznej inteligencji:
* **Darmowe API AI**: Zintegrowano darmowe i bezkluczykowe API **Pollinations AI**, które serwuje odpowiedzi z modeli LLM (np. LLaMA/GPT).
* **Architektura Hybrydowa (Dwuwarstwowa)**:
  - **Zapytanie o pogodę/miasto**: Silnik `Recommender.js` generuje precyzyjne zalecenia ubraniowe, po czym asynchronicznie odpytywane jest GPT AI, aby wygenerować spersonalizowaną, przyjazną wskazówkę uzupełniającą (np. propozycje atrakcji turystycznych lub kawiarni w danym mieście na deszczowy dzień). Obie warstwy są łączone w jedną spójną odpowiedź.
  - **Tryb Swobodnej Konwersacji**: Jeśli użytkownik prowadzi zwykły dialog lub dopytuje o szczegóły (np. *"A czy adidasy będą okej?"*), aplikacja przekazuje całą dotychczasową historię czatu do Pollinations AI, pozwalając na w pełni dynamiczną konwersację kontekstową.

---

## 4. Publikacja i hosting (GitHub Pages)

Ponieważ projekt jest w pełni statyczny i opiera się na technologiach HTML5, CSS3 oraz Vanilla JS, został on opublikowany za pomocą usługi **GitHub Pages**.

### 4.1. Ścieżki Relatywne i Moduły ES6
* **Ścieżki Relatywne**: Wszystkie referencje do zasobów (plików JS, CSS, grafik) w kodzie źródłowym zostały zapisane jako ścieżki relatywne (zaczynające się od `./` lub odnoszące się do bieżącego katalogu, np. `./js/chatUI.js`). Zapobiega to błędom ładowania w sytuacji, gdy aplikacja jest serwowana z podkatalogu (co jest standardem dla GitHub Pages: `https://<uzytkownik>.github.io/<nazwa-repozytorium>/`).
* **Obsługa Modułów**: GitHub Pages bezproblemowo serwuje pliki JavaScript z atrybutem `type="module"`, zachowując pełne wsparcie dla modularnej struktury ES6 bez potrzeby stosowania dodatkowych narzędzi do bundlowania (np. Webpack, Vite).

### 4.2. Instrukcja uruchomienia GitHub Pages krok po kroku
1. Przejdź do swojego repozytorium na platformie GitHub: `https://github.com/jnbdx/umw-inz-sem6_cw-TechMob-Bot`.
2. Kliknij zakładkę **Settings** (Ustawienia) w górnym menu nawigacyjnym.
3. W menu bocznym po lewej stronie znajdź sekcję *Code and automation* wybierz pozycję **Pages**.
4. W zakładce *Build and deployment*:
   - Jako **Source** wybierz opcję `Deploy from a branch`.
   - W sekcji **Branch** wybierz gałąź **`main`** (lub inną gałąź produkcyjną) oraz folder `/ (root)`.
   - Kliknij przycisk **Save** (Zapisz).
5. GitHub Pages uruchomi proces wdrożenia (szczegóły widoczne w zakładce *Actions*). Po około 1–2 minutach na samej górze sekcji *Settings -> Pages* pojawi się zielona informacja z linkiem do wdrożonej aplikacji.

**Adres Wdrożonej Strony:**
[https://jnbdx.github.io/umw-inz-sem6_cw-TechMob-Bot/](https://jnbdx.github.io/umw-inz-sem6_cw-TechMob-Bot/)

---

## 5. Instrukcja uruchomienia lokalnego i dane testowe

### 5.1. Uruchomienie lokalne
Aby uruchomić aplikację na lokalnym komputerze (z obsługą modułów ES6, które ze względów bezpieczeństwa przeglądarek CORS wymagają uruchomienia przez serwer HTTP, a nie bezpośrednio z pliku `file://`):
1. Pobierz kod źródłowy repozytorium.
2. Uruchom prosty lokalny serwer HTTP w głównym katalogu projektu:
   - Z użyciem Pythona:
     ```bash
     python3 -m http.server 8000
     ```
   - Z użyciem Node.js (np. live-server lub http-server):
     ```bash
     npx live-server
     ```
3. Otwórz w przeglądarce adres `http://localhost:8000` (lub inny port wskazany przez serwer).

### 5.2. Dane Logowania (Konto Testowe)
Dla celów szybkiego testowania aplikacji wdrożono domyślne konto użytkownika:
* **Nazwa użytkownika:** `admin`
* **Hasło:** `admin123`

Możliwe jest również automatyczne zalogowanie do aplikacji w celach demonstracyjnych (bypass) poprzez dodanie parametru w URL:
`http://localhost:8000/?demo=true`






