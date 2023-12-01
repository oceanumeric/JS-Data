import type { PageServerLoad } from './$types';
// pre-render this page on the server
export const prerender = true;

export const load:PageServerLoad = (async () => {
    // fetch data from 'https://unpkg.com/vega-datasets@1.25.0/data/cars.json'
    const response = await fetch('https://vega.github.io/vega-datasets/data/cars.json');
    const data = await response.json();
    return {cars: data};
});