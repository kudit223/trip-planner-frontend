import React from "react";
import { Navigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";


function ProtectedRoute({children,isLoggedIn,isLoading}){

    if(isLoading){
        return <ClipLoader size={100}/>
    }

    if(!isLoggedIn){
       return <Navigate to='/login' replace/> ;
    }

    return children;
}

export default ProtectedRoute;