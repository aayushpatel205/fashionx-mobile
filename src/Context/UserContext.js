import { useState } from "react";
import { useContext, createContext } from "react";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [userData, setUserData] = useState({});
    const [userCartData , setUserCartData] = useState([]);
    const [wishlistIdArray , setWishlistIdArray] = useState([]);
    return (
        <UserContext.Provider value={{ userData , setUserData , userCartData , setUserCartData , wishlistIdArray , setWishlistIdArray }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserData = () => useContext(UserContext);