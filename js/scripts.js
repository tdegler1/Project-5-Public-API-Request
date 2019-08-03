// JavaScript Document
// custom app javascript
// Project 5: Public API Requests
//
/* Request 12 random employees, from United States, Australia, Ireland, and Great Britain/United Kingdom. Display a gallery of employees with their name, email, location, and picture. */
$.ajax({
	url: 'https://randomuser.me/api/?results=12&nat=us,au,ie,gb', 
	dataType: 'json',
	success: function(data) {
		// Store the 12 employees' information for the modal window.
		employeeInfo = data.results; 
		
		// Loop through the "results" array from the retrieved api data and parse the JSON string to extract each element of employee's info.
		data.results.forEach(employee => {   
			const email = employee.email;
			const city = employee.location.city;
			const state = employee.location.state;
			const firstName = employee.name.first;            
			const lastName = employee.name.last;
			const picture = employee.picture.large;
			
			// Create the HTML of the employee card
			const employeeCard =                                                 
            `<div class="card">
                <div class="card-img-container">
                    <img class="card-img" src="${picture}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${firstName} ${lastName}</h3>
                    <p class="card-text">${email}</p>
                    <p class="card-text cap">${city}, ${state}</p>
                </div>
            </div>`;
			// Dynamically add the employee's info card to the web page listing.
            $('#gallery').append(employeeCard); 
		})
	}
});
