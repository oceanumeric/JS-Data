import type { PageServerLoad } from './$types';
import Papa from 'papaparse';
export const prerender = true;

export const load:PageServerLoad = (async () => {

    const res = await fetch('http://vda-lab.github.io/assets/flights.csv', {
      headers: {
        'Content-Type': 'text/csv'
    }})
    let csv_data = await res.text()
    let csv_parsed = Papa.parse(csv_data, {header: true})

    return {flights: csv_parsed.data};
});