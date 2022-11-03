import '../css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import countryCard from '../templates/country.hbs';
import countryListItem from '../templates/countryListItem.hbs';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const searchBoxEL = document.querySelector('#search-box');

class CountryCreator {
  constructor({ name, capital, population, languages, flags } = {}) {
    this.name = name.common;
    this.capital = capital;
    this.population = (population / 1000000).toFixed(1);
    this.languages = Object.values(languages).join(', ');
    this.flags = flags.svg;
  }
}

const clearField = () => {
  document.querySelector('.country-info').innerHTML = '';
  document.querySelector('.country-list').innerHTML = '';
};

const fetchingFunc = e => {
  const { target } = e;

  if (!target.value) {
    return clearField();
  }

  fetchCountries(target.value)
    .then(result => {
      if (result.length > 1) {
        clearField();

        document
          .querySelector('.country-list')
          .insertAdjacentHTML('beforeend', countryListItem(result));

        if (result.length > 10) {
          clearField();

          Notiflix.Notify.warning(
            'Too many maches found. Please enter a more specific name.'
          );
        }
        return;
      }

      if (result.length === 1) {
        clearField();

        const country = result[0];

        const newCountry = new CountryCreator(country);

        document.querySelector('.country-info').innerHTML =
          countryCard(newCountry);

        return;
      }
    })
    .catch(error => {
      console.log(error);

      Notiflix.Notify.failure('Oops, there is no country with that name');

      clearField();
    });
};

searchBoxEL.addEventListener('input', debounce(fetchingFunc, DEBOUNCE_DELAY));
