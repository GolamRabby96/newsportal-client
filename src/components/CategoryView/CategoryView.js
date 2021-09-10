import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const CategoryView = () => {
    let { name } = useParams([]);
    const [article, setArticle] = useState([]);
    console.log(`http://localhost:5000/category/${name}`)
    useEffect(() => {
        fetch(`https://nameless-journey-21671.herokuapp.com/category/${name}`)
        .then( res => res.json())
        .then( data => setArticle(data))
    }, [name])

    return (
        <div className="container mt-4">
        <div className="row">
            {article&&
                article.map(art=>
                    <div className="col-sm-6 col-md-4 mb-3">
                        <div class="card cardStyle">
                            <img src={`https://nameless-journey-21671.herokuapp.com/${art.image}`} class="card-img-top ccardImg" alt="..."/>
                            <div class="card-body">
                                <h5 class="card-title">{art.article}</h5>
                                <p class="card-text">{art.details.substring(0, 50)}</p>
                                <hr />
                                <Link to={`/article/${art.key}`} class="btn btn-primary">Read More</Link>
                            </div>
                        </div>
                     </div>
                )
            }
            
        </div>
    </div>
    );
};

export default CategoryView;