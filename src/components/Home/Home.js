import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import demoImg from "./z2.jpg";
import "./Home.css";
import one from './sl/a.jpg';
import two from './sl/b.jpg';
import three from './sl/c.jpg';

const Home = () => {
	const [article, setArticle] = useState([]);

	useEffect(() => {
		fetch("https://nameless-journey-21671.herokuapp.com/article")
			.then((res) => res.json())
			.then((data) => setArticle(data));
	}, []);

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-12 mb-5">
					<div
						id="carouselExampleSlidesOnly"
						class="carousel slide"
						data-bs-ride="carousel"
					>
						<div class="carousel-inner">
							<div class="carousel-item active">
								<img src={one} class="d-block w-100 sliderImg" alt="..." />
							</div>
							<div  class="carousel-item">
								<img  src={two} class="d-block w-100 sliderImg" alt="..." />
							</div>
							<div class="carousel-item">
								<img  src={three} class="d-block w-100 sliderImg" alt="..." />
							</div>
						</div>
					</div>
				</div>
				{article &&
					article.map((art) => (
						<div className="col-sm-6 col-md-4 mb-3">
							<div class="card cardStyle">
								<img
									src={`https://nameless-journey-21671.herokuapp.com/${art.image}`}
									class="card-img-top ccardImg"
									alt="..."
								/>
								<div class="card-body">
									<h5 class="card-title">{art.article}</h5>
									<p class="card-text">{art.details.substring(0, 50)}</p>
									<hr />
									<Link to={`/article/${art.key}`} class="btn btn-primary">
										Read More
									</Link>
								</div>
							</div>
						</div>
					))}

           
			</div>
		</div>
	);
};

export default Home;
