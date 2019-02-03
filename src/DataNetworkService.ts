export let DataNetworkService = {
  controller: new AbortController(),
  fetchJoke,
};

function fetchJoke() {
  DataNetworkService.controller = new AbortController();
  const signal = DataNetworkService.controller.signal;
  return fetch('https://api.icndb.com/jokes/random', { signal }).then((response) => {
    return response.json();
  }).then(({ value: { joke }}) => joke as string);
}
