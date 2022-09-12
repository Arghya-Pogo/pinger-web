import React, { createContext, useState } from "react";

export const DataContext = createContext();


export const DataProvider = ({ children }) => {
    const [User, setUser] = useState();

    return (
        <DataContext.Provider
            value={{
                User,
                setUser,
            }}
        >
        {children}
        </DataContext.Provider>
    );
};