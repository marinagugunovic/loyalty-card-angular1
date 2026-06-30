Marina
zadatak 1

Maki

Naloga 1: Spomnimo se naloge iz vaj, kjer smo poˇsiljali sporoˇcila s headerji. Takrat
smo vsako sporoˇcilo pospremili z informacijo o njegovi velikosti. Tokrat bo komunikacija
client-server podobna:
• Najprej client poˇslje serverju 5 bytno obvestilo o tem, koliko sporoˇcil mu ˇzeli poslati,
recimo, da je to ˇstevilo N.
• Nato client serverju poˇslje ˇse N 5-bytnih sporoˇcil, vsako od njih sporoˇca velikost
i-tega sporoˇcila v bytih.
• Clinet nato poˇslje ˇse vseh N sporoˇcil serverju.
• Server pravilno prebere vsa sporoˇcila (self.request.recv(package size) se mora
ujemati s ˇstevilom poslanih bajtov) in jih prikaˇze pri sebi (preprost print).
Torej: z uporabo knjiˇznic socket in/ali socketserver napiˇsite program za uporabnika, ki
poˇsilje sporoˇcilo, ter program za streˇznik, ki prejeme sporoˇcilo, vse skupaj kot je
specificirano zgoraj.



 odgovor na prvo server code:import socketserver

HOST = "localhost"
PORT = 12345

HEADER_SIZE = 5

def recv_exact(sock, size):
    data = b""
    while len(data) < size:
        packet = sock.recv(size - len(data))
        if not packet:
            raise ConnectionError("Povezava je prekinjena.")
        data += packet
    return data


class MyServer(socketserver.BaseRequestHandler):
    def handle(self):
        # 1. Preberemo 5-bytno obvestilo: koliko sporočil pride
        n_bytes = recv_exact(self.request, HEADER_SIZE)
        N = int(n_bytes.decode())

        print(f"Client bo poslal {N} sporočil.")

        # 2. Preberemo N headerjev, vsak je 5 bytov in pove velikost sporočila
        sizes = []
        for i in range(N):
            size_bytes = recv_exact(self.request, HEADER_SIZE)
            size = int(size_bytes.decode())
            sizes.append(size)

        print("Velikosti sporočil:", sizes)

        # 3. Preberemo vseh N sporočil
        for i, size in enumerate(sizes):
            message_bytes = recv_exact(self.request, size)
            message = message_bytes.decode("utf-8")
            print(f"Sporočilo {i+1}: {message}")


server = socketserver.TCPServer((HOST, PORT), MyServer)

print(f"Server teče na {HOST}:{PORT}")
server.serve_forever()



Client code: import socket

HOST = "localhost"
PORT = 12345

HEADER_SIZE = 5

def make_header(number):
    return str(number).zfill(HEADER_SIZE).encode()


messages = [
    "Zdravo server",
    "Ovo je drugo sporočilo",
    "Konec komunikacije"
]

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as client:
    client.connect((HOST, PORT))

    # 1. Pošljemo število sporočil N kot 5 bytov
    N = len(messages)
    client.sendall(make_header(N))

    # 2. Pošljemo N 5-bytnih headerjev z velikostjo vsakega sporočila
    encoded_messages = []

    for msg in messages:
        encoded = msg.encode("utf-8")
        encoded_messages.append(encoded)

        size = len(encoded)
        client.sendall(make_header(size))

    # 3. Pošljemo vsa sporočila
    for encoded in encoded_messages:
        client.sendall(encoded)

print("Client je poslal vsa sporočila.")

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
