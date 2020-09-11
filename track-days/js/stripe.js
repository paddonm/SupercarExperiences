//var stripe = Stripe('pk_test_51HHE7GIMLqIUPdeXOOLW5iIi1YajmkSIxNoVtR6z0KKXeg9nyR2oKJ8SltyIlrct5Wd2Jo89jdZY4BU9IzDxHmuI00Vxsj7ulc');
// var elements = Stripe('pk_live_51HHE7GIMLqIUPdeXiIEV1nLdn9PMJsyPPomx5uvJCqwYS5Z2gyFUsVneI1V7eoLyIk8DNgfjDLXSvWxmvtiUFPtK00teFw6h7c').elements();

var numOfLaps = 2

function updateLaps(num) {
  numOfLaps = num;
}

// Redirect to checkout option
function checkout(appt) {
  
  function checkGroupId(price) {
    return price.groupId === appt.resourceGroupId;
  }
  
  function checkNumOfLaps(price) {
    return price.laps === numOfLaps;
  }

  var price = prices.filter(checkGroupId).filter(checkNumOfLaps)[0].priceCode;

  Stripe('pk_live_51HHE7GIMLqIUPdeXiIEV1nLdn9PMJsyPPomx5uvJCqwYS5Z2gyFUsVneI1V7eoLyIk8DNgfjDLXSvWxmvtiUFPtK00teFw6h7c')
    .redirectToCheckout({
      lineItems: [
        // Replace with the ID of your price
        {price: price, quantity: 1},
      ],
      customerEmail: appt.email,
      mode: 'payment',
      successUrl: window.origin + window.location.pathname + `?success=true&apptId=${appt.id}&confirmation=${appt.confirmationNumber}`,
      cancelUrl: window.origin + window.location.pathname + `?success=false&apptId=${appt.id}`
    })
    .then(function(result) {console.log('failing')
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
      alert('Something went wrong, please try again.');
    });
}

// END Redirect to checkout option

// Checkout widget option

// var cardElement = elements.create('card');
// var ccIcon = document.getElementById('cc-icon');
// var elCc = document.getElementById('cc');

// cardElement.mount('#card-element');


// var nameInput = document.getElementById('stripe-name-input');
// var namePrev = document.getElementById('stripe-name-preview');

// function handleNameInput() {
//   namePrev.innerHTML = nameInput.value
// }

// const cardTypes = {
//   visa       : 'visa', 
//   mastercard : 'mastercard', 
//   american   : 'amex',
//   jcb        : 'jcb',
// }

// var card = cardTypes.visa

// cardElement.on('change', function(e) {
//   setCardType(e.brand);
//   console.log('evt', e);
// });

// function setCardType(type) {
//   card = type;
//   if (Object.values(cardTypes).includes(type)) {
//     ccIcon.className = `fab fa-cc-${type} fa-4x`;
//     elCc.className = `cc ${type}`
//   }
//   else
//     ccIcon.className = 'fad fa-credit-card-front fa-4x';
// }

// function checkout() {
//   stripe
//   .confirmCardPayment('{PAYMENT_INTENT_CLIENT_SECRET}', {
//     payment_method: {
//       card: cardElement,
//       billing_details: {
//         name: 'Jenny Rosen',
//       },
//     },
//   })
//   .then(function(result) {
//     // Handle result.error or result.paymentIntent
//   });
// }

// END Checkout widget option
