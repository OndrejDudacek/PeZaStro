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
- [ ] css variables
- [x] reset
- [x] basic app elements - header, aside, main, nav
- [ ] komponenty
  - [x] tlacitka
  - [x] texty
  - [x] text area
  - [x] detaily jednotlivych veci
  - [x] icony
  - [x] select input

# Výstup č. 4

- [ ] po kliknuti na policko v db se presuneme na stranku source/id a zobrazi se detailnejsi info
  - [ ] tahani relaci (mam v child id na rodice ne opacne)
- [ ] vytvareni novych veci
  - [ ] vyresit jak vytvaret jen neco
