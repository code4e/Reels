import React, {Children, useContext} from 'react'
import { AuthContext } from '../Context/AuthContext';
// import { Route, Navigate,Outlet } from 'react-router-dom'; 
import Feed from './Feed';
// // function PrivateRoute({component:Component,...rest}) {
// //     const {user} = useContext(AuthContext) 
// //     return (
// //         <Route {...rest} render={props=>{
// //             return user?<Component {...props}/> : <Navigate to="login"/>
// //         }} />
// //     )
// // }

// const PrivateRoute = () => {
//     const {user} = useContext(AuthContext) 
//     console.log(Outlet);
//     return user ? <Outlet /> : <Navigate to="/login" />;
//   };
  

// export default PrivateRoute




	import {Navigate, Outlet} from 'react-router-dom'
	
	

	const  PrivateRoute=(props) =>{

        console.log(props)
        const {user} = useContext(AuthContext) 
	

	  return user?<Outlet/>: <Navigate to="/login"/>
	}
	

	export default PrivateRoute;