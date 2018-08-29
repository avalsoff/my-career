'use strict'

$(() => {
  $('.index-page__carousel').slick({
    infinite: true,
    slidesToShow: 2,
    prevArrow: '<button type="button" class="slide__arrow slide__arrow--prev">Previous</button>',
    nextArrow: '<button type="button" class="slide__arrow slide__arrow--next">Next</button>',
  })

  const body = $('body')
  let i = 0
  let isMagicStarted = false;

  const magic = () => {
    body.css('filter', `blur(${i}px)`);
    i += .8;
  }

  let interval = {};

  const startMagic = () => {
    if (!isMagicStarted) {
      isMagicStarted = true;
      interval = setInterval(magic, 100)
    } else {
      isMagicStarted = false;
      clearInterval(interval)
    }
  }

  $('.logo').click(startMagic)

})