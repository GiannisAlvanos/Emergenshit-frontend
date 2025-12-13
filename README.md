EmergenSh!t – Frontend

Εφαρμογή React για τον εντοπισμό, αξιολόγηση και ανάδειξη δημόσιων και ιδιωτικών τουαλετών.
Το frontend επικοινωνεί με το backend API (Node.js + Express + MongoDB) και παρέχει μια πλήρη εμπειρία χρήστη με λειτουργίες:

Αναζήτηση τουαλετών

Προβολή τοποθεσίας σε διαδραστικό χάρτη

Δημιουργία λογαριασμού & Login

Προσθήκη νέας τουαλέτας

Προβολή λεπτομερειών τουαλέτας

Reviews με πολυδιάστατη βαθμολόγηση

Like / Dislike σε reviews

Admin panel για έγκριση νέων τουαλετών.


-----------------------------------------------------------------------------------

Εγκατάσταση:
Clone το project
git clone https://github.com/your-repo/emergenshit-frontend.git
cd emergenshit-frontend
npm install

Δημιούργησε ένα αρχείο .env:
VITE_API_BASE=http://localhost:4000/api
VITE_GOOGLE_MAPS_KEY=PUT_YOUR_KEY_HERE

npm run dev
Η εφαρμογή θα ανοίξει στο: http://localhost:5173/

-----------------------------------------------------------------------------------

Σύνδεση με Backend

Το frontend χρησιμοποιεί το αρχείο:

src/api/api.js

Για να καλέσει endpoints όπως:

GET    /api/toilets
POST   /api/reviews
POST   /api/reviews/:id/like
POST   /api/auth/login
POST   /api/toilets

Το JWT token αποθηκεύεται και διαχειρίζεται μέσω:

AuthContext.jsx


Κύριες Λειτουργίες:
1)Home Page

Εμφάνιση λίστας τουαλετών

Χάρτης με markers

Δυνατότητα επιλογής τουαλέτας

2)Toilet Details Page

Εμφάνιση πληροφοριών

Αξιολόγηση με 5 διαφορετικά rating categories:

Overall

Cleanliness

Amenities

Spaciousness

Layout

Υποβολή review

Like / Dislike reviews

3)Add Toilet

Φόρμα προσθήκης τουαλέτας

Αποστολή στο backend

Αναμονή για admin approval

4)Authentication

Login

Register

Auto–redirect όταν απαιτείται login

5)Admin Panel

Λίστα μη εγκεκριμένων τουαλετών

Έγκριση / απόρριψη


Routing

Το App.jsx περιλαμβάνει:

Public routes

Protected routes μέσω PrivateRoute

Παράδειγμα:

<Route path="/add" element={<PrivateRoute><AddToilet/></PrivateRoute>} />


This project is part of a university assignment.
Not intended for commercial distribution.