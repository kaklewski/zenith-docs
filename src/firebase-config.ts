// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Taken from: https://console.firebase.google.com/project/zenith-docs/settings/general/web:NDI0MmMzYWItNTZkZS00ODJkLTk2YTEtMGExYjBlOTljYjQ2

// Provide your own api key
const firebaseApiKey = import.meta.env.VITE_API_KEY

const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: 'zenith-docs.firebaseapp.com',
  projectId: 'zenith-docs',
  storageBucket: 'zenith-docs.firebasestorage.app',
  messagingSenderId: '190928213728',
  appId: '1:190928213728:web:58dc47c5229690ab6fa285',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
