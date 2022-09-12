function goPrev( sliderProps, slide ) {

  let { elSlide,  elButtonPrev, elButtonNext, elNumbers } = sliderProps;

  elSlide.forEach(( el, index ) => {

      if( slide < elSlide.length ) {

        elButtonNext.disabled = false;

      }

      if( slide === 0 ) {

        elButtonPrev.disabled = true;

      }

      if( slide > 0 ) {

        elButtonPrev.disabled = false;

      }

      if( slide === index ) {

        elSlide[index +1].style.transform = 'translateX(0%)';
        elSlide[index +1].classList.remove('active');
        elSlide[index].classList.add('active');

      }
      
    });

    elNumbers.innerHTML = `${slide+1}/${elSlide.length}`;

}
//prev()

function goNext( sliderProps, slide, direction ) {

  let { elSlide,  elButtonPrev, elButtonNext, elNumbers } = sliderProps;

  elSlide.forEach(( el, index ) => {

    if( slide +1 === elSlide.length ) {

      elButtonNext.disabled = true;

    }

    if( slide > 0 ) {

      elButtonPrev.disabled = false;

    }

    if( slide === index ) {

      elSlide[index].style.transform = `translateX(-${direction}%)`;
      elSlide[index -1].classList.remove('active');
      elSlide[index].classList.add('active');

    }

  });

  elNumbers.innerHTML = `${slide+1}/${elSlide.length}`;

}
//next()

function getFullscreenElement() {

  return document.fullscreenElement;

}
//getFullscreenElement()

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
//toggleFullscreen()

function setSlider() {

  let currentSlide = 0;
  let goTo = 0; 

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

  elButtonPrev.addEventListener( 'click', e => {

    if(e.target.matches( '.prev, .left' )) {

      currentSlide --;
      goTo -= 100;

      goPrev( sliderParams, currentSlide, goTo );
    }

  });

  elButtonNext.addEventListener( 'click', ( e ) => {

    if(e.target.matches( '.next, .right' )) {

      currentSlide ++;
      goTo += 100;
      
      goNext( sliderParams, currentSlide, goTo );
    }

  });

  elButtonFullscreen.addEventListener( 'click', e => {

    if(e.target.matches( '.slider-container-fs--button, .fs-in--icon, .fs-out--icon' )) {

      toggleFullscreen( sliderParams );

    }

  });
  
}
//slider()

document.addEventListener("DOMContentLoaded", setSlider, false);

