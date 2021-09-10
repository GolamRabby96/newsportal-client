import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Admin from './components/Admin/Admin';
import Login from './components/Login/Login';
import SingleArticle from './components/SingleArticle/SingleArticle';
import CategoryView from './components/CategoryView/CategoryView';
import { createContext, useEffect, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Foter from './components/Foter/Foter';

export const UserContext = createContext();

function App() {
  const AdminEmail = sessionStorage.getItem('email')||'';

  const [loggedInUser, setLoggedInUser] = useState(false);
  const [admin, setAdmin] = useState(false);



	useEffect(() => {
		fetch(`https://nameless-journey-21671.herokuapp.com/admin/${AdminEmail}`)
			.then((res) => res.json())
			.then((data) => {
				const AdminData = data[0];
				if(AdminData) {
          setAdmin(true);
          console.log(AdminData,setAdmin);
				}
				else{
          setAdmin(false);
          console.log('inter');
				  	
					
				}
				console.log('ddddddddddd',data[0])
				console.log('ddddddddddd',AdminData)
			});
		}, [loggedInUser]);
  useEffect(() => {
    const find = sessionStorage.getItem('userToken') ||"";
    if(find){
      setLoggedInUser(true)
    }
  },[])
  return (
    <UserContext.Provider
    value={{
      value1:[loggedInUser, setLoggedInUser],
      value2:[admin,setAdmin]
    }}
  >
  <Router>
      <div>
          <Navbar/>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>

          <PrivateRoute exact path="/admin">
            <Admin/>
          </PrivateRoute>

          <PrivateRoute exact path="/article/:key">
            <SingleArticle/>
          </PrivateRoute>

          <PrivateRoute exact path="/category/:name">
            <CategoryView/>
          </PrivateRoute>

          <Route exact path="/login">
            <Login/>
          </Route>

        </Switch>
        <Foter/>
      </div>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
