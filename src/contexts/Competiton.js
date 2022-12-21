import { createContext, useCallback, useState } from "react";

const Context = createContext({
  readyStatus: 0,
  changeReadyStatus: () => {},
});

const CompetitionStore = ({ children }) => {
  const [readyStatus, setReadyStatus] = useState(0);

  const changeReadyStatus = useCallback((status) => {
    setReadyStatus(status);
  }, []);

  return (
    <Context.Provider value={{ readyStatus, changeReadyStatus }}>
      {children}
    </Context.Provider>
  );
};

export { CompetitionStore };

export default Context;
