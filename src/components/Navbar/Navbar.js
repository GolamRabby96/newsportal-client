import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import "./Navbar.css";

const Navbar = () => {
	const { value1, value2 } = useContext(UserContext);

	const [loggedInUser, setLoggedInUser] = value1;
	const [admin, setAdmin] = value2;

	const [category, setCategory] = useState([]);

	useEffect(() => {
		fetch("https://nameless-journey-21671.herokuapp.com/category")
			.then((res) => res.json())
			.then((data) => setCategory(data));
	}, []);

	const handleLogOut = () => {
		setLoggedInUser(false);
		sessionStorage.clear();
		console.log("click");
	};
	return (
		<div>
			<div className="coltopTimeBar">
				<div className="container">
					<div className="row">
						<div className="col-md-12 ">
							<div className="topTimeBar">
								<p>{Date().toLocaleString()}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="DownTimeSection">
								<h1>News Portal</h1>
								<p>
									A news portal is an access point to news; This is generally
									thought of as a Internet connection to a news source but the
									definition of a “Portal” would include a newspaper, magazine
									or any other access to news. A web portal is any access point
									to the Internet.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<nav class="navbar navbar-expand-lg navbar-light navBG">
				<div class="container">
					<Link class="navbar-brand" to="/">
						News_Portal
					</Link>
					<button
						class="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span class="navbar-toggler-icon"></span>
					</button>
					<div class="collapse navbar-collapse" id="navbarSupportedContent">
						<ul class="navbar-nav me-auto mb-2 mb-lg-0">
							<li class="nav-item">
								<Link class="nav-link active" aria-current="page" to="/">
									Home
								</Link>
							</li>

							<li class="nav-item dropdown">
								<Link
									class="nav-link dropdown-toggle"
									href="#"
									id="navbarDropdown"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									Category
								</Link>
								<ul class="dropdown-menu" aria-labelledby="navbarDropdown">
									{category &&
										category.map((cat) => (
											<li>
												<Link
													class="dropdown-item"
													to={`/category/${cat.category}`}
												>
													{cat.category}
												</Link>
											</li>
										))}
								</ul>
							</li>
							{loggedInUser && admin && (
								<li class="nav-item">
									<Link class="nav-link" to="/admin">
										Admin
									</Link>
								</li>
							)}
						</ul>
						{!loggedInUser && (
							<Link className="loginLink" to="/login">
								Log in
							</Link>
						)}
						{loggedInUser && (
							<Link className="loginLink" to="/" onClick={handleLogOut}>
								log out
							</Link>
						)}
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
