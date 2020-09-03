const formFields = [
  {
    name: 'firstName',
    label: 'First Name'
  },
  {
    name: 'lastName',
    label: 'Last Name'
  },
  {
    name: 'email',
    label: 'Email'
  },
  {
    name: 'phoneNumber',
    label: 'Phone Number'
  },
]

var customerForm = document.getElementById('customerForm');

function buildCustomerForm() {
  customerForm.innerHTML = '';
  formFields.map(field => 
    buildCustomerField({label: field.label, name: field.name})
  );
  
  var submitBtn = document.createElement('BUTTON');
  submitBtn.setAttribute('type', 'submit');
  submitBtn.innerText = 'Submit'
  customerForm.appendChild(submitBtn);
}

function buildCustomerField(field) {
  var stringField = document.createElement('DIV');
  var stringInput = document.createElement('INPUT');
  var stringLabel = document.createElement('LABEL');
  
  stringInput.setAttribute('placeholder', field.label);
  stringInput.setAttribute('name', field.name);
  stringInput.setAttribute('id', field.name);
  stringLabel.innerText = field.label;
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

  console.log(values)
  let errors = validateCustomerForm(values)
  if (Object.keys(errors).length) {
    console.log(Object.keys(errors).length)
  }
}

function validateCustomerForm(values) {
  const errors = {}

  if (!values.email) {
    errors.elEmailField = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.elEmailField = 'Invalid email address'
  }
  if (values.phone) {
    if (values.phone.length > 15) {
      errors.phone = 'Must 15 digits or less'
    } else if (!(/[0-9]/i.test(values.phone))) {
      errors.phone = 'Valid number required'
    } 
  }

  return errors;
}