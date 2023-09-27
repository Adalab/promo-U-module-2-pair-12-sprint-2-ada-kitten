'use strict';

/* Elementos que usamos en el HTML */
const newFormElement = document.querySelector('.js-new-form');
const listElement = document.querySelector('.js-list');
const searchButton = document.querySelector('.js-button-search');
const buttonAdd = document.querySelector('.js-btn-add');
const buttonCancelForm = document.querySelector('.js-btn-cancel');
const inputDesc = document.querySelector('.js-input-desc');
const inputPhoto = document.querySelector('.js-input-photo');
const inputName = document.querySelector('.js-input-name');
const inputRace = document.querySelector('.js-input-race');

const linkNewFormElememt = document.querySelector('.js-button-new-form');
const labelMessageError = document.querySelector('.js-label-error');
const input_search_desc = document.querySelector('.js_in_search_desc');

const input_search_race = document.querySelector('.js_in_search_race');

const GITHUB_USER = 'ysabelvalencia';
const SERVER_URL = `https://dev.adalab.es/api/kittens/${GITHUB_USER}`;

let kittenDataList = [];

function getDataApi() {
  const kittenListStored = JSON.parse(localStorage.getItem('kittenList'));

  if (kittenListStored !== null) {
    kittenDataList = kittenListStored;
    renderKittenList(kittenDataList);
  } else {
    fetch(SERVER_URL)
      .then((response) => response.json())
      .then((data) => {
        kittenDataList = data.results;
        renderKittenList(kittenDataList);
        localStorage.setItem('kittenList', JSON.stringify(kittenDataList));
        //se puede crear aqui el localStorage o bien en la función que pinta a los gatitos.
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
getDataApi();

///////////////////

function renderKitten(kittenData) {
  // let html = '';
  // if (kittenData.race === '') {
  //   html = `Uy que despiste, no sabemos su raza`;
  // } else {
  //   html = kittenData.race;
  // }

  const kitten = `<li class="card">
    <article>
      <img
        class="card_img"
        src=${kittenData.image}
        alt="gatito"
      />
      <h3 class="card_title">${kittenData.name}</h3>
      <h3 class="card_race">${kittenData.race}</h3>
      <p class="card_description">
      ${kittenData.desc}
      </p>
    </article>
    </li>`;

  const liElement = document.createElement('li');
  listElement.setAttribute('class', 'card');

  const articleElement = document.createElement('article');
  liElement.appendChild(articleElement);

  const imgElement = document.createElement('img');
  articleElement.appendChild(imgElement);
  imgElement.setAttribute('class', 'card_img');
  imgElement.setAttribute('src', 'kittenData.url');
  imgElement.setAttribute('alt', 'gatito');

  const h3nElement = document.createElement('h3');
  const textH3n = document.createTextNode(kittenData.name);
  h3nElement.appendChild(textH3n);
  articleElement.appendChild(h3nElement);
  h3nElement.setAttribute('class', 'card_title');

  const h3rElement = document.createElement('h3');
  const textH3r = document.createTextNode(html);
  h3rElement.appendChild(textH3r);
  articleElement.appendChild(h3rElement);
  h3rElement.setAttribute('class', 'card_race');

  const pElement = document.createElement('p');
  articleElement.appendChild(pElement);
  pElement.textContent = kittenData.desc;

  return liElement;
}

function renderKittenList(kittenDataList) {
  listElement.innerHTML = '';
  for (const kittenItem of kittenDataList) {
    const newLiItem = renderKitten(kittenItem);
    listElement.appendChild(newLiItem);
  }
}

//img

//Funciones
/*function renderKitten(kittenData) {
  let html = '';
  if (kittenData.race === '') {
    html = `Uy que despiste, no sabemos su raza`;
  } else {
    html = kittenData.race;
  }
  const kitten = `<li class="card">
    <article>
      <img
        class="card_img"
        src=${}
        alt="gatito"
      />
      <h3 class="card_title">${}</h3>
      <h3 class="card_race">${html}</h3>
      <p class="card_description">
      ${}
      </p>
    </article>
    </li>`;
  return kitten;
}*/

function filterKitten(event) {
  event.preventDefault();

  const descrSearchText = input_search_desc.value.toLowerCase(); // Convertir a minúsculas para comparación
  const raceSearchText = input_search_race.value;

  listElement.innerHTML = '';

  const dataKittenFiltered = kittenDataList.filter((kitten) => {
    const description = kitten.desc.toLowerCase(); // Convertir a minúsculas para comparación
    return (
      description.includes(descrSearchText) &&
      (raceSearchText === '' || kitten.race === raceSearchText)
    );
  });

  renderKittenList(dataKittenFiltered);
}

//Mostrar/ocultar el formulario
function showNewCatForm() {
  newFormElement.classList.remove('collapsed');
}
function hideNewCatForm() {
  newFormElement.classList.add('collapsed');
}

function handleClickNewCatForm(event) {
  event.preventDefault();
  if (newFormElement.classList.contains('collapsed')) {
    showNewCatForm();
  } else {
    hideNewCatForm();
  }
}

function addNewKitten(event) {
  event.preventDefault();
  const newKittenDataObject = {
    image: inputPhoto.value,
    desc: inputDesc.value,
    name: inputName.value,
    race: inputRace.value,
  };
  if (
    newKittenDataObject.desc === '' ||
    newKittenDataObject.image === '' ||
    newKittenDataObject.name === ''
  ) {
    labelMessageError.innerHTML = '¡Uy! parece que has olvidado algo';
  } else if (
    newKittenDataObject.desc !== '' &&
    newKittenDataObject.image !== '' &&
    newKittenDataObject.name !== ''
  ) {
    labelMessageError.innerHTML = 'Mola! Un nuevo gatito en Adalab!';
  }
  kittenDataList.push(newKittenDataObject);
  renderKittenList(kittenDataList);
}

//Cancelar la búsqueda de un gatito
function cancelNewKitten(event) {
  event.preventDefault();
  newFormElement.classList.add('collapsed');
  inputDesc.value = '';
  inputPhoto.value = '';
  inputName.value = '';
}

//Mostrar el litado de gatitos en el HTML
renderKittenList(kittenDataList);

//Eventos
linkNewFormElememt.addEventListener('click', handleClickNewCatForm);
searchButton.addEventListener('click', filterKitten);
buttonAdd.addEventListener('click', addNewKitten);
buttonCancelForm.addEventListener('click', cancelNewKitten);
