<script lang="ts">
    import type { PageData } from './$types';
    import { CodeBlock } from 'svhighlight';
    
    export let data: PageData;

    // create random datpoints with x and y values
    // x in range [0, 300], y in range [0, 100]
    let dataPoints = Array.from({length: 10}, () => {
        return {
            x: Math.random() * 300,
            y: Math.random() * 100
        }
    })

    const rescale = function(x, domain_min, domain_max, range_min, range_max) {
      return ((range_max - range_min)*(x-domain_min))/(domain_max-domain_min) + range_min
    }


    let code = `
// JS code
let dataPoints = Array.from({length: 10}, () => {
    return {
        x: Math.random() * 300,
        y: Math.random() * 100}
    })

// Svelte code
<svg width="300" height="160">
    {#each dataPoints as dataPoint}
        <circle cx={dataPoint.x} cy={dataPoint.y} r="7"
        fill="#25A0A9" fill-opacity="0.7"/>
    {/each}
</svg>
`

    let codefoo = `// JS code on +page.server.ts
import type { PageServerLoad } from './$types';
export const load:PageServerLoad = (async () => {
    // fetch data from https://vda-lab.gitlab.io/datavis-technologies/assets/flights_part.json
    // and return it

    const response = await fetch('https://vda-lab.gitlab.io/datavis-technologies/assets/flights_part.json');
    // convert the response to json
    const data = await response.json();
    return {flights: data};
});

// Svelte code
<svg width="800" height="400">
    {#each data.flights as datapoint}
        <circle cx={rescale(datapoint.from_long, -180, 180, 0, 800)}
                cy={rescale(datapoint.from_lat, -90, 90, 400, 0)}
                r=3 />
    {/each}
</svg>`
</script>


<h1> Ch2 - Data visualisation with Svelte</h1>

<p>
    When we use Svelte to create data visualisation, we can
    use Javascript to manipulate the data and use Svelte to
    render the data.
</p>

<svg width="300" height="160">
    {#each dataPoints as dataPoint}
        <circle cx={dataPoint.x} cy={dataPoint.y} r="7"
        fill="#25A0A9" fill-opacity="0.8"/>
    {/each}
</svg>

<p>
    Here is the code:
</p>


<CodeBlock {code} language="javascript"
codeTextClasses="text-black" background="bg-gray-0"
showHeader={false} showLineNumbers={false}
/>

<p>
    The code above is a simple example of how to use Svelte to
    render data. As you can see, we save lots of time by using
    the Svelte syntax to render the data with each loop.
</p>


<svg width="800" height="400">
    {#each data.flights as datapoint}
        <circle cx={rescale(datapoint.from_long, -180, 180, 0, 800)}
                cy={rescale(datapoint.from_lat, -90, 90, 400, 0)}
                r=3 />
    {/each}
</svg>

<p>
Use the same technique, we can render the data on a map.
</p>


<style>
    svg {
        border: 1px;
        border-style: solid;
    }
    circle {
        fill: steelblue;
        fill-opacity: 0.5;
    }
</style>


