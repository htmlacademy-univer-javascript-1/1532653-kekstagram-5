let getRandomInteger = (a, b) => {
  let lower = Math.ceil(Math.min(a, b));
  let upper = Math.floor(Math.max(a, b));
  let result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

let getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

let descriptions = [
  'Тихий закат, окрашивающий небо в нежные оттенки розового и оранжевого, отражается в спокойной поверхности озера. Природа дарит моменты умиротворения.',
  'Глубокий взгляд, наполненный эмоциями. Эта фотография запечатлела мгновение искренности и теплоты, где каждая деталь рассказывает свою историю.',
  'Суматошный ритм мегаполиса, где яркие огни и шумные улицы создают уникальную атмосферу жизни. Каждый уголок скрывает свои тайны и приключения.',
  'Мгновение счастья, запечатленное на фото: смех и радость, когда вся семья собралась вместе. Эти моменты создают незабываемые воспоминания.',
  'Величественные горы, покрытые зеленью, и прозрачный водопад, шумящий на фоне тишины леса. Природа всегда вдохновляет на новые открытия.'
];

let likes = getRandomInteger(15, 200);

let messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

let names = [
  'Анна',
  'Дмитрий',
  'Екатерина',
  'Алексей',
  'Мария',
  'Сергей'
];

let comments = Array.from({length: getRandomInteger(0, 30)}, function(value, index) {
  return {
    id: index,
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: getRandomArrayElement(messages),
    name: getRandomArrayElement(names)
  }
});

let createdData = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(descriptions),
  likes: getRandomInteger(15, 200),
  comments: comments,

});

let generatedData = Array.from({length:25}, function(value, id) {
  return createdData(id + 1)
});

console.log(generatedData);
