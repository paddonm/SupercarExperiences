const scrollToEl = (element) => {
  const yOffset = -10; 
  const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

  window.scrollTo({top: y, behavior: 'smooth'});
}