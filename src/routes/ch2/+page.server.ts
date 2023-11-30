import type { PageServerLoad } from './$types';
export const prerender = true;

export const load:PageServerLoad = (async () => {
    // fetch data from https://vda-lab.gitlab.io/datavis-technologies/assets/flights_part.json
    // and return it

    const response = await fetch('https://vda-lab.gitlab.io/datavis-technologies/assets/flights_part.json');
    // convert the response to json
    const data = await response.json();
    return {flights: data};
});