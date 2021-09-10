import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './SingleArticle.css'


const SingleArticle = () => {
    let { key } = useParams([]);
    const [article, setArticle] = useState([]);
    console.log(article);
    useEffect(() => {
        fetch(`https://nameless-journey-21671.herokuapp.com/article/${key}`)
        .then( res => res.json())
        .then( data => setArticle(data[0]))
    }, [])
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-12">
                    <div className="imgDiv">
                        <img src={`https://nameless-journey-21671.herokuapp.com/${article.image}`} alt="" />
                    </div>
                    <div className="textSection">
                        <br />
                        <h2>Category : {article.category}</h2>
                        <br />
                        <h3>Article : {article.article}</h3>
                        <hr />
                        <p>{article.details}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleArticle;