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

function makeChart(jqObj, type, categories, data) {
  new Highcharts.Chart({
    title: '',
    tooltip: {
      enabled: false
    },
    chart: {
      type,
      renderTo: jqObj[0]
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
  $charts.each(function(i, el) {
    let $el = $(el);
    let { type, categories, data } = $el.data('chart');
    makeChart($el, type, categories, data);
  });
}

// https://codepen.io/anon/pen/RYYzrq

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
    $("path, .link, button").click(function() {
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
}


//Make chat

//var $containers = $('.container'),
// chartConfig = {
//   chart: {
//       renderTo: null,
//       defaultSeriesType: 'column'
//   }
// };

// $containers.each(function(i, e){
// chartConfig.chart.renderTo = e;
// new Highcharts.Chart(chartConfig);
// });