import React from "react";

interface AppContextProps {
}

const defaultState = {};
const AppContext = React.createContext<AppContextProps>(defaultState);

export default AppContext;
