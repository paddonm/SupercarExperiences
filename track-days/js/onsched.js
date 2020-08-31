var your_client_id = 'client1595722680';
var your_location_id = '7ff05bd7-ead4-4d72-9ed9-56f80c1e655a';
var onsched = OnSched(your_client_id, "live");

function scrollToResource(id) {
    let elResource = document.getElementById(id)
    
    if (elResource)
        elResource.scrollIntoView({behavior: "smooth"});
}

// Get instance of elements to use for creating elements
var elements = onsched.elements();

var now = new Date();
var tzOffset = -now.getTimezoneOffset();

// Parameters relate to GET availability endpoint and PUT appointments endpoint in OnSched API
var availabilityParams = {
    locationId: your_location_id, 
    serviceId: '4991', 
    resourceId: '', 
    tzOffset: tzOffset, 
    date: new Date(), 
    completeBooking: "BK", 
    duration: 20, 
    interval: 20
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

//elAvailability.addEventListener("getAvailability", function (e) {console.log('>>>>>>>>>>>>>>')});
elResources.addEventListener("getResources", function (e) {
    // returns the resources list from the Get /consumer/v1/resources API endpoint in e.detail
    elResourcesList.classList.add('shadow');

    e.detail.data.filter(car => car.sortKey < 1000)
                 .sort((a, b) => (a.sortKey > b.sortKey) ? 1 : -1)
                 .map(getResource);

    elResourcesList.scrollIntoView({behavior: 'smooth'});
});

var dates = [];
var startDate = moment('2020-09-27');
var i;
for (i = 0;i < 1;i++) {
    dates.push(moment(startDate).add(i, 'days').format('LLLL').slice(0, -9));
}

var elDates = document.getElementById("dates");

function selectDate(date, el) {
    elResourcesList.innerHTML = "";
    elResourcesList.classList.remove('shadow');
    availabilityParams.date = new Date(moment(date));
    elAvailability.innerHTML = "";
    elLaps.innerHTML = "";
    elSessions.innerHTML = "";
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

var elBookingTypeSelection = document.getElementById('bookingTypeSelection');
var selectionList = document.createElement('UL');
var elLaps = document.getElementById('laps');
var elSessions = document.getElementById('sessions');

var laps = [2,4,6,8,10,12];
var currentTier = '208'

function getResource(resource) {
    var elResourceItem = document.createElement('li');
    elResourceItem.innerHTML = `<div id="onsched_resource_${resource.id}" class="resource-item">
                        <img src="${resource.imageUrl}" alt="${resource.name}" />
                        <h5>${resource.name}</h5>
                        <button>Select vehicle</button>
                    </div>`
    //var elResourceButton = this.document.getElementsByTagName("BUTTON")[0];
    elResourceItem.onclick = function() {
        addActive(elResourceItem);
        availabilityParams.resourceId = resource.id;
        currentTier = resource.groupId;
        if (currentTier !== '209')
            buildBookingTypeSelection();
        else {
            elBookingTypeSelection.innerHTML = "";
            elAvailability.innerHTML = "";
            elSessions.innerHTML = "";
            elLaps.innerHTML = "";
            laps.map(buildLapsSelection);  
        }
        elBookingTypeSelection.scrollIntoView({behavior: 'smooth'});
    }
    elResourcesList.appendChild(elResourceItem);
}

dates.map(getDate);

function buildBookingTypeSelection() {
    elLaps.innerHTML = "";
    elSessions.innerHTML = "";
    elAvailability.innerHTML = "";

    var sItem = document.createElement('LI');
    var lItem = document.createElement('LI');

    let sessionPrice = '$399'
    let lapPrice = '$119'
    elBookingTypeSelection.innerHTML = "<h3>Type of Track Day</h3>";

    if (currentTier === '207') {
        sessionPrice = '$499'
        lapPrice = '$169'
    }

    sItem.innerHTML = 
        `
            <h5>Session</h5>
            <p>Book a 15 minute session</p>
            <span class="price">${sessionPrice}</span>
        `
    lItem.innerHTML = 
        `
            <h5>Laps</h5>
            <p>Book by number of Laps</p>
            <span class="price">Starting at ${lapPrice}</span>
        `

    sItem.onclick = function() {
        elLaps.innerHTML = "";
        elSessions.innerHTML = "";
        elAvailability.innerHTML = "";
        availability.mount("availability");
        elAvailability.className = 'active';
        updateLaps(0);
        elAvailability.scrollIntoView({behavior: 'smooth'});
    }
    
    lItem.onclick = function() {
        elAvailability.innerHTML = "";
        elSessions.innerHTML = "";
        elLaps.innerHTML = "";
        laps.map(buildLapsSelection);  
    }

    selectionList.appendChild(sItem);
    selectionList.appendChild(lItem);
    elBookingTypeSelection.appendChild(selectionList);
}

function buildLapsSelection(lap) {
    var lapItem = document.createElement('LI');

    lapItem.innerText = `${lap} laps`;
    lapItem.className = 'lapItem';
    lapItem.onclick = function() {
        updateLaps(lap);
        availability.mount("availability");
        elAvailability.className = 'active'
        elAvailability.scrollIntoView({behavior: 'smooth'});
    }
    if (lap > 8) {
        if (currentTier !== '209')
            elLaps.appendChild(lapItem);
    }
    else
        elLaps.appendChild(lapItem);
}


        
elPayment = document.getElementById("payment");
elConfDesc = document.getElementById("confirmation-description");

elAvailability.addEventListener("bookingConfirmation", function (e) {
    confirmationParams = { appointment: e.detail };
    confirmation.update(confirmationParams);
    window.checkout(e.detail);
    
    
    //elPayment.scrollIntoView({behavior: 'smooth'});
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
