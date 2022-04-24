import React, {Children, useContext} from 'react'
import { AuthContext } from '../Context/AuthContext';
// import { Route, Navigate,Outlet } from 'react-router-dom'; 

	import {Navigate, Outlet} from 'react-router-dom'
	
	

	const  PrivateRoute2=(props) =>{

        
        const {user} = useContext(AuthContext) 
	

	  return user?<Outlet/>: <Navigate to="/forgotpassword"/>
	}
	

	export default PrivateRoute2;