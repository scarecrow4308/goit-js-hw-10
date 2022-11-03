const URL_LINK = 'https://restcountries.com/v3.1/name/';

export const fetchCountries = name => {
  return fetch(`${URL_LINK}${name.trim()}`).then(response => {
    if (!response.ok) {
      throw Error(response.status);
    }

    return response.json();
  });
};
