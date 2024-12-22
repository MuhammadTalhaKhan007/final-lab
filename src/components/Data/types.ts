import { ReactNode } from "react";

export interface UseCheckDeviceInFirebaseResult {
    deviceExists: boolean | null;
    loading: boolean;
    error: Error | string | null;
}
export interface AppState {
    deviceId: string | null;
    saveDeviceId: () => void;
}

export interface AppProviderProps {
    children: ReactNode;
}

export interface userRegistration {
    patientId: string;
    name: string;
    email: string;
    password: string;
    role: "patient";
    gender: "Male" | "Female" | "Other";
}