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

## 3. Prezentacja działania i zrzuty ekranu (Lokalne Testy)

Aby udokumentować poprawne działanie chatbota, uruchomiłem lokalny serwer testowy i przeprowadziłem automatyczną sesję testową z użyciem przeglądarki w trybie bezgłowym (headless). Wszystkie zrzuty ekranu oraz szczegółowy opis przepływu danych (flow) umieściłem w dedykowanym katalogu `pokaz_dzialania/`.

Poniżej przedstawiam podsumowanie zrzutów ekranu obrazujących kluczowe stany aplikacji:

### 3.1. Ekran powitalny (`pokaz_dzialania/welcome.png`)
Pokazuje stan czatu tuż po wejściu na stronę (czysty stan LocalStorage). Bot wyświetla komunikat powitalny i sugeruje szybkie tagi pogodowe na dole okna.

### 3.2. Wyszukiwanie pogody w mieście (`pokaz_dzialania/city_search.png`)
Prezentuje sytuację, w której wpisałem nazwę miasta "Bydgoszcz". Aplikacja odpytuje moduł API (symulacja danych), po czym dobiera optymalną rekomendację stroju (kurtka z membraną, parasolka, buty trekkingowe) na temperaturę 7°C i deszcz.

### 3.3. Analiza wpisu użytkownika (`pokaz_dzialania/weather_description.png`)
Przedstawia analizę ręcznego opisu pogody: *"Jest 7 stopni i pada deszcz"*. Parser RegEx poprawnie wyciąga temperaturę i flagę opadów, a chatbot generuje precyzyjną odpowiedź ubraniową.

### 3.4. Motyw ciemny (`pokaz_dzialania/dark_mode.png`)
Pokazuje działanie Dark Mode oraz zachowanie interfejsu przy zapytaniu o ciepłą, letnią pogodę (*"Słonecznie i 25 stopni"*). Ustawienie motywu jest trwale zapamiętywane w pamięci przeglądarki.

Szczegółowy diagram przepływu danych i techniczny opis architektury flow znajduje się bezpośrednio w pliku [pokaz_dzialania/flow_aplikacji.md](pokaz_dzialania/flow_aplikacji.md).

## 4. Przejście na w pełni bezkluczykowe API pogodowe i usunięcie panelu ustawień

Zgodnie z wymaganiami, aby aplikacja działała natychmiast po uruchomieniu bez konieczności rejestracji i wklejania jakichkolwiek kluczy API, dokonałem refaktoryzacji kodu:
- **Pełna integracja z Open-Meteo API**: Czat pobiera teraz dane w czasie rzeczywistym bezpośrednio z darmowego i otwartego API Open-Meteo. Zapytanie najpierw geokoduje nazwę miasta do współrzędnych geograficznych (szerokość/długość geograficzna), a następnie pobiera aktualną temperaturę, wiatr i kod pogodowy WMO.
- **Usunięcie panelu konfiguracji API**: Całkowicie wyczyściłem z kodu (HTML/CSS/JS) modalne okno ustawień oraz przyciski do zapisywania klucza OpenWeather. Zapobiega to jakimkolwiek błędom ładowania oraz eliminuje potrzebę konfiguracji po stronie użytkownika.
- **Rozwiązanie błędu inicjalizacji**: Naprawiłem błąd JS (NullPointerException) związany z bindowaniem zdarzeń do nieistniejącego już przycisku ustawień, dzięki czemu chatbot i wszystkie jego interaktywne funkcje (wysyłanie wiadomości, Enter, przełącznik motywu) działają teraz w 100% poprawnie.
- **Automatyczny fallback**: W przypadku problemów z siecią lub braku odpowiedzi z serwera Open-Meteo, chatbot płynnie przełącza się na wbudowaną bazę symulacyjną (mock/random) dla polskich miast, gwarantując niezawodność działania.





