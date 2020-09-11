//MITCHY
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

var tzOffset = -240;

// Parameters relate to GET availability endpoint and PUT appointments endpoint in OnSched API
var availabilityParams = {
    locationId: your_location_id, 
    serviceId: '', 
    resourceId: '', 
    tzOffset: tzOffset, 
    date: new Date(), 
    completeBooking: "IN", 
    duration: 20, 
    interval: 20,
    customerId: null
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

    scrollToEl(elResourcesList);
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
        if (currentTier !== '209') {
            elLaps.innerHTML = "";
            elSessions.innerHTML = "";
            elAvailability.innerHTML = "";
            elBookingTypeSelection.innerHTML = "";
            selectionList.innerHTML = "";
            buildBookingTypeSelection();
        }
        else {
            elBookingTypeSelection.innerHTML = "";
            elAvailability.innerHTML = "";
            elSessions.innerHTML = "";
            elLaps.innerHTML = "";
            buildLapsSelection(laps)
        }
        scrollToEl(elBookingTypeSelection);
    }
    elResourcesList.appendChild(elResourceItem);
}

dates.map(getDate);

function buildBookingTypeSelection() {
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
        availabilityParams.serviceId = '4991';
        elLaps.innerHTML = "";
        elSessions.innerHTML = "";
        elAvailability.innerHTML = "";
        buildCustomerForm();
        elAvailability.className = 'active';
        updateLaps(0);
        scrollToEl(customerForm);
    }
    
    lItem.onclick = function() {
        elAvailability.innerHTML = "";
        elSessions.innerHTML = "";
        buildLapsSelection()
        scrollToEl(elLaps);
    }
    
    selectionList.appendChild(sItem);
    selectionList.appendChild(lItem);
    elBookingTypeSelection.appendChild(selectionList);
}

function buildLapsSelection() {
    const elLapsHeader = document.createElement('H3');
    const elLapsList = document.createElement('UL');
    
    elLaps.innerHTML = "";

    elLapsHeader.innerText = 'Number of laps';
    elLaps.appendChild(elLapsHeader);

    function addLapItem(lap) {
        var lapItem = document.createElement('LI');
    
        availabilityParams.serviceId = '5064';

        let tierPrices = prices.filter(price => price.groupId === currentTier)
        console.log('tierPrices, prices, currentTier', tierPrices, prices, currentTier);
        let lapItemPrice = tierPrices.filter(price => price.laps === lap)[0].price
        console.log('lapItemPrice', lapItemPrice, lap);
        
        lapItem.innerText = `${lap} laps - ${lapItemPrice}`;
        lapItem.className = 'lapItem';
        lapItem.onclick = function() {
            updateLaps(lap);
            buildCustomerForm();
            elAvailability.className = 'active'
            scrollToEl(customerForm);
        }
    
        if (lap > 8) {
            if (currentTier !== '209')
                elLapsList.appendChild(lapItem);
        }
        else
            elLapsList.appendChild(lapItem);
        
        elLaps.appendChild(elLapsList);
    }

    laps.map(addLapItem)
}

// Customer Element
var customerParams = { locationId: your_location_id, customerId: '', email: '', customerIM: {} };
var customerOptions = {};
var customer = elements.create("customer", customerParams, customerOptions);
var elCustomer = document.getElementById('customer');

const findCreateCustomer = (id) => {
    if (id) {
        availabilityParams.customerId = id;
        availability.mount('availability');
        scrollToEl(elAvailability);
    }
}

elCustomer.addEventListener("postCustomer", function (e) {
    findCreateCustomer(e.detail.id)
});

elCustomer.addEventListener("getCustomer", function (e) {
    findCreateCustomer(e.detail.id)
});

elPayment = document.getElementById("payment");
elConfDesc = document.getElementById("confirmation-description");

elAvailability.addEventListener("bookingConfirmation", function (e) {
    confirmationParams = { appointment: e.detail };
    confirmation.update(confirmationParams);
    window.checkout(e.detail);
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
const success = queryParams.get('success') === "true"
const apptId = queryParams.get('apptId')
const confNum = queryParams.get('confirmation')

const updateConfDetails = (e) => {
    elConfirmationHeader.innerHTML = '';
    
    if (confNum) {
        if (e.detail.confirmationNumber !== confNum) {
            // Cancel appt
            success = false;
        }
    }

    let elTitle = document.createElement('H1');
    let elSubtitle = document.createElement('P');
    let elImage = document.createElement('IMG');
    let elDetails = document.createElement('P');
    let elStart = document.createElement('P');
    
    elImage.src = e.detail.resourceImageUrl;
    elDetails.innerHTML = `${e.detail.serviceName} ${e.detail.duration} min - ${e.detail.resourceName}`

    if (success) {
        elTitle.innerText = 'Thanks for booking!';
        elSubtitle.innerHTML = `Your appointment was confirmed, an email was sent to ${e.detail.email} with more information. <br></br>Please see the details below:`;
        elStart.innerHTML = `See you on ${moment(e.detail.startDateTime).format('llll')}!`;
    }
    else {
        elTitle.innerText = 'Sorry, payment was not completed!';
        elSubtitle.innerText = 'Your appointment was unconfirmed, please see the details below:';
        elStart.innerHTML = `This appointment is no longer being held, to try again, please select another date below.`;
    }

    elConfirmationHeader.appendChild(elTitle);
    elConfirmationHeader.appendChild(elSubtitle);
    elConfirmationHeader.appendChild(elImage);
    elConfirmationHeader.appendChild(elDetails);
    elConfirmationHeader.appendChild(elStart);
}

var appointmentParams = { locationId: your_location_id, appointmentId: apptId };
var appointmentOptions = { book: success };
var appointment = elements.create("appointment", appointmentParams, appointmentOptions);
var elAppointment = document.getElementById("appointment");

elAppointment.addEventListener("getAppointment", function (e) {
    updateConfDetails(e);
});

elAppointment.addEventListener("confirmAppointment", function (e) {
    updateConfDetails(e);
});

elAppointment.addEventListener("bookingConfirmation", function (e) {
    updateConfDetails(e);
});

if (apptId) {
    elConfirmationHeader.className = 'shadow'
    
    if (!confNum) {
        appointmentOptions.book = false;
    }
    console.log('appointmentOptions', appointmentOptions)
    appointment.mount("appointment");
}
