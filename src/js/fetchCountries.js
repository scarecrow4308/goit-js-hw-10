const URL_LINK = 'https://restcountries.com/v3.1/';

export const fetchCountries = name => {
  return fetch(`${URL_LINK}translation/${name}`).then(response => {
    if (!response.ok) {
      throw Error(response.status);
    }

    return response.json();
  });
};
