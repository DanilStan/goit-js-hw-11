import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';

export default class NewsApiService {
  constructor() {
    this.searchQuary = '';
    this.amountPage = 40;
    this.page = 1;
  }

  async fetchArticle() {
    try {
      const getApi = await axios.get(
        `https://pixabay.com/api/?key=30076957-02fd10983d1c24526e550cc01&q=${this.searchQuary}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
      );
      const data = await getApi.data;

      this.incrementPage();
      this.incrementAmountPage();

      return data;
    } catch (error) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
  }

  get quary() {
    this.searchQuary;
  }

  set quary(newQuary) {
    this.searchQuary = newQuary;
  }

  incrementAmountPage() {
    this.amountPage += 1;
  }

  resetAmountPage() {
    this.amountPage = 1;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
