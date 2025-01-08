const effectsPreview = document.querySelector('.img-upload__preview img');
const scaleControlElement = document.querySelector('.scale__control--value');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
let scaleControlValue = parseInt(scaleControlElement.value, 10);
const effectSliderContainer = document.querySelector('.img-upload__effect-level');
const effectSlider = effectSliderContainer.querySelector('.effect-level__slider');
const effectValue = effectSliderContainer.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');
const effectButtons = document.querySelectorAll('.effects__radio');
const effects = {
  none: [
    {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      connect: 'lower'
    }, 'none'
  ],
  chrome: [
    {
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1,
      format: {
        to: function (value) {
          return value.toFixed(1);
        },
        from: function (value) {
          return parseFloat(value);
        }
      }
    }, 'grayscale'
  ],
  sepia: [
    {
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1,
      format: {
        to: function (value) {
          return value.toFixed(1);
        },
        from: function (value) {
          return parseFloat(value);
        }
      }
    }, 'sepia'
  ],
  marvin: [
    {
      range: {
        min: 0,
        max: 100
      },
      start: 100,
      step: 1,
      format: {
        to: function (value) {
          return `${value}%`;
        },
        from: function (value) {
          return parseFloat(value);
        }
      }
    }, 'invert'
  ],
  phobos: [
    {
      range: {
        min: 0,
        max: 3
      },
      start: 3,
      step: 0.1,
      format: {
        to: function (value) {
          return `${value.toFixed(1)}px`;
        },
        from: function (value) {
          return parseFloat(value);
        }
      }
    }, 'blur'
  ],
  heat: [
    {
      range: {
        min: 1,
        max: 3
      },
      start: 3,
      step: 0.1,
      format: {
        to: function (value) {
          return value.toFixed(1);
        },
        from: function (value) {
          return parseFloat(value);
        }
      }
    }, 'brightness'
  ]
};

scaleControlSmaller.onclick = () => {
  if (scaleControlValue > 25) {
    scaleControlValue -= 25;
    setScaleEffect();
  }
};

scaleControlBigger.onclick = () => {
  if (scaleControlValue < 100) {
    scaleControlValue += 25;
    setScaleEffect();
  }
};

function setScaleEffect() {
  scaleControlElement.value = `${scaleControlValue}%`;
  effectsPreview.style.transform = `scale(${scaleControlValue / 100})`;
}

function resetScaleControlValue() {
  scaleControlValue = 100;
}

noUiSlider.create(effectSlider, effects.none[0]);
effectSliderContainer.style.display = 'none';

function setFilterEffects() {
  for (const currentEffect of effectButtons) {
    if (currentEffect.checked) {
      effectSliderContainer.style = '';
      effectSlider.noUiSlider.updateOptions(effects[currentEffect.value][0]);
      effectSlider.noUiSlider.on('update', () => {
        effectsPreview.style.filter = `${effects[currentEffect.value][1]}(${effectSlider.noUiSlider.get()})`;
        effectValue.value = currentEffect.value === 'none' ? '' : parseFloat(effectSlider.noUiSlider.get());
      });
      if (currentEffect.value === 'none') {
        effectSliderContainer.style.display = 'none';
        effectsPreview.style.filter = '';
      }
    }
  }
}

effectsList.onchange = () => setFilterEffects();

export {resetScaleControlValue, setScaleEffect, setFilterEffects};
