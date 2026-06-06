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

## 4. Refaktoryzacja: Przejście na w pełni bezkluczykowe API pogodowe i usunięcie panelu ustawień

W toku prac zdecydowałem o całkowitym usunięciu konieczności podawania klucza API OpenWeather i uproszczeniu architektury aplikacji pod kątem wygody użytkownika końcowego. Poniżej przedstawiam szczegółowe uzasadnienie, zakres dokonanych zmian oraz techniczne wnioski.

### 4.1. Dlaczego wprowadzono zmiany? (Uzasadnienie)
1. **Wymóg natychmiastowego działania (Out-of-the-box)**: Wmuszanie na użytkowniku rejestracji w zewnętrznym serwisie (OpenWeather) i generowania klucza API znacznie podnosiło próg wejścia. Aplikacja powinna działać natychmiast po uruchomieniu lokalnym lub w chmurze bez żadnej wstępnej konfiguracji.
2. **Krytyczny błąd inicjalizacji JS (NullPointerException)**: Usunięcie przycisku ustawień (zębatki) z interfejsu przy jednoczesnym pozostawieniu starych dowiązań zdarzeń (`addEventListener`) w kodzie JavaScript powodowało rzucenie błędu w konsoli przeglądarki podczas ładowania strony. Ten błąd paraliżował działanie całej logiki czatu (nie działało wysyłanie wiadomości ani przełącznik motywu).
3. **Czystość kodu i minimalizm**: Skoro aplikacja przechodzi na w pełni darmowe, niewymagające rejestracji API, utrzymywanie kodu modalnego oraz funkcji pomocniczych do zapisu klucza w LocalStorage stało się zbędnym długiem technologicznym.

### 4.2. Co dokładnie zostało zmienione?
Przeprowadziłem gruntowne czyszczenie kodu we wszystkich warstwach aplikacji:
- **[index.html](file:///home/devai/Documents/umwb-sem6-cw-bot/index.html)**: Usunąłem cały blok kodu HTML odpowiedzialny za modal ustawień (`#settings-modal`), formularze wprowadzania klucza API oraz przycisk zapisu. Nagłówek czatu pozostał minimalistyczny, zawierając jedynie przełącznik motywu graficznego.
- **[style.css](file:///home/devai/Documents/umwb-sem6-cw-bot/style.css)**: Wyciąłem ponad 190 linii kodu CSS powiązanego ze stylem okna modalnego, nakładki rozmywającej tło (`.modal-overlay`), pól formularzy oraz animacji wyskalowania modala (`@keyframes modalScaleIn`).
- **[js/chatUI.js](file:///home/devai/Documents/umwb-sem6-cw-bot/js/chatUI.js)**: 
  - Usunąłem zmienne przechowujące referencje do elementów DOM powiązanych z ustawieniami.
  - Skasowałem listenery nasłuchujące kliknięć otwarcia, zamknięcia i zapisu ustawień (co całkowicie rozwiązało błąd `NullPointerException` i przywróciło działanie czatu).
  - Usunąłem funkcje sterujące modalem: `openSettings()`, `closeSettings()` oraz `handleSaveSettings()`.
- **[js/storage.js](file:///home/devai/Documents/umwb-sem6-cw-bot/js/storage.js)**: Usunąłem nieużywane funkcje eksportowe `saveApiKey(key)` oraz `getApiKey()`.
- **[js/weatherAPI.js](file:///home/devai/Documents/umwb-sem6-cw-bot/js/weatherAPI.js)**: Oczyszczono moduł z pozostałości po OpenWeatherMap. Jako główne i jedyne źródło dynamicznych danych pogodowych wdrożyłem **Open-Meteo API** (wykorzystujące dwuetapowy proces: najpierw darmowe geokodowanie nazwy miasta do współrzędnych lat/lon, a następnie pobieranie rzeczywistych warunków pogodowych).

### 4.3. Wnioski i Rekomendacje
1. **API bez kluczy to lepszy UX**: Wykorzystanie Open-Meteo pozwoliło zachować 100% dynamicznej funkcjonalności pobierania pogody z dowolnego miejsca na świecie bez obciążania użytkownika procesem rejestracji konta deweloperskiego.
2. **Architektura bezstanowa na froncie**: Przechowywanie kluczy API w `localStorage` przeglądarki klienta jest niebezpieczne i podatne na błędy (np. blokowanie zapytań przy nieaktywnym kluczu). Usunięcie tego mechanizmu poprawiło stabilność aplikacji.
3. **Niezawodność dzięki mechanizmowi Fallback**: Wbudowanie w silnik `weatherAPI.js` automatycznego przejścia na deterministyczną symulację pogody (mock) w przypadku problemów z połączeniem internetowym gwarantuje, że chatbot nigdy nie pozostawi użytkownika bez odpowiedzi.

## 5. Modernizacja wizualna w stylu iOS Glass (High-Fidelity Glassmorphism)

W celu nadania aplikacji wyjątkowego, nowoczesnego wyglądu zaimplementowałem pełną modernizację stylu wizualnego wzorowaną na interfejsie iOS (szkło akrylowe z głębią trójwymiarową):
- **Dynamiczne kule tła (Background Blobs)**: Dodałem dwa duże, kolorowe okręgi z radialnymi gradientami (różowo-fioletowym oraz niebiesko-morskim), które delikatnie pływają w tle strony dzięki animacjom `@keyframes floatBlob1` i `floatBlob2`. Kule te prześwitują przez półprzezroczystą kartę czatu, dając niesamowity efekt przestrzenny.
- **Ekstremalne rozmycie szkła**: Zwiększyłem rozmycie tła karty czatu (`backdrop-filter`) z 20px do 45px, co pozwala na idealne zasymulowanie matowego szkła akrylowego iOS. Krawędzie karty zyskały cienką, jasną obwódkę imitującą odbicie światła na szklanej krawędzi.
- **Dymki w stylu Apple iMessage**: Dymki wiadomości użytkownika otrzymały Apple Blue gradient (`#007aff` -> `#5856d6`) z zaokrąglonymi rogami i lekkim cieniem. Dymki bota to z kolei czyste, szklane bąbelki o wyższym kontraście, które idealnie pasują zarówno do trybu jasnego, jak i ciemnego.
- **Widgety i elementy formularzy**: Informacje o pogodzie (np. po wyszukaniu miasta) są teraz prezentowane jako elegancki, zaokrąglony widget pogodowy iOS (`border-radius: 16px;`), a pasek wprowadzania wiadomości przyjął formę gładkiej, zaokrąglonej kapsuły z okrągłym przyciskiem wysyłania.

## 6. Uwierzytelnianie użytkownika (Ekran Logowania)

W celu ograniczenia dostępu do bota i dodania podstawowej kontroli dostępu, zaimplementowałem prosty ekran logowania zintegrowany z interfejsem czatu:
- **Szklana karta logowania (Login Card)**: Ekran logowania jest w pełni spójny z resztą interfejsu i zrealizowany w stylu iOS Glassmorphism.
- **Uwierzytelnianie po stronie klienta (SPA)**: Logowanie odbywa się asynchronicznie. Przy udanej weryfikacji stan sesji jest zapisywany w `LocalStorage` jako `is_logged_in: true`, a widok logowania płynnie przełącza się na okno czatu bez przeładowywania strony.
- **Konto testowe**: Bezpośrednio pod formularzem umieściłem czytelną informację z danymi testowymi dla szybkiej weryfikacji:
  * Użytkownik: **admin**
  * Hasło: **admin123**
- **Przycisk wylogowania (Logout)**: W nagłówku czatu dodałem ikonę wylogowania, która czyści sesję w pamięci przeglądarki i błyskawicznie cofa użytkownika do ekranu logowania.
- **Bypass dla trybu demo/testowego**: Zmodyfikowałem plik `main.js`, aby przy testach automatycznych (uruchamianych z parametrem query `?demo=...`) użytkownik był logowany automatycznie. Pozwala to na poprawne działanie istniejących skryptów generujących zrzuty ekranu bez blokowania na ekranie autoryzacji.

## 7. Dodatkowe animacje tła (Wiatraczek i Jaskółki)

W celu podniesienia dynamiki i unikalności wizualnej interfejsu (efekt głębi za szkłem), dodałem subtelne, płynne animacje działające w tle:
- **Wirujący wiatraczek (Paper Pinwheel)**: W lewym dolnym rogu tła umieściłem delikatną makietę wiatraczka. Maszt został ostylizowany za pomocą gradientu, a sam wirnik z 4 zakrzywionymi łopatkami (SVG) kręci się płynnie i nieprzerwanie w tempie `14s` na pełny obrót dzięki animacji `@keyframes spinWindmill`.
- **Lecące jaskółki (Swallows)**: Wprowadziłem stado trzech jaskółek przelatujących nad taflą czatu od lewej do prawej krawędzi ekranu. Każdy ptak leci na innej wysokości, z inną prędkością (od `22s` do `32s`) oraz różnym opóźnieniem startowym, co tworzy naturalną perspektywę i poczucie trójwymiarowości.
- **Trzepotanie skrzydeł**: Sylwetki ptaków (SVG) posiadają organiczną animację trzepotania skrzydeł (`@keyframes birdFlap` wykorzystujące szybkie, naprzemienne przekształcenia `scaleY` i `skewX`), co doskonale symuluje prawdziwy ruch ptaka w powietrzu.
- **Dopasowanie kontrastu**: Zgodnie z wytycznymi WCAG, przezroczystość animacji w tle została ustawiona na bardzo niskim poziomie (`0.12` - `0.14` w trybie jasnym oraz `0.07` - `0.08` w trybie ciemnym), dzięki czemu ruch nie odciąga wzroku od czytania wiadomości i nie wpływa negatywnie na komfort użytkowania.

## 8. Publikacja i hosting za pomocą GitHub Pages

Ponieważ nasza aplikacja jest w pełni statycznym projektem (Pure HTML5/CSS3/Vanilla JS), idealnym, darmowym i najszybszym sposobem na jej publikację w sieci jest usługa **GitHub Pages**.

### 8.1. Instrukcja wdrożenia krok po kroku
Aby uruchomić aplikację online bezpośrednio z Twojego repozytorium GitHub, wykonaj poniższe czynności:
1. Wejdź na stronę swojego repozytorium na GitHubie: `https://github.com/jnbdx/umw-inz-sem6_cw-TechMob-Bot`.
2. Kliknij zakładkę **Settings** (Ustawienia) w górnym menu repozytorium.
3. W menu bocznym po lewej stronie znajdź sekcję *Code and automation* i kliknij pozycję **Pages**.
4. W sekcji **Build and deployment**:
   - Upewnij się, że jako **Source** wybrane jest: `Deploy from a branch`.
   - W sekcji **Branch** kliknij rozwijane menu (domyślnie `None`), wybierz branch **`main`**, a w polu wyboru katalogu pozostaw `/ (root)`.
   - Kliknij przycisk **Save** (Zapisz).
5. GitHub automatycznie uruchomi proces budowania i wdrażania (potrwa to około 1-2 minuty). Postęp możesz śledzić w zakładce **Actions** swojego repozytorium.
6. Po zakończeniu procesu, na samej górze strony **Settings -> Pages** pojawi się zielony komunikat z linkiem do Twojej działającej aplikacji online, np.:
   `https://jnbdx.github.io/umw-inz-sem6_cw-TechMob-Bot/`

### 8.2. Ważne uwagi techniczne
- **Obsługa modułów ES6**: GitHub Pages natywnie obsługuje i serwuje pliki JavaScript z poprawnym typem MIME (`application/javascript`), co oznacza, że modułowa struktura aplikacji (`type="module"`) działa bezbłędnie bez konieczności bundlowania (np. Webpackiem czy Vite).
- **Ścieżki relatywne**: Wszystkie odnośniki do plików JS, CSS oraz zasobów w projekcie zostały zrealizowane jako ścieżki relatywne (np. `./js/chatUI.js` zamiast `/js/chatUI.js`). Zapobiega to błędom ładowania zasobów, gdy strona jest hostowana w podkatalogu repozytorium (co jest standardem dla GitHub Pages).




