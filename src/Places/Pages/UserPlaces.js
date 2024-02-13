import React,{useEffect,useState} from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import PlaceList from "../components/PlaceList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/components/hooks/http-hook";

const UserPlaces = () =>{
    const[loadedPlaces, setLoadPlaces]= useState();
    const {isLoading,error, sendRequest, clearError} = useHttpClient();

    const userId = useParams().userId;

    useEffect(()=>{
        const fetchPlaces = async ()=>{
          try{
            const responseData = await sendRequest(`http://localhost:5000/api/places/user/${userId}`);
            setLoadPlaces(responseData.places);
          } 
          catch(err){

          }
        };
        fetchPlaces();
    },[sendRequest, userId]);

    return(
    <React.Fragment>
    <ErrorModal error = {error} onClear = {clearError}/> 
    {isLoading && (<div className="center">
        <LoadingSpinner/>
    </div>)}   
    {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces}/>}
    </React.Fragment>
    );

}

export default UserPlaces;