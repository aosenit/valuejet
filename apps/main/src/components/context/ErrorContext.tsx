import React, {
  createContext,
  useContext,
  type ReactNode,
  useMemo,
  useCallback,
} from "react";

interface ErrorContextType {
  showSessionExpiredDialog: () => void;
  hideSessionExpiredDialog: () => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const useError = (): ErrorContextType => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useError must be used within an ErrorProvider");
  }
  return context;
};

interface ErrorProviderProps {
  children: ReactNode;
  onSessionExpired?: () => void;
}

export const ErrorProvider: React.FC<ErrorProviderProps> = ({
  children,
  onSessionExpired,
}) => {
  const showSessionExpiredDialog = useCallback(() => {
    // This will be handled by the SessionExpiredHandler component
  }, []);

  const hideSessionExpiredDialog = useCallback(() => {
    // This will be handled by the SessionExpiredHandler component
  }, []);

  const contextValue = useMemo(
    () => ({
      showSessionExpiredDialog,
      hideSessionExpiredDialog,
    }),
    [showSessionExpiredDialog, hideSessionExpiredDialog]
  );

  return (
    <ErrorContext.Provider value={contextValue}>
      {children}
    </ErrorContext.Provider>
  );
};
