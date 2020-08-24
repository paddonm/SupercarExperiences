var your_client_id = 'client1595722680';
var your_location_id = '7ff05bd7-ead4-4d72-9ed9-56f80c1e655a';
    var onsched = OnSched(your_client_id, "live");

// Get instance of elements to use for creating elements
var elements = onsched.elements();

var now = new Date();
var tzOffset = -now.getTimezoneOffset();

// Parameters relate to GET availability endpoint and PUT appointments endpoint in OnSched API
var availabilityParams = {
    locationId: your_location_id, serviceId: '51080', resourceId: '', tzOffset: tzOffset, date: new Date() 
};

// Use privacy fields to force a customer to accept terms and/or view the privacy policy
var availabilityOptions = {};
var availability = elements.create("availability", availabilityParams, availabilityOptions);
var elAvailability = document.getElementById('availability');

var resourcesParams = { locationId: your_location_id };
var resourcesOptions = {};
var resources = elements.create("resources", resourcesParams, resourcesOptions);
var elResources = document.getElementById("resources");
var elResourcesList = document.getElementById("myResourceList");
var elResourcesList2 = document.getElementById("myResourceList2");
var elResourcesList3 = document.getElementById("myResourceList3");

elResources.addEventListener("getResources", function (e) {
    // returns the resources list from the Get /consumer/v1/resources API endpoint in e.detail
    elResourcesList.classList.add('shadow');
    elResourcesList2.classList.add('shadow');
    elResourcesList3.classList.add('shadow');
    elResourcesList.innerHTML = "<h1><span class='red'>Tier</span> 1</h1>";
    elResourcesList2.innerHTML = "<h1><span class='red'>Tier</span> 2</h1>";
    elResourcesList3.innerHTML = "<h1><span class='red'>Custom</span> Tier</h1>";
    e.detail.data.map(getResource);
    elResourcesList.scrollIntoView({behavior: 'smooth'});
});

elResources.addEventListener("clickResource", function(e) {
    elResources.innerHTML = "";
})

var dates = [];
var startDate = moment('2020-08-15');
var i;
for (i = 0;i <= 1;i++) {
    dates.push(moment(startDate).add(i, 'days').format('ll'));
}

var elDates = document.getElementById("dates");

function selectDate(date, el) {
    elResourcesList.innerHTML = "";
    elResourcesList2.innerHTML = "";
    elResourcesList3.innerHTML = "";
    elResourcesList.classList.remove('shadow');
    elResourcesList2.classList.remove('shadow');
    elResourcesList3.classList.remove('shadow');
    availabilityParams.date = new Date(moment(date));
    elAvailability.innerHTML = "";
    elAvailability.className = "";
    resources.mount('resources');
}

function getDate(date) {
    var el = document.createElement('li');
    el.innerHTML = date;
    el.classList.add('date-item');
    el.onclick = function() {
        selectDate(date, el);
        addActive(el);
    }
    elDates.appendChild(el)
}

function addActive(element) {
    var elDateChildren = document.querySelectorAll('.date-item');
    
    elDateChildren.forEach(function(elem) {
        elem.classList.remove("active");
    });
    
    if (element.classList.contains('active'))
        element.classList.remove("active");
    else
        element.classList.add("active");
}


function getResource(resource) {
    var el = document.createElement('li');
    el.innerHTML = '<div class="resource-item"><img src="' + resource.imageUrl + '" alt="' + resource.name + '" /><h5>' + resource.name + '</h5><button>Select vehicle</button></div>'
    //var elResourceButton = this.document.getElementsByTagName("BUTTON")[0];
    el.onclick = function() {
        addActive(el);
        availabilityParams.resourceId = resource.id
        availability.mount("availability");
        elAvailability.className = 'active'
        elAvailability.scrollIntoView({behavior: 'smooth'});
    }
    if (resource.groupId === ("230" || "207"))
        elResourcesList.appendChild(el);
    if (resource.groupId === ("231" || "208"))
        elResourcesList2.appendChild(el);
    if (resource.groupId === ("232" || "209"))
        elResourcesList3.appendChild(el);
}

dates.map(getDate);    
        
elPayment = document.getElementById("payment");
elConfDesc = document.getElementById("confirmation-description");

elAvailability.addEventListener("bookingConfirmation", function (e) {
//elPayment.scrollIntoView({behavior: 'smooth'});

confirmationParams = { appointment: e.detail };
confirmation.update(confirmationParams);
console.log(confirmationParams);
window.checkout(e.detail);

// elPayment.classList.remove('hide');
// elPayment.classList.add('shadow');
// elConfDesc.innerHTML = "Your " + 
//                        confirmationParams.appointment.serviceName + 
//                        " with the " + 
//                        confirmationParams.appointment.resourceName + 
//                        " is being held for " + 
//                        moment(confirmationParams.appointment.dateInternational).format('ll') + 
//                        ". Please complete the payment to confirm this time."


//confirmation.mount("confirmation");
});

var confirmationParams = {};
var confirmationOptions = {};
var confirmation = elements.create("confirmation", confirmationParams, confirmationOptions);
var elConfirmation = document.getElementById("confirmation");
var elConfirmationHeader = document.getElementById("confirmation-header");
// per API customer POST input model
var customerObject = {
  locationId: 'burlingtonmedical', firstname: 'Jim', lastname: 'Beem', email: 'jim@onsched.com', type: 0, contact: { mobilePhone: '9053998404' }
};

const queryParams = new URLSearchParams(window.location.search);
console.log(queryParams.get('success'), window.location)
const success = queryParams.get('success')
const apptId = queryParams.get('apptId')

if (success === 'true' && apptId) {
    // Successful payment
    elConfirmationHeader.innerHTML = '<h1>Thanks for booking!</h1>' + elConfirmationHeader.innerHTML
    elConfirmationHeader.className = 'shadow'

    var appointmentParams = { locationId: your_location_id, appointmentId: apptId };
    var appointmentOptions = {};
    var appointment = elements.create("appointment", appointmentParams, appointmentOptions);
    var elAppointment = document.getElementById("appointment");
    
    elAppointment.addEventListener("getAppointment", function (e) {
        var confirmationParams = { appointment: e.detail };
        var confirmationOptions = {};
        var confirmation = elements.create("confirmation", confirmationParams, confirmationOptions);
        confirmation.mount("confirmation");
        elConfirmationHeader.innerHTML = elConfirmationHeader.innerHTML + `<img src="${e.detail.resourceImageUrl}" />`
    });

    
    appointment.mount("appointment");   
}
else if (success === 'false') {
    // Failed payment
    elConfirmationHeader.className = 'shadow'

    var appointmentParams = { locationId: your_location_id, appointmentId: apptId };
    var appointmentOptions = {};
    var appointment = elements.create("appointment", appointmentParams, appointmentOptions);
    var elAppointment = document.getElementById("appointment");
    
    elAppointment.addEventListener("getAppointment", function (e) {
        elConfirmationHeader.innerHTML = `
            <div>
                <h1>Sorry, payment was not completed!</h1>
                
                <p>Your appointment was unconfirmed, please see the details below</p>
                
                <p>${moment(e.detail.startDateTime).format('llll')}</p>
                
                <img src="${e.detail.resourceImageUrl}" />
                <p>${e.detail.serviceName} ${e.detail.duration} min - ${e.detail.resourceName}
                <p>This appointment is no longer being held, to try again, please select another date below.</p>
            </div>
        `
    });
    
    appointment.mount("appointment");   
}