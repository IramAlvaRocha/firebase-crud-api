import { env } from "@/config/env.js";
import { cert, getApps, initializeApp } from "firebase-admin";
import { getAuth } from "firebase-admin/auth";

const apps = getApps();

const firebaseApp = apps.length === 0 
    ? initializeApp({
        credential: cert({
            projectId: env.firebase.projectId,
            clientEmail: env.firebase.clientEmail,
            privateKey: env.firebase.privateKey
        }),
    })
    : apps[0]!;

export const firebaseAuth = getAuth(firebaseApp);