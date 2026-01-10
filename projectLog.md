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
