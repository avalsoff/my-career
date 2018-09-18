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

// https://codepen.io/anon/pen/RYYzrq

$(() => {
  makeSlickCarousel('.index-page__carousel', 2);
  makeSlickCarousel('.edu-item-page__carousel', 1);
  
  $('.menu__link--hamburger').click(() => {
    $('.menu').toggleClass('menu--js-show');
  });
  
  $("path").hover(function() {
    $('#info-box').css('display', 'block');
    $('#info-box').html( $(this).data('info') );
  });
  
  $("path").mouseleave(e => {
    $('#info-box').css('display', 'none');
  });
  
  $(document).mousemove(e => {
    $('#info-box')
    .css('top', e.pageY - $('#info-box').height() - 30);
    $('#info-box')
    .css('left', e.pageX - $('#info-box').width() / 2);
  }).mouseover();  
  
  let $prevActive = $('.m21');
  let $currentActive;
  $("path, .link").click(function() {
    if ($currentActive) {
      $prevActive = $currentActive;
    }
    const currentSelector = '.' + this.classList[0];
    $currentActive = $(currentSelector);
    if ($prevActive) {
      $prevActive.toggleClass('active');
    }
    $currentActive.toggleClass('active');
  });  
  
});