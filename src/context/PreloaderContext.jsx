import React, { createContext, useContext, useState, useCallback } from 'react';

const PreloaderContext = createContext({ isLoaded: false, onLoaded: () => {} });

export function PreloaderProvider({ children }) {
  const [isLoaded, setIsLoaded] = useState(false);

  const onLoaded = useCallback(() => setIsLoaded(true), []);

  return (
    <PreloaderContext.Provider value={{ isLoaded, onLoaded }}>
      {children}
    </PreloaderContext.Provider>
  );
}

export function usePreloader() {
  return useContext(PreloaderContext);
}
