function goPrev( sliderProps, slide ,direction) {
  let { elSlide,  elButtonPrev, elButtonNext, elNumbers } = sliderProps;

  elSlide.forEach(( el, index ) => {
      if( slide < elSlide.length )  elButtonNext.disabled = false;
      if( slide === 0 ) elButtonPrev.disabled = true;
      if( slide > 0 )  elButtonPrev.disabled = false;

      if( slide === index ) {
        elSlide[index +1].style.transform = `translateX(-${direction}%)`;
        elSlide[index +1].classList.remove('active');
        elSlide[index].classList.add('active');
      }
    });
    elNumbers.innerHTML = `${slide+1}/${elSlide.length}`;
}

function goNext( sliderProps, slide, direction ) {
  let { elSlide,  elButtonPrev, elButtonNext, elNumbers } = sliderProps;

  elSlide.forEach(( el, index ) => {

    if( slide +1 === elSlide.length ) elButtonNext.disabled = true;
    if( slide > 0 )  elButtonPrev.disabled = false;

    if( slide === index ) {
      elSlide[index].style.transform = `translateX(-${direction}%)`;
      elSlide[index -1].classList.remove('active');
      elSlide[index].classList.add('active');
    }
  });
  elNumbers.innerHTML = `${slide+1}/${elSlide.length}`;
}

function getFullscreenElement() {
  return document.fullscreenElement;
}

function toggleFullscreen( sliderProps ) {

  let { elSliderContainer } = sliderProps;

  if( getFullscreenElement() ) {
    elSliderContainer.classList.remove( 'fullscreen' );
    document.exitFullscreen();
  } else {
    elSliderContainer.classList.add( 'fullscreen' );
    elSliderContainer.webkitRequestFullscreen()
  }
}

function setSlider(initialParamsForSlider) {
  let { currentSlide ,goTo } = initialParamsForSlider

  let sliderParams = {
    elSlide: document.querySelectorAll( '.slide' ),
    elSliderContainerSlides: document.querySelector( '.slider-container--slides' ),
    elButtonPrev: document.querySelector( '.prev' ),
    elButtonNext: document.querySelector( '.next' ),
    elNumbers: document.querySelector( '.numbers' ),
    elSliderContainer: document.querySelector( '.slider-container' ),
    elButtonFullscreen: document.querySelector('.slider-container-fs--button')
  };

  let { elSlide, elSliderContainerSlides, elButtonPrev, elButtonNext, elNumbers, elButtonFullscreen } = sliderParams;

  elSliderContainerSlides.style.width = `${elSlide.length * 100}%`;
  elButtonPrev.disabled = true;
  elNumbers.innerHTML = `${currentSlide + 1}/${elSlide.length}`;

  elButtonPrev.addEventListener( 'click', eventClick => {
      currentSlide -= 1;
      goTo -= 100;
      goPrev( sliderParams, currentSlide, goTo );
  });

  elButtonNext.addEventListener( 'click', eventClick => {
      currentSlide +=1;
      goTo += 100;
      goNext( sliderParams, currentSlide, goTo );
  });

  elButtonFullscreen.addEventListener( 'click', eventClick => {
    toggleFullscreen( sliderParams );
  });
}

document.addEventListener("DOMContentLoaded", setSlider({ currentSlide: 0, goTo: 0 }), false);

