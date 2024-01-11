import React from "react";
import initialstate from "./InitialState";

// create global context and it takes initialstate as props
const GlobaleContext = React.createContext(initialstate);
export default GlobaleContext;