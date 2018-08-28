'use strict'

$(() => {
  $('.js-slick').slick({
    infinite: true,
    slidesToShow: 2,
    prevArrow: '<button type="button" class="slide__arrow slide__arrow--prev">Previous</button>',
    nextArrow: '<button type="button" class="slide__arrow slide__arrow--next">Next</button>',
  });
})