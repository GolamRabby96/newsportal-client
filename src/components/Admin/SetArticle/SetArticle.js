import React, { useEffect, useState } from 'react';

const SetArticle = () => {
    const [category, setCategory] = useState([]);
    const [formFile, setFormFile] = useState({});
    const [formInfo, setFormInfo] = useState({});

    useEffect(() => {
        fetch('https://nameless-journey-21671.herokuapp.com/category')
        .then(res => res.json())
        .then(data => setCategory(data));
    }, [])

    
    const handleFileChange =(e)=>{
        const newFile = {...formFile};
		newFile[e.target.name] = e.target.files[0];
		setFormFile(newFile);
	}

    const handleBlur =(e)=>	{
		const newData = {...formInfo};
		newData[e.target.name ]= e.target.value
		setFormInfo(newData);
	}
    const handleSubmit =(e)=>{
		e.preventDefault();

		const formData = new FormData();
        console.log(formData);
        if(formInfo.category){
            formData.append('category', formInfo.category);
        }else{
            formData.append('category', 'news');
        }
		
        
        console.log(formData);
        
		formData.append('article', formInfo.article);
        console.log(formData);
		formData.append('details', formInfo.details);
		formData.append('articleImg', formFile.articleImg);
        console.log(formData);
		fetch('https://nameless-journey-21671.herokuapp.com/addArticle',{
			method:'POST',
			body:formData
		})
		.then( res => res.json())
		.then( data => {
			window.alert('article Inserted');
            e.target.reset();
		})
		.catch(error=> console.error(error));

	}
    
    return (
        <div className="mt-5">
            <form onSubmit={handleSubmit}>
            <div class="mb-3">
            <label class="form-label">Select Category</label>
                <select  onBlur={handleBlur} name="category"  class="form-select" required>
                    {
                        category && category.map( cat =>
                            <option  value={cat.category} name={cat.category}>{cat.category}</option>
                        )
                    }
                </select>
            </div>
                <br />
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Article Header</label>
                    <input required onBlur={handleBlur} type="text" name='article' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Details</label>
                    <textarea required onBlur={handleBlur} class="form-control" name="details" id="exampleInputPassword1"type="text" class="form-control" id="exampleInputPassword1"/>
                </div>
                <div class="mb-2">
                    <label for="imageOne" class="form-label">
                        Article Image
                    </label>
                    <input required class="form-control" type="file" id="imageOne"  name="articleImg" onChange={handleFileChange}/>
				</div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default SetArticle;