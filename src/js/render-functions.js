import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const topLoader = document.querySelector('.loader:not(.loader-bottom)');
const bottomLoader = document.querySelector('.loader.loader-bottom');
const loadMoreBtn = document.querySelector('.load-more');

let lightbox = new SimpleLightbox('.gallery a');

export function createGallery(images) {
  const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
    <li class="gallery-item">
      <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" />
      </a>
      <div class="info">
        <p><b>Likes</b> ${likes}</p>
        <p><b>Views</b> ${views}</p>
        <p><b>Comments</b> ${comments}</p>
        <p><b>Downloads</b> ${downloads}</p>
      </div>
    </li>
  `).join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
}

export function showTopLoader() {
  topLoader.classList.remove('is-hidden');
}

export function hideTopLoader() {
  topLoader.classList.add('is-hidden');
}

export function showBottomLoader() {
  bottomLoader.classList.remove('is-hidden');
}

export function hideBottomLoader() {
  bottomLoader.classList.add('is-hidden');
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('is-hidden');
}