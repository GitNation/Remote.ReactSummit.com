const tabLink = $('.js-tab-link');
const tabClose = $('.js-tab-close');

tabLink.on('click', function(e) {
  if ($(this).hasClass('is-active')) {
    return;
  } else {
    const tabIndex = $(this).data('tab');
    const parent = $(this).parents('.js-tabs-container');
    parent.find('.js-tab-link').removeClass('is-active');
    parent.find('.js-tab-link').removeClass('is-scroll');
    parent.find('.js-tab').removeClass('is-active');
    $(this).addClass('is-active');
    if ($(window).width() < 768) {
      $(this).addClass('is-scroll');
      setTimeout(() => {
        $(this).removeClass('is-scroll');
      }, 2000);
    }
    parent.find(`.js-tab[data-tab="${tabIndex}"]`).addClass('is-active');
  }
});

tabClose.on('click', function() {
  const parent = $(this).parents('.js-tabs-container');
  parent.find('.js-tab-link').removeClass('is-active');
  parent.find('.js-tab').removeClass('is-active');
});
