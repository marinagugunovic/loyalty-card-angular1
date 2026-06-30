3. naloga - Flask



odgovor 3: from flask import Flask, render_template, request, redirect, url_for
import secrets

app = Flask(__name__)

# Primer pravilne kombinacije
VALID_USERNAME = "admin"
VALID_PASSWORD = "1234"

# Shranimo token -> username
active_users = {}


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")

        if username == VALID_USERNAME and password == VALID_PASSWORD:
            random_string = secrets.token_urlsafe(16)
            active_users[random_string] = username

            return redirect(url_for("success", random_string=random_string))

        else:
            return redirect(url_for("failure"))

    return render_template("login.html")


@app.route("/success/<random_string>/")
def success(random_string):
    username = active_users.get(random_string)

    if username is None:
        return redirect(url_for("failure"))

    return f"zdravo, {username}"


@app.route("/failure")
def failure():
    return "Napačen username ali password."


if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)


    HTML:   

<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
</head>
<body>
    <h2>Prijava</h2>

    <form method="POST" action="/login">
        <label>Username:</label>
        <input type="text" name="username">

        <br><br>

        <label>Password:</label>
        <input type="password" name="password">

        <br><br>

        <button type="submit">Login</button>
    </form>
</body>
</html>

python: 

app.run(debug=True, use_reloader=False)

Spomnite se 2. naloge pri flask-vajah: S flask napiˇsite program za login.
Program naj preveri, da je kombinacija username : password pravilna. Imate torej tri
funkcije: funkcija na /login ima template login.html. Preko obrazca prejmemo username
in password. Funkcija naj preveri, ali sta pravilna. Ce sta pravilna, naj uporabnika ˇ
preusmeri na /success/<token>/<username>, kjer je <token> nakljuˇcno generiran
string. Na temu linku pa naj spletna stran pozdravi: “zdravo, (username)” (kot na
vajah). Ce username ali passoword nista OK, pa naj ga preusmeri na ˇ /failure.


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
<img width="1910" height="1152" alt="image" src="https://github.com/user-attachments/assets/7b482313-0523-4263-90ab-eeb5c9533bde" />

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
<img width="1700" height="1076" alt="image" src="https://github.com/user-attachments/assets/2ce6b98c-4b47-4f06-9af6-8be07526db7d" />

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
