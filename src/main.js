import './css/styles.css';
import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showTopLoader,
  hideTopLoader,
  showBottomLoader,
  hideBottomLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = form.querySelector('input[name="search-text"]');
const loadMoreBtn = document.querySelector('.load-more');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

form.addEventListener('submit', async e => {
  e.preventDefault();

  const query = input.value.trim();
  if (!query) {
    iziToast.warning({ message: 'Please enter a search term!' });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  clearGallery();
  hideLoadMoreButton();

  showTopLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.info({ message: 'No images found. Try a different search.' });
      hideTopLoader();
      return;
    }

    createGallery(data.hits);

    if (totalHits > currentPage * 15) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({ message: 'Error fetching images.' });
  } finally {
    hideTopLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage++;

  showBottomLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    createGallery(data.hits);

    if (currentPage * 15 >= totalHits) {
      iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
      hideLoadMoreButton();
    } else {
      showLoadMoreButton();
    }

    const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    iziToast.error({ message: 'Error loading more images.' });
  } finally {
    hideBottomLoader();
  }
});