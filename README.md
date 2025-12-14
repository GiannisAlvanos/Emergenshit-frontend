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
-----------------------------------------------------------------------------------------------
(Παραδοτεο 2)

Testing Strategy (Frontend – E2E)

Για τον έλεγχο της ορθής λειτουργίας του frontend έχουν υλοποιηθεί End-to-End (E2E) acceptance tests με χρήση του Cypress.

Τα tests καλύπτουν 3 διαφορετικές Ροές Χρήστη (User Flows), οι οποίες συνολικά καλύπτουν όλες τις βασικές οθόνες της εφαρμογής.

Εργαλεία:

 - Cypress

 - Cypress Fixtures

 - Cypress Requests (API setup)

Για την εκτέλεση των Tests χρησιμοποιείται η εντολή

npm run cypress:run
ή για interactive mode:
npm run cypress:open
--------------------------------------------------------------------------------------------------
Υλοποιημένα User Flows

Flow 1 – Happy Path: Προσθήκη Νέας Τουαλέτας:

	Login χρήστη

	Πλοήγηση στη σελίδα Add Toilet

	Συμπλήρωση φόρμας (όνομα, περιγραφή, τοποθεσία, amenities)

	Επιτυχής υποβολή

	Εμφάνιση επιβεβαιωτικού μηνύματος

	Redirect στη Home page

Flow 2 – Happy Path: Δημιουργία Review:

	Δημιουργία ενεργής τουαλέτας μέσω API

	Πλοήγηση στη σελίδα λεπτομερειών

	Υποβολή review με όλα τα rating fields

	Επιβεβαίωση εμφάνισης του review

Flow 3 – Unhappy Path: Ελλιπή Δεδομένα:

	Απόπειρα υποβολής φόρμας χωρίς τοποθεσία

	Εμφάνιση κατάλληλου μηνύματος σφάλματος

	Αποτυχία υποβολής

Τα tests βρίσκονται στον φάκελο:

cypress/e2e/
-----------------------------------------------------------------------------------------------------------

CI/CD Pipeline (GitHub Actions)

Το frontend διαθέτει CI/CD pipeline μέσω GitHub Actions, το οποίο εκτελείται αυτόματα σε κάθε push ή pull request προς το main branch.

Τι περιλαμβάνει το pipeline:

	Install dependencies

	Build του React app

	Εκτέλεση Cypress E2E tests

	Deploy στο Render (μόνο αν όλα τα tests περάσουν επιτυχώς)

Αρχείο workflow:

.github/workflows/frontend.yml
------------------------------------------------------------------------------------------------------------

Deployment (Render):

Το frontend έχει γίνει deploy στο Render ως Static Web Service.

Ρυθμίσεις:

Build Command:

npm install && npm run build


Publish Directory:

dist

Environment Variables (Render / GitHub Secrets)

Τα ευαίσθητα δεδομένα ΔΕΝ αποθηκεύονται στο repository.

Χρησιμοποιούνται:

Render Environment Variables

GitHub Actions Secrets

VITE_API_BASE=https://emergenshit-backend-1.onrender.com/
VITE_GOOGLE_MAPS_KEY=your_google_maps_api_key

Environment Variables & Ασφάλεια

Το αρχείο .env:

ΔΕΝ ανεβαίνει στο GitHub

Περιλαμβάνεται στο .gitignore

Όλα τα production secrets:

Δηλώνονται στο Render

Δηλώνονται στα GitHub Actions Secrets για το CI/CD pipeline

URL
https://emergenshit-frontend.onrender.com/