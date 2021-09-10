import React, { useState } from 'react';

const SetAdmin = () => {
    
    const [Admin, setAdmin] = useState({});

    const handleAdmin=(e)=>{
        const formCategory = e.target.value;
        setAdmin(formCategory);
    }

    const handleAdminSubmit = (e) => {
		e.preventDefault();

		fetch("https://nameless-journey-21671.herokuapp.com/addAdmin", {
			method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
			body: JSON.stringify({ admin: Admin}),
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
             <form onSubmit={handleAdminSubmit}>
                 <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Add Admin</label>
                    <input onBlur={handleAdmin} name="admin" type="text" class="form-control" id="exampleInputEmail1" />
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default SetAdmin;