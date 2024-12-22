// AppContext.tsx
import React, { createContext, useState, useEffect } from "react";
import * as Device from "expo-device";
import * as Application from "expo-application";
import { AppState, AppProviderProps } from "../components/Data/types";

export const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: AppProviderProps) => {
  const [deviceId, setDeviceId] = useState<string | null>(null);

  const saveDeviceId = () => {
    const id = `${Device.modelId}_${Application.applicationId}_${Device.osBuildId}`;
    setDeviceId(id);
  };

  useEffect(() => {
    saveDeviceId();
  }, []);

  return (
    <AppContext.Provider value={{ deviceId, saveDeviceId }}>
      {children}
    </AppContext.Provider>
  );
};
