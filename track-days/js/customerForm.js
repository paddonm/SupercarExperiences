const formFields = [
  {
    name: 'firstName',
    label: 'First Name',
    required: true
  },
  {
    name: 'lastName',
    label: 'Last Name',
    required: true
  },
  {
    name: 'email',
    label: 'Email',
    required: true
  },
  {
    name: 'phoneNumber',
    label: 'Phone Number'
  },
]

var elCustomerForm = document.getElementById('customerForm');
var customerForm = document.createElement('FORM');

const buildCustomerForm = () => {
  elCustomerForm.innerHTML = '';

  elCustomerForm.innerHTML = '<h3>Contact information</h3>';

  formFields.map(field => 
    buildCustomerField(field)
  );
  
  var submitBtn = document.createElement('BUTTON');
  submitBtn.setAttribute('type', 'submit');
  submitBtn.innerText = 'Find available times'
  customerForm.appendChild(submitBtn);
  elCustomerForm.appendChild(customerForm)
}

const buildCustomerField = (field) => {
  var stringField = document.createElement('DIV');
  var stringInput = document.createElement('INPUT');
  var stringLabel = document.createElement('LABEL');
  var elError = document.createElement('SPAN');
  
  elError.innerText = '*'
  
  stringField.className = 'renderField';
  stringInput.setAttribute('placeholder', field.label);
  stringInput.setAttribute('name', field.name);
  stringInput.setAttribute('id', field.name);
  
  stringLabel.innerText = field.label;
  console.log('req', field.label, field.required)
  if (field.required)
    stringLabel.appendChild(elError);

  stringField.appendChild(stringLabel);
  stringField.appendChild(stringInput);

  customerForm.appendChild(stringField);
}

customerForm.onsubmit = function(e) {
  e.preventDefault();

  var elFirstNameField = document.getElementById('firstName');
  var elLastNameField = document.getElementById('lastName');
  var elEmailField = document.getElementById('email');
  var elPhoneNumberField = document.getElementById('phoneNumber');

  const values = {
    firstName: elFirstNameField.value,
    lastName: elLastNameField.value,
    email: elEmailField.value,
    phoneNumber: elPhoneNumberField.value,
  }

  let errors = validateCustomerForm(values)
  
  if (Object.keys(errors).length) {
    const errFields = Object.keys(errors).filter(element => Object.keys(values).includes(element));
    const validFields = Object.keys(values).filter(element => !Object.keys(errors).includes(element));
    
    errFields.map( 
      intersected => 
      document.getElementById(intersected).className = 'error'
    );
    
    validFields.map( 
      intersected => 
      document.getElementById(intersected).className = ''
    );
  }
  else {
    // Successful
    Object.keys(values).map( validField => document.getElementById(validField).className = '' );
    
    customerParams.email = values.email;
    customerParams.customerIM.firstName = values.firstName;
    customerParams.customerIM.lastName = values.lastName;
    customerParams.customerIM.email = values.email;
    customerParams.customerIM.type = 0;
    customerParams.customerIM.contact = {mobilePhone: values.phoneNumber};
    console.log('customerObject, customerParams', customerObject, customerParams);

    customer.mount('customer');
  }
}

const validateCustomerForm = (values) => {
  const errors = {}

  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  
  if (!values.firstName) {
    errors.firstName = 'Required'
  }
  
  if (!values.lastName) {
    errors.lastName = 'Required'
  }  

  if (values.phoneNumber) {
    if (values.phoneNumber.length > 15) {
      errors.phoneNumber = 'Must 15 digits or less'
    } else if (!(/[0-9]/i.test(values.phoneNumber))) {
      errors.phoneNumber = 'Valid number required'
    } 
  }

  return errors;
}