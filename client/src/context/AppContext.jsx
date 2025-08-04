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

   const [isStudio, setIsStudio] = useState();
   const [showStudioReg, setShowStudioReg] = useState(false);
   const [searchedCities, setSearchedCities] = useState([]);
   const [artists, setArtists] = useState([]);



    const fetchArtists = async () => {
        try {
        const {data} = await axios.get('/api/artists')
        if (data.success){
            setArtists(data.artists)
        }
        else{
            toast.error(data.message)
        }
        } catch (error) {
            toast.error(error.message)
        }
        }
    useEffect(() => {
        fetchArtists();
   }, [])



      const fetchUser = async () => {
    try {
        const {data} = await axios.get('/api/user', {headers: {Authorization: `Bearer ${await getToken()}`}})

        if (data){
            setIsStudio(data.role === "studio");
            setSearchedCities(data.recentSearchedCities)
        }
        else{
            setTimeout(() => {
                fetchUser()
            },5000);
        }
        
    } catch (error) {
        toast.error(error.message);
    }
   }
   useEffect(() => {
    if (user){
        fetchUser();
    }
   }, [user])


    const value ={
        currency, navigate, user,getToken, isStudio, setIsStudio, axios,
        showStudioReg,setShowStudioReg,setSearchedCities, artists, setArtists,
        searchedCities
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )

}

export const useAppContext = () => useContext(AppContext);