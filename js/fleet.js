const vehicles = [
  {
    id: 27157,
    car: 'AUDI R8 SPYDER',
    tier: 'Tier 2',
    imgs: [
      './img/cars/r8/audi-r8-spyder-1.jpg',
      './img/cars/r8/audi-r8-spyder.png',
      './img/cars/r8/audi-r8-spyder-2.jpg',
      './img/cars/r8/audi-r8-spyder-3-100x100.jpg',
    ]
  },
  {
    id: 27156,
    car: 'FERRARI 430',
    tier: 'Tier 2',
    imgs: [
      './img/cars/f430/ferrari-f430-1-600x450.jpg',
      './img/cars/f430/ferrari-f430-300x188-removebg-preview.png'
  ]
  },
  {
    id: 27151,
    car: 'FERRARI 458 SPYDER',
    tier: 'Tier 1',
    imgs: [
      './img/cars/458-spyder/ferrari-458-spyder-1.jpg'
  ]
  },
  {
    id: 27160,
    car: 'LAMBORGHINI AVENTADOR',
    tier: 'Custom Tier',
    imgs: [
      './img/cars/aventador/aventador.png'
  ]
  },
  {
    id: 27155,
    car: 'LAMBORGHINI GALLARDO',
    tier: 'Tier 2',
    imgs: [
      './img/cars/gallardo/lamborghini-gallardo-1-600x366.jpg'
  ]
  },
  {
    id: 27155,
    car: 'LAMBORGHINI HURACAN COUPE',
    tier: 'Tier 1',
    imgs: [
      './img/cars/r8/audi-r8-spyder-1.jpg'
  ]
  },
  {
    id: 27149,
    car: 'LAMBORGHINI HURACAN SPYDER',
    tier: 'Tier 1',
    imgs: [
      './img/cars/huracan-spyder/lamborghini-huracan-spyder-2.jpg',
      './img/cars/huracan-spyder/lamborghini-huracan-spyder-1-600x399.jpg',
      './img/cars/huracan-spyder/lamborghini-huracan-spyder.png',
      './img/cars/huracan-spyder/lamborghini-huracan-spyder-3.jpg',
  ]
  },
  {
    id: 27159,
    car: 'LAMBORGHINI URUS',
    tier: 'Custom Tier',
    imgs: [
      './img/cars/urus/lamborghini-urus-1.jpg',
      './img/cars/urus/lamborghini-urus.png',
      './img/cars/urus/lamborghini-urus-2-600x399.jpg',
      './img/cars/urus/lamborghini-urus-6-600x399.jpg',
  ]
  },
  {
    id: 27150,
    car: 'MCLAREN MP4-12C',
    tier: 'Tier 1',
    imgs: [
      './img/cars/mp4/mclaren-mp4-12c-1-600x399.jpg',
      './img/cars/mp4/mclaren-mp4-12c-2.png',
  ]
  },
  {
    id: 27154,
    car: 'MERCEDES AMG GTS',
    tier: 'Tier 2',
    imgs: [
      './img/cars/amg/amg2.jpg',
      './img/cars/amg/amg.png',
      './img/cars/amg/amg1.jpg',
  ]
  },
  {
    id: 27153,
    car: 'NISSAN GTR',
    tier: '2',
    imgs: [
    './img/cars/r8/audi-r8-spyder-1.jpg'
  ]
  },
  {
    id: 27152,
    car: 'PORSCHE GT3',
    tier: '1',
    imgs: [
    './img/cars/r8/audi-r8-spyder-1.jpg'
  ]
  },
]

function renderFleet() {
  var elRenderCars = document.getElementById('renderCars');
  
  function addCarItem(car) {
    var elCarItem = document.createElement('DIV');
    var elCarItemTier = document.createElement('H5');
    var elCarItemImg = document.createElement('IMG');
    var elCarItemFoot = document.createElement('DIV');
    var elCarItemTitle = document.createElement('H4');
    var elCarItemBtn = document.createElement('A');
    
    if (car.imgs.length)
      elCarItemImg.src = car.imgs[0]
    
    elCarItem.className = 'se-car-item'
    elCarItemTier.innerHTML = car.tier
    elCarItemTitle.innerHTML = car.car
    elCarItemBtn.innerHTML = 'Book Now'
    elCarItemBtn.href = 'track-days?carId=' + car.id

    elCarItemFoot.className = 'se-car-item-footer'
    elCarItemFoot.appendChild(elCarItemTitle);
    elCarItemFoot.appendChild(elCarItemBtn);
  
    elCarItem.appendChild(elCarItemTier);
    elCarItem.appendChild(elCarItemImg);
    elRenderCars.appendChild(elCarItem);
    elCarItem.appendChild(elCarItemFoot);
  }
  
  vehicles.map(addCarItem);
}

renderFleet();