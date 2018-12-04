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
    plotOptions: {
      pie: {
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.y:.1f}',
        }
      }
    },
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
  makeSlickCarousel('.index-page__carousel', 1);
  makeSlickCarousel('.edu-item-page__carousel', 1);
  
  $('.header-carousel').slick({
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
  });

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
      $('.js-map-tab1')
    )();
    tabFactory(
      $('.js-section-tab-button'),
      $('.js-section-tab1')
    )();
    tabFactory(
      $('.js-chartgroup-tab-button'),
      $('.js-chartgroup-tab1')
    )();
  });
}

// function careerTest(is18) {
//   const elem = {
//     startBtn: $('.test__button--start'),
//     description: $('.test__description'),
//     questionsBlock: $('.test__questions'),
//     questions: $('.test__block'),
//     prevBtn: $('.test__button--prev'),
//     nextBtn: $('.test__button--next'),
//     result: $('.test__result'),
//     topIndex: $('.test__top-index'),
//     bottomIndex: $('.test__bottom-index'),
//     answerBtns: $('.test__answer'),
//     resultPoints: $('.test__points')
//   }
//   elem.currentQuestion = elem.questions.first();

//   const fadeDelay = 150;
//   const maxIndex = elem.questions.length;
//   let currentIndex = 0;
//   const testResult = {};
//   const testHistory = [];


//   elem.startBtn.click(() => {
//     elem.description.fadeOut(fadeDelay);
//     elem.startBtn.fadeOut(fadeDelay, () => {
//       elem.questionsBlock.fadeIn(fadeDelay);
//       elem.currentQuestion.fadeIn(fadeDelay);
//     });
//     elem.prevBtn.prop('disabled', true);
//     elem.nextBtn.prop('disabled', true);
//     if (currentIndex === maxIndex) {
//       elem.nextBtn.prop('disabled', true);
//     }
//     updateIndexes();
//   });

//   elem.nextBtn.click(() => {
//     const checked = elem.currentQuestion.find('.test__input:checked');
//     if (!checked.length) {
//       return;
//     }

//     const current = {
//       value: Number(checked.val()),
//       key: checked.data('key')
//     }

//     testResult[current.key] = testResult[current.key] ?
//       testResult[current.key] + current.value :
//       current.value;

//     testHistory.push(current);

//     if (elem.prevBtn.is(':disabled')) {
//       elem.prevBtn.prop('disabled', false)
//     }

//     elem.currentQuestion.fadeOut(fadeDelay, function () {
//       elem.currentQuestion = $(this).next();
//       elem.currentQuestion.fadeIn(fadeDelay);
//     });
//     elem.nextBtn.prop('disabled', true);

//     ++currentIndex;
//     if (currentIndex === maxIndex) {

//       if (is18) {
//         const numberOfPoints = testResult.test;
//         const resultKey = numberOfPoints <= 12 ?
//           'free' :
//           numberOfPoints <= 24 ?
//           'art' :
//           numberOfPoints <= 36 ?
//           'error' :
//           numberOfPoints <= 48 ?
//           'sign_system_middle' :
//           'sign_system';

//         elem.questionsBlock.fadeOut(fadeDelay, () => {
//           elem.resultPoints.fadeIn(0).html(elem.resultPoints.text().replace(
//             '{{res}}',
//             numberOfPoints
//           ));
//           elem.result.fadeIn(fadeDelay);
//           $('.test__res[data-key="' + resultKey + '"]').fadeIn(0)();
//         });
//       } else {
//         const [resultKey, numberOfPoints] = Object.entries(testResult).reduce(([maxKey, maxVal], [curKey, curVal]) => {
//           return curVal >= maxVal ? [curKey, curVal] : [maxKey, maxVal];
//         });

//         elem.questionsBlock.fadeOut(fadeDelay, () => {
//           elem.resultPoints.fadeIn(0)().html(elem.resultPoints.text().replace(
//             '{{res}}',
//             numberOfPoints
//           ));
//           elem.result.fadeIn(fadeDelay);
//           $('.test__res[data-key="' + resultKey + '"]').fadeIn(0)();
//         });
//       }
//     } else {
//       updateIndexes();
//     }
//   });

//   elem.prevBtn.click(() => {
//     if (elem.nextBtn.is(':disabled')) {
//       elem.nextBtn.prop('disabled', false);
//     }

//     const {
//       key: lastKey,
//       value: lastValue
//     } = testHistory.pop();
//     testResult[lastKey] -= lastValue;

//     elem.currentQuestion.fadeOut(fadeDelay, function () {
//       elem.currentQuestion = $(this).prev();
//       elem.currentQuestion.fadeIn(fadeDelay);
//     });
//     if (--currentIndex === 0) {
//       elem.prevBtn.prop('disabled', true)
//     }
//     updateIndexes();
//   });

//   elem.answerBtns.click(() => {
//     elem.nextBtn.prop('disabled', false);
//   });

//   function updateIndexes() {
//     elem.topIndex.html(`Вопрос ${currentIndex + 1} из ${maxIndex}`);
//     elem.bottomIndex.html(`${currentIndex + 1} / ${maxIndex}`);
//   }
// }