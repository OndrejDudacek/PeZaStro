# Výstup č.1

- změna struktury, aby se dala implementovat DI a typeorm
  - entity, routery, services
- predelani modelu na entities pro type orm a reseni problemu s pouzitim jedne entity pro inmemory i typerom
- vytvoreni repositories pro zdroje pro inmemory a pg
- vytvoreni services na buissnes logiku
- DiDbContainer na rozhodovani co za repo se inicializuje
- App Data source
- upraveni endopintu
- vytvoření lokální testovací pg databáze

# Výstup č.2

- vytvoření findByUsername kvuli autentifikaci
- login middleware
  - nedostaval jsem username, chyba v konstruktoru
- auth middleware
- unikatnost usernamů
  - unigue na tabulce a check v repozitarich
  - check v service
- hoppscotch - variables, auth header
- pridani try catch do routeru
- hashovaní hesel s použitím bcryptu
- cli na vytváření nových userů
- helmet, rateLimiter

# Výstup č.3

- rozdeleni na server-client
- inicializace vue
- icon comonenta s material desing vecma
- add reset for consistency acres browsers
- tlacitko s iconami
- text input
- number intput
- select input
- textarea
- zprovoznen router
- header, main, aside, nav, linky v app
- detaily zakazniku, lokaci, zakazek, praci
- tabulky zakazniku, lokaci, zakazek, praci
- zmena number inputu a text inputu na generic input s nastavitelnym typem

# Výstup č.4

- openapi docs, aby se mi hezky delal frontend (api service, typy atd)
- typy na odchozí o příchozí data
- pinia pro usery s id, username, token a funkcemi: onlogout, onlogin, retrivieUser a checkLogin
- apiClient - obal se samotným fetchem, řeší chyby
- jednotlivé services - řeší logiku a komunikaci přes apiClient pro jednotlivé zdroje
- (+ user service s login a logout)
- login page
- checkovani, jestli je clovek prihlaseny \texttt{v routeru beforeEach}
- logout a smerovani na login pro error 401 a checkovani a tahani z localstorage pri startovani pinie (package)
- pinia-plugin-persistedstate na automaticke ukladani useru do lokal storage a z local sotrage do pinie
- services pro jednotlive zdroje
- adress postal code v location na number s poctem charakteru pet ze stringu
- pridani barevnych variant (danger) a varianty (success) - zmena barvy a u success i zmena ikony pokud je, u buttonu, inputů a textearey
- debounce a implementace zmen barev
- cesty na detaily v paramterech (ne jako cesta kvzuli tomu ze by na to mela byt vlastni stanka a ja to mam jako jen cast stranky)
- idDisplayer - zkracovani kopirovani na kliknuti a odkazy z idecek
