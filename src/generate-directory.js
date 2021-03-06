let input = `А Авиаконструктор Агроинженер Агроном Администратор баз данных Арматурщик Архитектор Б Бетонщик Биолог В Воспитатель детей дошкольного возраста Воспитатель детей дошкольного возраста с отклонениями в развитии и с сохраненным развитием Врач Г Геодезист Графический дизайнер Д Делопроизводитель И Инженер по автоматизации и механизации производственных процессов Инженер по автоматизации технологических процессов Инженер по землеустройству Инженер по качеству Инженер по охране труда Инженер по пожарной безопасности Инженер по транспорту Инженер связи Инженер-конструктор Инженер-материаловед Инженер-программист Инженер-строитель Инженер-электроник К Каменщик Косметолог Л Лаборант химического анализа М Маляр Мастер декоративных работ Мастер столярно-плотницких работ Машинист зерновых погрузочно-разгрузочных машин Медицинская сестра Менеджер Менеджер по персоналу Менеджер по туризму Металлург Метролог Мехатроник Мобильный робототехник Н Наладчик-ремонтник промышленного оборудования Наноинженер О Обвальщик тушек птицы Облицовщик-плиточник Обработчик рыбы Оператор беспилотных летательных аппаратов Оператор птицефабрик и механизированных ферм Оператор свиноводческих комплексов и механизированных ферм Оператор станков с программным управлением Официант, бармен П Парикмахер Переводчик Повар-кондитер Портной Программист Продавец Психолог Р Разработчик web и мультимедийных приложений С Санитар ветеринарный Сантехник Сборщик электронных систем (специалист по электронным приборам и устройствам) Сварщик Сетевой и системный администратор Слесарь Слесарь по КИПиА Слесарь по ремонту автомобилей Слесарь по ремонту газового оборудования Слесарь-сборщик летательных аппаратов Слесарь-трубопроводчик Социальный работник Специалист в области контрольно-измерительных приборов и автоматики (по отраслям) Специалист по аддитивным технологиям Специалист по гостеприимству Специалист по обслуживанию телекоммуникаций Специалист по производству и обслуживанию авиатехники Специалист по связям с общественностью Специалист по социальной работе Специалист по термической обработке металлов Специалист по техническому контролю качества продукции Специалист по технологии машиностроения Специалист по холодильно-вентиляционной технике Судокорпусник-ремонтник Т Техник авиационных двигателей Техник по автоматизированным системам управления технологическими процессами Техник по биотехническим и медицинским аппаратам и системам Техник по защите информации Техник по композитным материалам Техник по обслуживанию роботизированного производства Техник по организации перевозок и управления на транспорте Техник по технической эксплуатации гидравлических машин, гидроприводов и гидропневмоавтоматики Техник-конструктор Техник-механик в сельском хозяйстве Техник-полиграфист Технолог-конструктор швейных изделий Технолог легкой промышленности Товаровед Токарь-универсал У Учитель Учитель начальных классов Учитель начальных классов, компенсирующего и коррекционно-развивающего образования Ф Фельдшер Фрезеровщик Ш Штукатур Э Экономист Электромонтажник Электромонтер по ремонту и обслуживанию электрооборудования Энергетик Ю Юрист`

const isCapital = char => {
  if (Number.isInteger(char)) return true;
  
  if (char == ')' || char == '(') return false;
  
  if (char === char.toUpperCase()) {
    return true;
  } else {
    return false;
  }
}

let i = -1;
input = input.split(' ').reduce((arr, cur) => {
  if ( isCapital(cur[0]) ) {
    arr[++i] = cur;
  } else {
    arr[i] = arr[i] + ' ' + cur;
  }
  return arr;
}, [])

const isCapitalLetter = char => char.length === 1 && isCapital(char);

let currentLetter = '';
input = input.reduce((tree, token) => {
  if (isCapitalLetter(token)) {
    currentLetter = token;
    tree[currentLetter] = [];
  } else {
    tree[currentLetter].push(token);
  }
  return tree;
}, {})

const makelia = token => {
  return `  <li class="directory__item">
    <a href="#" class="link">${token}</a>
  </li>
`;
}

const makelih3 = token => {
  return `<li class="directory__item">
    <h3 class="directory__heading">${token}</h3>
  </li>`;
}

const makeGroup = letter => {
  let start = `
<ul class="directory__group">
  ${makelih3(letter)}
`;
  
  let middle = '';
  input[letter].forEach(token => {
    middle += makelia(token);
  })
  
  let end = `</ul>
`;
  
  return start + middle + end;
}

let html = '';

const keys = Object.keys(input);
for (key of keys) {
  html += makeGroup(key);
}

console.log(html);

document.write(html);