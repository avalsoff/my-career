'use strict';
let $ = jQuery;

function slickArrow(mod) {
  return `<button type="button" class="slick__arrow slick__arrow--${mod}">Previous</button>`
}

function makeSlickCarousel(selector, slidesToShow) {
  $(selector).slick({
    infinite: true,
    slidesToShow,
    prevArrow: slickArrow('prev'),
    nextArrow: slickArrow('next'),
    responsive: [{
      breakpoint: 992,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }]
  });
}

function makeChart(jqObj, type, categories, data) {
  new Highcharts.Chart({
    title: '',
    tooltip: {
      enabled: false
    },
    chart: {
      type,
      renderTo: jqObj[0],
      width: 550,
      height: 80 + '%'
    },
    xAxis: {
      categories
    },
    yAxis: {
      title: false
    },
    series: [{
      data,
      showInLegend: false,
      title: '',
      color: '#0070BA',
      pointWidth: 20,
      dataLabels: {
        enabled: true
      }
    }]
  });
}

function initCharts(selector) {
  let $charts = $(selector);
  $charts.each(function (i, el) {
    let $el = $(el);
    let {
      type,
      categories,
      data
    } = $el.data('chart');
    makeChart($el, type, categories, data);
  });
}

function tabFactory($buttons, $prevActive) {
  let $currentActive = null;

  return () => {
    $buttons.click(function () {
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
  }
}

// https://codepen.io/anon/pen/RYYzrq generate a tooltip data attr for the map regions

$(() => {
  makeSlickCarousel('.index-page__carousel', 2);
  makeSlickCarousel('.edu-item-page__carousel', 1);
  initCharts('.js-chart');

  $('.menu__link--hamburger').click(() => {
    $('.menu').toggleClass('menu--js-show');
  });
});

//Pages
function economyPage() {
  $(() => {
    const $path = $('.reg-map');
    $path.hover(function () {
      $infoBox.css('display', 'block');
      $infoBox.html($(this).data('info'));
    });

    $path.mouseleave(e => {
      $infoBox.css('display', 'none');
    });

    const $infoBox = $('#info-box');
    $(document).mousemove(e => {
      $infoBox.css('top', e.pageY - $infoBox.height() - 30);
      $infoBox.css('left', e.pageX - $infoBox.width() / 2);
    }).mouseover();

    tabFactory(
      $('.js-map-tab-button'),
      $('.js-map-tab1'),
    )();
    tabFactory(
      $('.js-section-tab-button'),
      $('.js-section-tab1'),
    )();
    tabFactory(
      $('.js-chartgroup-tab-button'),
      $('.js-chartgroup-tab1'),
    )();
  });
}