// JavaScript Document
// Project 5: Public API Requests - Awesome Employee Directory
//
/* Let's wait for the DOM to load first! */
$(document).ready(function () {
	/* Employee Gallery feature */
	/* Request 12 random employees, from United States, Australia, Ireland, and Great Britain/United Kingdom. Display a gallery of employees with their name, email, location, and picture. */
	$.ajax({
		url: 'https://randomuser.me/api/?results=12&nat=us,au,ie,gb', 
		dataType: 'json',
		success: function(data) {
			//console.log(data); //test
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

	/* Modal Window feature */
	function createModalWindow(index){
		const picture = employeeInfo[index].picture.large;
		const firstName = employeeInfo[index].name.first;
		const lastName = employeeInfo[index].name.last;
		const email = employeeInfo[index].email;
		const city = employeeInfo[index].location.city;
		const phone = employeeInfo[index].phone;
		const street = employeeInfo[index].location.street;
		const state = employeeInfo[index].location.state;
		const zip = employeeInfo[index].location.postcode;
		// Parse the birthdate
			const DOB = employeeInfo[index].dob.date.split("T");
			const DOBseparate = DOB[0].split("-");
			const year = DOBseparate[0];
			const month = DOBseparate[1];
			const day = DOBseparate[2];
			const dateOfBirth = month + "/" + day + "/" + year;
		// Create the HTML of the employee modal window
		const modalWindowContainer = 
		`<div class="modal-container">
			<div class="modal">
				<button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
				<div class="modal-info-container">
					<img class="modal-img" src="${picture}" alt="profile picture">
					<h3 id="name" class="modal-name cap">${firstName} ${lastName}</h3>
					<p class="modal-text">${email}</p>
					<p class="modal-text cap">${city}</p>
					<hr>
					<p class="modal-text">${phone}</p>
					<p class="modal-text cap">${street}, ${city}, ${state}, ${zip}</p>
					<p class="modal-text">Birthday: ${dateOfBirth}</p>
				</div>
			</div>
			<div class="modal-btn-container">
					<button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
					<button type="button" id="modal-next" class="modal-next btn">Next</button>
			</div>
		</div>`;
		// Dynamically add the employee's modal window to the web page so it is on the top layer
		$('body').append(modalWindowContainer);
		
		/* Operations on the modal window */
		// To avoid errors in the console when the end or beginning of the list is reached, remove the "prev" button if modal window is for first employee; remove "next" button if modal window is for last employee.
		if (index === 0){
			$(".modal-prev").remove();
		}  else if (index === 11){
			   $(".modal-next").remove();   
		}
		// Close current employee's window and opens the previous employee's window
		$(".modal-prev").on('click', function(){
			$('.modal-container').remove();
			index--
			createModalWindow(index);
		}); 
		// Close current employee's window and opens the next employee's window
		$(".modal-next").on('click', function(){
			$('.modal-container').remove();
			index++
			createModalWindow(index);
		}); 
		// Close modal window.
		$('#modal-close-btn').on('click', function(){                 
			$('.modal-container').remove();
	  	});
	}

	// Open modal window
	$('#gallery').on('click', '.card', function() {
		clickedCard = ($(this).index());
		createModalWindow(clickedCard);
	}); 

});