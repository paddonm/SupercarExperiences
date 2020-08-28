//var stripe = Stripe('pk_test_TrpRcCP2CIUDXBlhvXq8h2Lm');
var stripe = Stripe('pk_live_pychpZQBLwwhp1tvGO1hCzxQ00Xef8u0oq');
var elements = stripe.elements();

// Redirect to checkout option

function checkout(appt) {
  var prices = [
    {
      sessions: 1,
      groupId: '230',
      priceCode: 'price_1HFV3tAh5wNa2l077pYLOeGG'
    },
    {
      sessions: 1,
      groupId: '231',
      priceCode: 'price_1HFV3tAh5wNa2l07RznrWIuh'
    },
    {
      sessions: 1,
      groupId: '232',
      priceCode: 'price_1HEiJvAh5wNa2l07X8KOrl5F'
    },
  ]
  
  function checkGroupId(price) {
    return price.groupId === appt.resourceGroupId;
  }

  var price = prices.filter(checkGroupId)[0].priceCode;

  stripe
    .redirectToCheckout({
      lineItems: [
        // Replace with the ID of your price
        {price: price, quantity: 1},
      ],
      customerEmail: appt.email,
      mode: 'payment',
      successUrl: window.origin + window.location.pathname + `?success=true&apptId=${appt.id}`,
      cancelUrl: window.origin + window.location.pathname + `?success=false&apptId=${appt.id}`
    })
    .then(function(result) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
      alert('Something went wrong, please try again.');
      console.log(result)
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
