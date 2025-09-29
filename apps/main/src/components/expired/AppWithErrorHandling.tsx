import React from "react";

import { SessionExpiredHandler } from "./SessionExpiredHandler";

interface AppWithErrorHandlingProps {
  children: React.ReactNode;
}

export const AppWithErrorHandling: React.FC<AppWithErrorHandlingProps> = ({
  children,
}) => {
  return (
    <>
      {children}
      <SessionExpiredHandler />
    </>
  );
};
