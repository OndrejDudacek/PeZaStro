# Výstup č. 2

- [x] Container
- [x] Vytvořit pg db a pripojit se k ni
- [x] Contact
  - [x] Entity - staticka trida pro vytvareni, instance se tvori v repository pak se vraci do service a pokud s tim service neco udela vraci se zpatky do repo a uklada se
  - [x] Service
  - [x] Router
  - [x] Proc mi to nevraci id
- [x] Nova struktura pro vsechny zdroje
- [ ] ? relace v entities
- [x] napsat zpravu k prvnimu vystupu
- [ ] napsat testy endpointu

# Výstup č. 2

- [x] login middleware
  - [x] kam mizí usernmae
- [x] login endpoint
- [x] userSchema a validace
- [x] auth middleware
- [x] vytvořit findByUsername v repositařich
- [x] zajištění unikátnosti usernamů v User
  - [x] v service
  - [x] v pg (unique a check)
- [x] hashovani hesel
- [x] catchovani erroru v routerech
- [ ] https enforce
- [x] helmet a rate limit
- [x] cors
- [x] cli na vytvaření userů

# Výstup č. 3

- [x] tabulky jednotlivych veci - stranky
- [x] css variables
- [x] reset
- [x] basic app elements - header, aside, main, nav
- [x] komponenty
  - [x] tlacitka
  - [x] texty
  - [x] text area
  - [x] detaily jednotlivych veci
  - [x] icony
  - [x] select input

# Výstup č. 4

- [ ] tahani relaci (mam v child id na rodice ne opacne)
- [ ] vytvareni novych veci
  - [ ] vyresit jak vytvaret jen neco
- [ ] api service nebo neco takovyho
  - [x] apiClient
  - [x] auth/user service
  - [ ] services pro jednotlive zdroje
- [x] user store on pinia
- [x] pri ukladani do local storage tak ulozit i cas ulozeni a pokud se bude od aktualniho casu retrevovani lisit o vic nez vyprchava token tak smazat a delat ze tam zadny nebyl
- [x] presunout retrieve user do user service a v loginview a v app.vue volat veci jen z userService
- [ ] pri unauthorized erroru logout a redirect na login page (mozna v logoutu rovnou redirect na login page)
- [x] login page
- [x] typy a DTO
- [ ] responzivita
- [x] API docs (openApi)
