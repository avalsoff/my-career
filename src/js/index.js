'use strict'

function makeSlickCarousel (selector, slidesToShow) {
  $(selector).slick({
    infinite: true,
    slidesToShow,
    prevArrow: '<button type="button" class="slick__arrow slick__arrow--prev">Previous</button>',
    nextArrow: '<button type="button" class="slick__arrow slick__arrow--next">Next</button>', 
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
    ]
  });
}

$(() => {
  makeSlickCarousel('.index-page__carousel', 2);
  makeSlickCarousel('.edu-item-page__carousel', 1);
  
  const body = $('body');
  
  let i = 0;
  const magic = () => {
    body.css('filter', `blur(${i}px)`);
    i += .8;
  }
  
  let interval = {};  
  let isMagicStarted = false;
  const startMagic = () => {
    if (!isMagicStarted) {
      isMagicStarted = true;
      interval = setInterval(magic, 100);
    } else {
      isMagicStarted = false;
      clearInterval(interval)
    }
  }

  $('.logo').click(startMagic);


  const hamburger = $('.menu__link--hamburger');
  const menu = $('.menu');

  hamburger.click(() => {
    menu.toggleClass('menu--js-show');
  });
})