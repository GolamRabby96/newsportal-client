import React, { useContext, useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import firebaseConfig from "./config";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useHistory, useLocation } from "react-router";
import { UserContext } from "./../../App";
import "./Login.css";

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}else {
    firebase.app(); // if already initialized, use that one
 }

const Login = () => {
	const {value1, value2} = useContext(UserContext);

	const [loggedInUser, setLoggedInUser] = value1;
	const [admin,setAdmin] = value2;


	const [infoMessege, setInfoMessage] = useState('')
	const [newUser, setNewUser] = useState(false);
	const [user, setUser] = useState({
		ifUser:true,
		email:'',
		password:''
	});
	console.log('25',user);
	const provider = new GoogleAuthProvider();

	const history = useHistory();
	const location = useLocation();
	let { from } = location.state || { from: { pathname: "/" } };


	const handleSignIN = () => {
		firebase
			.auth()
			.signInWithPopup(provider)
			.then((res) => {
				sessionStorage.setItem('email',res.user.email);
				console.log(res.user.email);
				setLoggedInUser(true);
				storeAuthToken();
				history.replace(from);
			});
	};

	const storeAuthToken = () => {
		firebase
			.auth()
			.currentUser.getIdToken(/* forceRefresh */ true)
			.then(function (idToken) {
				sessionStorage.setItem("userToken", idToken);
				
			})
			.catch(function (error) {
				// Handle error
			});
	};

	const handleBlur=(e)=>{
		let isFieldValid = true;
		if(e.target.name === "email"){
			isFieldValid = /\S+@\S+\.\S/.test(e.target.value);
		}
		if(isFieldValid){
			const newUserInfo = {...user};
			newUserInfo[e.target.name] = e.target.value;
			setUser(newUserInfo);

		}
		console.log('72',isFieldValid)
	}
	const handleSubmit=(e)=>{
		console.log('click');
		
		if(newUser && user.email && user.password){
			firebase
			.auth().createUserWithEmailAndPassword(user.email, user.password)
			.then( res => {
				setNewUser(false);
				setInfoMessage('Registration successful ');
			})
			.catch( err => setInfoMessage("Please try again"));
		}
		if(!newUser && user.email && user.password){
			firebase.auth().signInWithEmailAndPassword(user.email, user.password)
			.then(res => {
				console.log(res);
				setLoggedInUser(true);
				storeAuthToken();
				sessionStorage.setItem("email", user.email);
				// console.log(newUser, user.email,user.password);
				setInfoMessage("Done");
				history.replace(from);
			})
			.catch( err => {
				console.log('101',err);
				setInfoMessage("Please try again")
				console.log(newUser, user.email,user.password);
			});
		}
		e.preventDefault();
	}

	return (
		<div className="loginMain">
			<div className="container">
				<div className="row">
					<div className="col-md-">
						<p className="text-center bg-info">{infoMessege}</p>
					</div>
					<div className="col-md-4 offset-md-4 pt-5">
						<div className="formSection mt-5 ">
							<form onSubmit={handleSubmit}>
								<div class="mb-3">
									<label for="exampleInputEmail1" class="form-label">
										Email address
									</label>
									<input
										type="email"
										name="email"
										onBlur={handleBlur}
										class="form-controlEdit"
										id="exampleInputEmail1"
										aria-describedby="emailHelp"
									/>
								</div>
								<div class="mb-3">
									<label for="exampleInputPassword1" class="form-label">
										Password
									</label>
									<input
										type="password"
										name="password"
										onBlur={handleBlur}
										class="form-controlEdit"
										id="exampleInputPassword1"
									/>
								</div>
                                {newUser &&<div class="mb-3">
									<label for="exampleInputPassword1" class="form-label">
										Confirm Password
									</label>
									<input
										type="password"
										name="password"
										onBlur={handleBlur}
										class="form-controlEdit"
										id="exampleInputPassword1"
									/>
								</div>}
                                {!newUser&&<p>Register?<span onClick={()=>setNewUser(!newUser)}>Click Here</span></p>}
                                {newUser&&<p>Already User?<span onClick={()=>setNewUser(!newUser)}>Click Here</span></p>}

								<button type="submit" class="btn btn-edit container">
									{newUser? "Sign up":"Sign In"}
								</button>
							</form>
                            <p className="OR">OR</p>
							<button onClick={handleSignIN} class="btn btn-edit container">
								Google SignIn
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;

