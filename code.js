function next( currentSlide, slides, nextBtn, prevBtn, slideNumber, goTo ) {

  slides.forEach(( el, index ) => {

    if( currentSlide +1 === slides.length ) {

      nextBtn.disabled = true;

    }

    if( currentSlide > 0 ) {

      prevBtn.disabled = false;

    }

    if( currentSlide === index ) {

      slides[index].style.transform = `translateX(-${goTo}%)`;
      slides[index -1].classList.remove('active');
      slides[index].classList.add('active');

    }

  });

  slideNumber.innerHTML = `${currentSlide+1}/${slides.length}`;

}
//next()

function prev( currentSlide, slides, nextBtn, prevBtn, slideNumber, goTo ) {

  slides.forEach(( el, index ) => {

      if( currentSlide < slides.length ) {

        nextBtn.disabled = false;

      }

      if( currentSlide === 0 ) {

        prevBtn.disabled = true;

      }

      if( currentSlide > 0 ) {

        prevBtn.disabled = false;

      }

      if( currentSlide === index ) {

        slides[index +1].style.transform = 'translateX(0%)';
        slides[index +1].classList.remove('active');
        slides[index].classList.add('active');

      }
      
    });

    slideNumber.innerHTML = `${currentSlide+1}/${slides.length}`;

}
//prev()

function getFullscreenElement() {

  return document.fullscreenElement;

}
//getFullscreenElement()

function toggleFullscreen( div ) {

  if( getFullscreenElement() ) {

    div.classList.remove( 'fullscreen' );
    document.exitFullscreen();

  } else {

    div.classList.add( 'fullscreen' );
    div.requestFullscreen().catch(( e ) => {
      console.log(e);

    });

  }
  
}
//toggleFullscreen()

function slider() {

  let currentSlide = 0;
  let goTo = 0; 

  const slides = document.querySelectorAll( '.slide' );
  const nextBtn = document.querySelector( '.next' );
  const prevBtn = document.querySelector( '.prev' );
  const slideNumber = document.querySelector( '.numbers' );
  const fullScreenBtn = document.querySelector('.slider-container-fs--button');
  const sliderContainer = document.querySelector( '.slider-container' );
  const sliderContainerSlides = document.querySelector( '.slider-container--slides' );

  sliderContainerSlides.style.width = `${slides.length * 100}%`;

  prevBtn.disabled = true;

  slideNumber.innerHTML = `${currentSlide+1} / ${slides.length}`;

  prevBtn.addEventListener( 'click', e => {

    if(e.target.matches( '.prev, .left' )) {

      currentSlide --;
      goTo -= 100;

      prev( currentSlide, slides, nextBtn, prevBtn, slideNumber, goTo );
    }

  });

  nextBtn.addEventListener( 'click', ( e ) => {

    if(e.target.matches( '.next, .right' )) {

      currentSlide ++;
      goTo += 100;
      
      next( currentSlide, slides, nextBtn, prevBtn, slideNumber, goTo );
    }

  });

  fullScreenBtn.addEventListener( 'click', e => {

    if(e.target.matches( '.fs-in--icon, .fs-out--icon' )) {

      toggleFullscreen( sliderContainer );

    }

  });
  
}
//slider()

document.addEventListener("DOMContentLoaded", slider, false);

