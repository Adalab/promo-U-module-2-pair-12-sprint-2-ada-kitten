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

//Objetos con cada gatito
const kittenData_1 = {
  image: 'https://dev.adalab.es/gato-siames.webp',
  name: 'Anastacio',
  desc: 'Porte elegante, su patrón de color tan característico y sus ojos de un azul intenso, pero su historia se remonta a Asía al menos hace 500 años, donde tuvo su origen muy posiblemente.',
  race: 'Siamés',
};
const kittenData_2 = {
  image: 'https://dev.adalab.es/sphynx-gato.webp',
  name: 'Fiona',
  desc: 'Produce fascinación y curiosidad. Exótico, raro, bello, extraño… hasta con pinta de alienígena han llegado a definir a esta raza gatuna que se caracteriza por la «ausencia» de pelo.',
  race: 'Sphynx',
};
const kittenData_3 = {
  image: 'https://dev.adalab.es/maine-coon-cat.webp',
  name: 'Sofia',
  desc: ' Tienen la cabeza cuadrada y los ojos simétricos, por lo que su bella mirada se ha convertido en una de sus señas de identidad. Sus ojos son grandes y las orejas resultan largas y en punta.',
  race: 'Maine Coon',
};

const kittenDataList = [kittenData_1, kittenData_2, kittenData_3];

//Funciones
function renderKitten(kittenData) {
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
        src=${kittenData.image}
        alt="gatito"
      />
      <h3 class="card_title">${kittenData.name}</h3>
      <h3 class="card_race">${html}</h3>
      <p class="card_description">
      ${kittenData.desc}
      </p>
    </article>
    </li>`;
  return kitten;
}

function renderKittenList(kittenDataList) {
  listElement.innerHTML = '';
  for (const kittenItem of kittenDataList) {
    listElement.innerHTML += renderKitten(kittenItem);
  }
}

//SOLUCIÓN CHATGPT: SI FUNCIONA

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

/*SOLUCION YANELIS--- 
funciona la raza pero no la descripción

https://github.com/Adalab/pw-adakitten/blob/main/02-solucion-sprint-2/js/exercise-per-day-to-review/main-1-12-metodos-funcionales.js


function filterKitten(event) {
  event.preventDefault();

  const descrSearchText = input_search_desc.value;
  const raceSearchText = input_search_race.value;

  listElement.innerHTML = '';

  const dataKittenFiltered = kittenDataList
    .filter((kitten) => kitten.desc.includes(descrSearchText))
    .filter((kitten) => kitten.race === raceSearchText);

  renderKittenList(dataKittenFiltered);
}
*/

/* SOLUCIÓN PAIR 22/09

  function filterKitten(event) {
  event.preventDefault();

  const descrSearchText = input_search_desc.value;
  const raceSearchText = input_search_race.value;

  listElement.innerHTML = '';
  const kittenListFiltered = kittenDataList
    .filter((pepino) => {
      if (pepino.desc.includes(descrSearchText)) {
        listElement.innerHTML += renderKitten(pepino);
      }
    })
    .filter((pepino) => {
      if (pepino.race.includes(raceSearchText)) {
        listElement.innerHTML += renderKitten(pepino);
      }
    });

    renderKittenList(kittenListFiltered); Si se deja comentado, deja filtrar por descripción. La de raza no funciona. Si se descomenta, no funciona nada y al buscar por desc desaparecen los gatitos :'(
   */

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
