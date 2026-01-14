# Beauty Loyalty App – Angular & Node.js

Beauty Loyalty App je frontend–backend spletna aplikacija, razvita v okviru
fakultetnega projekta.  
Aplikacija simulira **lojalnostni sistem** za beauty trgovino, kjer se uporabniki
registrirajo, prijavijo in spremljajo svoje točke ter nagrade.

Projekt je zasnovan tako, da je **realističen, a enostaven**, in sledi pristopu,
ki je bil uporabljen pri laboratorijskih vajah.
<img width="1917" height="1197" alt="image" src="https://github.com/user-attachments/assets/2e69b007-72d5-430b-a24f-0bb7c7475966" />

---


### Frontend
- Angular 19
- Standalone komponente + AppModule (hibridni pristop)
- Angular Router
- Reactive Forms
- HTTP Client
- JWT avtentikacija (AuthGuard + Interceptor)

### Backend
- Node.js
- Express
- JSON Web Token (JWT)
- Simulirana baza podatkov (JSON datoteke)
- Backend temelji na Contacts App iz vaj in je prilagojen projektu

---

## Struktura projekta

### Frontend (Angular)
/src
/app
/core
/auth
auth.service.ts
auth.guard.ts
auth.interceptor.ts
/pages
/login
/register
/dashboard


### Backend (Node.js / Express)


/Contacts-Server
/app-api
/controllers
/routes
/database
users.json
users_index.json
server.js


Frontend in backend se zaganjata **ločeno** in komunicirata preko REST API-ja.

---

## vtentikacija in avtorizacija

- Registracija in prijava potekata preko backend API-ja
- Po uspešni prijavi backend vrne **JWT token**
- Token se shrani v `localStorage`
- HTTP Interceptor samodejno doda token v `Authorization` header
- AuthGuard ščiti dostop do `/dashboard` poti

---

##  Funkcionalnosti aplikacije

- Registracija uporabnika
-  Prijava uporabnika
-  Odjava (logout)
-  Zaščiten dashboard
-  Prikaz loyalty točk in tier-a
-  Prikaz seznama nagrad (UI)
-  Frontend–backend komunikacija
-  JWT zaščita API poti

---

##  Zagon aplikacije

###  Zagon backend-a

```bash
cd Contacts-Server
npm install
npm start


Backend teče na:

http://localhost:3000

- Zagon frontend-a
npm install
ng serve


Frontend teče na:

http://localhost:4200

- API poti (backend)
Metoda	Pot	Opis
POST	/api/signup	Registracija novega uporabnika
POST	/api/login	Prijava uporabnika
GET	/api/dashboard	Zaščiteni podatki za dashboard
POST	/api/redeem/:id	Unovčenje nagrade
- Baza podatkov

Za potrebe projekta je uporabljena simulirana baza podatkov, shranjena
v JSON datotekah:

users.json – podatki o uporabnikih

users_index.json – indeks za generiranje ID-jev

Takšen pristop je bil uporabljen tudi pri laboratorijskih vajah in je primeren
za demonstracijo delovanja backend-a brez prave baze.

- Namen projekta

Cilj projekta je:

prikaz pravilne frontend arhitekture v Angularju

povezava Angular aplikacije z backend REST API-jem

uporaba JWT avtentikacije in avtorizacije

praktična uporaba znanja iz vaj v realističnem primeru

- Avtor

Študentski projekt – Fakulteta
Frontend: Angular
Backend: Node.js + Express
