import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

// Lazy-initialize messaging only when the browser supports it.
// getMessaging() throws in unsupported browsers (e.g. Safari, some mobile),
// which would crash the entire app and show a white screen.
let messagingInstance = null;

async function getMessagingInstance() {
  if (messagingInstance) return messagingInstance;
  try {
    const supported = await isSupported();
    if (supported) {
      messagingInstance = getMessaging(app);
      return messagingInstance;
    }
  } catch (err) {
    console.warn('Firebase Messaging is not supported in this browser:', err);
  }
  return null;
}

export const requestForToken = async () => {
  try {
    const messaging = await getMessagingInstance();
    if (!messaging) return null;

    const currentToken = await getToken(messaging, { 
        // VAPID key is optional if setup via manifest or standard defaults, but typically required for web push.
        // If the user hasn't generated a VAPID key, it might still work in some browsers, but we will leave it default for now.
    });
    if (currentToken) {
      return currentToken;
    } else {
      console.log('No registration token available. Request permission to generate one.');
      return null;
    }
  } catch (err) {
    console.log('An error occurred while retrieving token. ', err);
    return null;
  }
};

export const onMessageListener = () =>
  new Promise((resolve, reject) => {
    getMessagingInstance()
      .then((messaging) => {
        if (!messaging) {
          // Messaging not supported — resolve with empty so the app doesn't hang
          resolve({});
          return;
        }
        onMessage(messaging, (payload) => {
          resolve(payload);
        });
      })
      .catch(reject);
  });
