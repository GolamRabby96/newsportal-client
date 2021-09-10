import React, { useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from './../../App';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({children, ...rest}) => {
    const {value1, value2} = useContext(UserContext);

	const [loggedInUser, setLoggedInUser] = value1;
	const [admin,setAdmin] = value2;
    
	useEffect(() => {
		const token = sessionStorage.getItem("userToken");
		if (token) {
			setLoggedInUser(true);
		}
	}, []);

    return (
        <Route 
            {...rest}
            render = {({location})=> loggedInUser || sessionStorage.getItem('userToken')? children:(
                <Redirect to={{
                    pathname:'/login',
                    state:{from:location}
                }}/>
            )}
            
        />
    );
};

export default PrivateRoute;