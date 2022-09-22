import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import photoCardTpl from './templace/templace.hbs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/secondary-style.css';
import './css/styles.css';

import { form } from './js/refs';
import { input } from './js/refs';
import { button } from './js/refs';
import { gallery } from './js/refs';
import NewsApiService from './js/news-service';

const newsApiService = new NewsApiService();
hiddenButton();

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionDelay: 250,
});

let amountPageSum = 0;

form.addEventListener('submit', onSubmitForm);
button.addEventListener('click', onBtnClick);

function onSubmitForm(event) {
  event.preventDefault();
  newsApiService.quary = input.value.trim();
  if (newsApiService.quary === '') {
    return;
  }
  newsApiService.resetPage();
  form.reset();
  createMarkup();
  showButton();
  clearMarkup();
}

async function createMarkup() {
  const data = await newsApiService.fetchArticle();

  errorFunc(data.hits.length, amountPageSum, data.totalHits);

  createMarkupFunc(data.hits);
}

function errorFunc(hitsLength, amountPageValue, totalHits) {
  if (hitsLength === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    hiddenButton();
  } else if (amountPageValue > totalHits) {
    Notify.warning(
      'We are sorry, but you have reached the end of search results.'
    );
    hiddenButton();
  } else {
    return;
  }
}

function createMarkupFunc(hits) {
  const getMarkup = hits => {
    return hits.map(value => photoCardTpl(value)).join('');
  };

  gallery.insertAdjacentHTML('beforeend', getMarkup(hits));

  lightbox.refresh();
}

function onBtnClick() {
  createMarkup();
  showButton();
}

function hiddenButton() {
  button.style.display = 'none';
}

function showButton() {
  button.style.display = '';
}

function clearMarkup() {
  gallery.innerHTML = '';
}
