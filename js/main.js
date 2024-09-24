// Запуск анимации при загрузки страницы

function loadWindow(conditions) {
  window.addEventListener('load', conditions);
}

// Элементы

function getSlide(...elements) {
  const slide = document.createElement('div');
  slide.classList.add('swiper-slide', 'stages-list__item', 'stages-item');
  elements.forEach(element => {
    slide.append(element);
  });
  return slide;
}

function getTextContent(text, numberText) {
  const slideBlock = document.createElement('div');
  slideBlock.classList.add('stages-item');

  const numberBlock = document.createElement('div');
  numberBlock.classList.add('stages-item__number');
  numberBlock.textContent = numberText;

  const p = document.createElement('p');
  p.classList.add('stages-item__descr');
  p.textContent = text;

  slideBlock.append(numberBlock, p);
  return slideBlock;
}

// Анимация

// Бегущая строка

function running() {
  const runningString = document.querySelectorAll('.running__string');
  const timelineRunning = gsap.timeline({ repeat: -1 });
  timelineRunning.to(runningString, {
    xPercent: -100,
    ease: 'none',
    duration: 25,
  });
}

// Запускаем бегущую строку
loadWindow(running);

// Бой шахмат

function moveChess() {
  const movingHorse = document.querySelector('#horse');
  const movingPawn = document.querySelector('#pawn');

  // Функция для получения расстояния между элементами
  function getDistanceBetweenElements(elem1, elem2) {
    const rect1 = elem1.getBoundingClientRect();
    const rect2 = elem2.getBoundingClientRect();
    const distanceX = rect2.left - rect1.left;
    return distanceX;
  }

  // Рассчитываем расстояние между pawn и horse
  const distanceToMove = getDistanceBetweenElements(movingPawn, movingHorse);

  // Анимация боя шахмат
  const timelineFight = gsap.timeline({ repeat: -1, delay: 1 });

  timelineFight.to(movingPawn, {
    x: distanceToMove + 200,
    ease: 'none',
    duration: 5,
  });

  timelineFight
    .to(movingPawn, {
      x: distanceToMove - 70,
      ease: 'power1.inOut',
      duration: 0.5,
    })
    .to(movingPawn, {
      x: distanceToMove,
      ease: 'power1.out',
      duration: 0.3,
    });

  timelineFight.to(movingHorse, {
    rotation: 90,
    y: 50,
    ease: 'power4.in',
    duration: 1,
  });

  timelineFight.to(movingHorse, {
    opacity: 0,
    ease: 'power1.out',
    duration: 1,
  });

  timelineFight.to(movingPawn, {
    opacity: 0,
    ease: 'power1.out',
    duration: 1,
  });

  timelineFight.set(movingHorse, {
    x: 0,
    y: 0,
    rotation: 0,
    opacity: 1,
  });

  timelineFight.set(movingPawn, {
    x: 0,
    opacity: 1,
  });

  timelineFight.to([movingHorse, movingPawn], {
    opacity: 1,
    ease: 'power1.in',
    duration: 1,
  });
}

// Слайдер

const swiperParticipants = new Swiper('.participants-swiper', {
  slidesPerView: 3, // Количество видимых слайдов на десктопе
  spaceBetween: 20, // Отступы между слайдами
  navigation: {
    nextEl: '.participants__next',
    prevEl: '.participants__prev',
  },
  pagination: {
    el: '.participants__pagination',
    type: 'fraction', // Пагинация с цифрами
    formatFractionCurrent: function (number) {
      return number; // Текущий слайд
    },
    formatFractionTotal: function (number) {
      return number; // Всего слайдов
    },
  },
  loop: true, // Карусель зациклена
  autoplay: {
    delay: 4000, // Автоматическая смена каждые 4 секунды
    disableOnInteraction: false, // Автопрокрутка не останавливается при взаимодействии
  },
  breakpoints: {
    320: {
      slidesPerView: 1, // На мобильных устройствах показываем по одному слайду
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 2, // На планшетах показываем два слайда
      spaceBetween: 15,
    },
    1024: {
      slidesPerView: 3, // На десктопах три слайда
      spaceBetween: 20,
    },
  },
});

const swiperStages = document.querySelector('#swiper');
const swiperWrapperStages = document.querySelector('#swiper-wrapper');

// Адаптив анимации

let swiperStagesSwiper = null;

function adaptive(classSwiper, classSwiperWrapper) {
  console.log(window.innerWidth);

  function challengeSwiper() {
    // Уничтожаем предыдущий экземпляр Swiper, если он был создан
    if (swiperStagesSwiper !== null) {
      swiperStagesSwiper.destroy(true, true);
      swiperStagesSwiper = null; // Сбрасываем переменную
    }

    // Инициализируем новый экземпляр Swiper
    swiperStagesSwiper = new Swiper('.stages__swiper', {
      slidesPerView: 1,
      spaceBetween: 40,
      navigation: {
        nextEl: '.stages__button-next',
        prevEl: '.stages__button-prev',
      },
      pagination: {
        el: '.stages__pagination',
        clickable: true,
        type: 'bullets',
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
      },
    });
  }

  // Проверяем разрешение экрана
  if (window.innerWidth <= 943) {
    classSwiper.classList.add('swiper');
    classSwiperWrapper.classList.add('swiper-wrapper');
    classSwiperWrapper.classList.remove('stages__list');

    challengeSwiper();

    console.log('Swiper работает');
  } else {
    classSwiper.classList.remove('swiper');
    classSwiperWrapper.classList.remove('swiper-wrapper');
    classSwiperWrapper.classList.add('stages__list');

    if (swiperStagesSwiper !== null) {
      swiperStagesSwiper.destroy(true, true);
      swiperStagesSwiper = null;
    }
    console.log('Swiper не работает');
  }

  if (window.innerWidth <= 768) {
    swiperWrapperStages.textContent = '';

    swiperWrapperStages.append(
      getSlide(
        getTextContent(
          'Строительство железнодорожной магистрали Москва-Васюки',
          '1',
        ),
        getTextContent(
          'Открытие фешенебельной гостиницы Проходная пешка и других небоскрёбов',
          '2',
        ),
      ),
      getSlide(
        getTextContent(
          'Поднятие сельского хозяйства в радиусе на тысячу километров: производство овощей, фруктов, икры, шоколадных конфет',
          '3',
        ),
      ),
      getSlide(
        getTextContent('Строительство дворца для турнира', '4'),
        getTextContent('Размещение гаражей для гостевого автотранспорта', '5'),
      ),
      getSlide(
        getTextContent(
          'Постройка сверхмощной радиостанции для передачи всему миру сенсационных результатов',
          '6',
        ),
      ),
      getSlide(
        getTextContent(
          'Создание аэропорта Большие Васюки с регулярным отправлением почтовых самолётов и дирижаблей во все концы света, включая Лос-Анжелос и Мельбурн',
          '7',
        ),
      ),
    );
  } else {
    // Запускаем анимацию шахмат

    loadWindow(moveChess());
    console.log('Бой запущен');
  }
}

window.addEventListener('resize', function () {
  adaptive(swiperStages, swiperWrapperStages);
});

window.addEventListener('load', function () {
  adaptive(swiperStages, swiperWrapperStages);
});

window.addEventListener('orientationchange', function () {
  adaptiveSwiper(swiperStages, swiperWrapperStages);
});
