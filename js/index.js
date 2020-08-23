const brands = [
  './img/logos/lambo.png',
  './img/logos/porsche.png',
  './img/logos/audi.png',
  './img/logos/chevy.png',
  './img/logos/ferrari.png',
  './img/logos/mclaren.png',
  './img/logos/merc.png',
  './img/logos/nissan.png',
]

const elBrandList = document.getElementById('brandsList');

function getBrands(brand) {
  elItem = document.createElement('LI');
  elImage = document.createElement('IMG');

  elImage.src = brand;
  elItem.appendChild(elImage);

  elBrandList.appendChild(elItem)
}

brands.map(getBrands)