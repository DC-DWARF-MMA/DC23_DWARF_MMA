import { createContext, useState, useMemo, useContext } from "react";

type ProcessContextType = {
  processId: string,
  setProcessId: (processId: string) => void;
};

const ProcessContext = createContext<ProcessContextType | undefined>(undefined);

export function ProcessProvider({ children }: { children: React.ReactNode }) {
    const [processId, setProcessId] = useState<string>("");

  const ctx = useMemo(
    () => ({
      processId: processId,
      setProcessId: setProcessId,
    }),
    [processId, setProcessId]
  );
  return <ProcessContext.Provider value={ctx}>{children}</ProcessContext.Provider>;
}

export function useProcess() {
  const ctx = useContext(ProcessContext);
  if (ctx === undefined) {
    throw new Error("error");
  }
  return ctx;
}
