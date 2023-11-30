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
        fill="#25A0A9" fill-opacity="0.7"/>
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

