//var stripe = Stripe('pk_test_51HHE7GIMLqIUPdeXOOLW5iIi1YajmkSIxNoVtR6z0KKXeg9nyR2oKJ8SltyIlrct5Wd2Jo89jdZY4BU9IzDxHmuI00Vxsj7ulc');
var stripe = Stripe('pk_live_51HHE7GIMLqIUPdeXiIEV1nLdn9PMJsyPPomx5uvJCqwYS5Z2gyFUsVneI1V7eoLyIk8DNgfjDLXSvWxmvtiUFPtK00teFw6h7c');
var elements = stripe.elements();

var numOfLaps = 2

function updateLaps(num) {
  numOfLaps = num;
}

const prices = [
  {
    laps: 0,
    groupId: '208',
    tier: '2',
    priceCode: 'price_1HLbHUIMLqIUPdeX9eRpFByX'
  },
  {
    laps: 2,
    groupId: '208',
    tier: '2',
    priceCode: 'price_1HKzTQIMLqIUPdeXSo10El5q'
  },
  {
    laps: 4,
    groupId: '208',
    tier: '2',
    priceCode: 'price_1HL1ieIMLqIUPdeXeB42UNnv'
  },
  {
    laps: 6,
    groupId: '208',
    tier: '2',
    priceCode: 'price_1HKzTQIMLqIUPdeXjfyRA35C'
  },
  {
    laps: 8,
    groupId: '208',
    tier: '2',
    priceCode: 'price_1HKzTQIMLqIUPdeX1kzglgdQ'
  },
  {
    laps: 10,
    groupId: '208',
    tier: '2',
    priceCode: 'price_1HKzTQIMLqIUPdeXnBsgzaGb'
  },
  {
    laps: 12,
    groupId: '208',
    tier: '2',
    priceCode: 'price_1HKzTRIMLqIUPdeXNuAva4Lu'
  },
  {
    laps: 0,
    groupId: '207',
    tier: '1',
    priceCode: 'price_1HLbHUIMLqIUPdeXH8yYf5sl'
  },
  {
    laps: 2,
    groupId: '207',
    tier: '1',
    priceCode: 'price_1HL18eIMLqIUPdeX1nF1kPuh'
  },
  {
    laps: 4,
    groupId: '207',
    tier: '1',
    priceCode: 'price_1HL18eIMLqIUPdeXdRRVaDQl'
  },
  {
    laps: 6,
    groupId: '207',
    tier: '1',
    priceCode: 'price_1HL18eIMLqIUPdeXOSoiZmal'
  },
  {
    laps: 8,
    groupId: '207',
    tier: '1',
    priceCode: 'price_1HL18eIMLqIUPdeXwugiMegP'
  },
  {
    laps: 10,
    groupId: '207',
    tier: '1',
    priceCode: 'price_1HL18eIMLqIUPdeXC7BEqlOS'
  },
  {
    laps: 12,
    groupId: '207',
    tier: '1',
    priceCode: 'price_1HL18eIMLqIUPdeX6mOmB7HY'
  },
  {
    laps: 2,
    groupId: '209',
    tier: 'custom',
    priceCode: 'price_1HL1mjIMLqIUPdeXKRGiJebQ'
  },
  {
    laps: 4,
    groupId: '209',
    tier: 'custom',
    priceCode: 'price_1HL1mjIMLqIUPdeXmZiM72rS'
  },
  {
    laps: 6,
    groupId: '209',
    tier: 'custom',
    priceCode: 'price_1HL1nAIMLqIUPdeXkoBKTKnV'
  },
  {
    laps: 8,
    groupId: '209',
    tier: 'custom',
    priceCode: 'price_1HL1nQIMLqIUPdeX5gNFvNtF'
  },
]

// Redirect to checkout option
function checkout(appt) {
  
  function checkGroupId(price) {
    return price.groupId === appt.resourceGroupId;
  }
  
  function checkNumOfLaps(price) {
    return price.laps === numOfLaps;
  }

  var price = prices.filter(checkGroupId).filter(checkNumOfLaps)[0].priceCode;

  stripe
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
