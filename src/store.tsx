import React, { createContext, useContext, useState } from 'react'

interface State {
  title: string;
}

interface Props {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
}

const AppStateContext = createContext<Props | null>(null);

export const AppStateProvider: React.FC<Props> = ({ children }) => {
  const [state, setState] = useState<State>({
    title: "teleport-project-react"
  });

  return (
    <AppStateContext.Provider value={{ state, setState }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
    const context = useContext(AppStateContext)
    if (context === undefined) {
        throw new Error('AppState is missing.')
    }
    return context
}      
