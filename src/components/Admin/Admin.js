import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import './Admin.css'
import Category from './Category/Category';
import SetAdmin from './SetAdmin/SetAdmin';
import SetArticle from './SetArticle/SetArticle';

const Admin = () => {
    const {value1, value2} = useContext(UserContext);

	const [loggedInUser, setLoggedInUser] = value1;
	const [admin,setAdmin] = value2;

    const [option, setOption] = useState({
        addArticle: true,
        addCategory:false,
        addAuthor:false,
    })
    const handleOption = (text) => {
        if(text === 'addArticle'){
            setOption({
                addArticle: true,
                addCategory:false,
                addAuthor:false,
            })
        }
        if(text === 'addCategory'){
            setOption({
                addArticle: false,
                addCategory:true,
                addAuthor:false,
            })
        }
        if(text === 'addAuthor'){
            setOption({
                addArticle: false,
                addCategory:false,
                addAuthor:true,
            })
        }
    }

    return (
        <div className="container">
            {admin && loggedInUser &&
            <div className="row">
                
                 <div className="col-md-4 skillColFour ">
                    <div  className="skillSideBar ">
                        <div className="expert shadow">
                            <p onClick={()=>handleOption("addArticle")}>Add Article</p>
                        </div>
                        <div className="expert shadow">
                            <p onClick={()=>handleOption("addCategory")}>Add Category</p>
                        </div>
                        <div className="expert shadow">
                            <p onClick={()=>handleOption("addAuthor")}>Add Author</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    {option.addArticle && 
                        <SetArticle/>
                    }
                    {option.addCategory &&
                       <Category/>
                    }
                    {option.addAuthor &&
                       <SetAdmin/>
                    }
                </div>
                
            </div>
            }
            {!admin && <h1 className="bg-danger text-center p-5 text-white mt-5">Sorry bro you are not a admin</h1>}
        </div>
    );
};

export default Admin;