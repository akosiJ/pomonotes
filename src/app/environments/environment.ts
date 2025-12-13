/**
* Application environment configuration (development)
*
* IMPORTANT: Do NOT commit real API keys for production. Use
* `src/environments/firebase.keys.ts` locally (gitignored) or inject via CI.
*/
export const environment = {
    production: false,
    // Provide firebase configuration values here or create a local
    // `src/environments/firebase.keys.ts` (gitignored) based on
    // `firebase.keys.example.ts`.
    firebase: {
        apiKey: "AIzaSyBImBsw6l3AjH0G7kyYJKYc0gh9gbi4zBM",
        authDomain: "pomonotes-ad1a0.firebaseapp.com",
        projectId: "pomonotes-ad1a0",
        storageBucket: "pomonotes-ad1a0.firebasestorage.app",
        messagingSenderId: "471822612258",
        appId: "1:471822612258:web:2c0281c697829cacf0d77b",
        measurementId: "G-1Z8JXTTK0T"
    }
};

