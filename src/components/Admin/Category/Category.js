import React, { useState } from 'react';

const Category = () => {
    
    const [categoryAdd, setCategoryAdd] = useState({});
    console.log(categoryAdd);

    const handleCategory=(e)=>{
        const formCategory = e.target.value;
        setCategoryAdd(formCategory);
    }

    const handleCategorySubmit = (e) => {
		e.preventDefault();

		fetch("https://nameless-journey-21671.herokuapp.com/addCategory", {
			method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
			body: JSON.stringify({ category: categoryAdd}),
		})
			.then((response) => response.json())
			.then((data) => {
				e.target.reset();
			})
			.catch((error) => {
				console.error(error);
			});
	};
    return (
        <div>
             <form onSubmit={handleCategorySubmit}>
                 <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Add Category</label>
                    <input onBlur={handleCategory} name="category" type="text" class="form-control" id="exampleInputEmail1" />
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default Category;