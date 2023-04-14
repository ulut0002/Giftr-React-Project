//create state variable
//to be used in single source of truth

import { useState, useEffect } from "react";

function useSessionStorage(key, initialState) {
  const [state, setState] = useState(() => {
    const storedValue = sessionStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(state));
  }, [state]);
  return [state, setState];
}
export default useSessionStorage;
