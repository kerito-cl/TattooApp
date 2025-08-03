import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppProvider = ({children}) => {

   const currency = import.meta.env.VITE_CURRENCY || "$";
   const navigate = useNavigate();
   const {user} = useUser();
   const {getToken} = useAuth();

   const [isArtist, setIsArtist] = useState();
   const [showArtistReg, setShowArtistReg] = useState(false);
   const [searchedCities, setSearchedCities] = useState([]);
   const [rooms, setRooms] = useState([]);


    const value ={
        currency, navigate, user,getToken, isArtist, setIsArtist, axios,
        showArtistReg,setShowArtistReg,setSearchedCities, rooms, setRooms,
        searchedCities
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )

}

export const useAppContext = () => useContext(AppContext);