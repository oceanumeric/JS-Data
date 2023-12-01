<script lang="ts">
    import type { PageData } from './$types';
    import { default as vegaEmbed } from "vega-embed";

    export let data: PageData;

    let width=600
    let height=400
    let fieldX = "Miles_per_Gallon";
    let fieldY = "Displacement"
    let properties = ["Miles_per_Gallon","Cylinders","Displacement","Horsepower","Weight_in_lbs","Acceleration"]

    let spec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "description": "A scatterplot of two properties for various cars.",
        "mark": "point",
        "encoding": {
            "x": {"type": "quantitative"},
            "y": {"type": "quantitative"}
        }
    }
    // use $ to make it reactive
    $: {
        spec.width = width
        spec.height = height
        spec.encoding.x.field = fieldX
        spec.encoding.y.field = fieldY
        spec.data = {values: data.cars}
    }
    $: {
        if ( typeof document !== 'undefined' ) { vegaEmbed('#vis', spec) }
    }
</script>

<h1>Data Visualization with Vega-Lite</h1>

<p>
    Vega-Lite is a high-level grammar of interactive graphics. 
    It provides a concise JSON syntax for supporting rapid generation 
    of visualizations to support analysis. Vega-Lite specifications can be 
    compiled to Vega specifications.
    <br>
    <br>
    First, you need to install vega-embed: <i>npm i vega-embed</i>
</p>

<br>
<br>

<label>
    <u>Property X:</u>
    <select bind:value={fieldX}>
        {#each properties as property}
            <option value={property}>{property}</option>
        {/each}
    </select>
</label>

<label>
    <u>Property Y:</u>
    <select bind:value={fieldY}>
        {#each properties as property}
            <option value={property}>{property}</option>
        {/each}
    </select>
</label>

<br>

<div id="vis"></div>


<p>
    Here is the code:
</p>

<pre>
    <code class="language-javascript">
        {`
import { default as vegaEmbed } from "vega-embed";

let width=600
let height=400
let fieldX = "Miles_per_Gallon";
let fieldY = "Displacement"
let properties = ["Miles_per_Gallon","Cylinders","Displacement",
                    "Horsepower","Weight_in_lbs","Acceleration"]

let spec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "description": "A scatterplot of two properties for various cars.",
    "mark": "point",
    "encoding": {
        "x": {"type": "quantitative"},
        "y": {"type": "quantitative"}
    }
}
// use $ to make it reactive
$: {
    spec.width = width
    spec.height = height
    spec.encoding.x.field = fieldX
    spec.encoding.y.field = fieldY
    spec.data = {values: data.cars}
}
$: {
    if ( typeof document !== 'undefined' ) { vegaEmbed('#vis', spec) }
}

// html 
<label>
    <u>Property X:</u>
    <select bind:value={fieldX}>
        {#each properties as property}
            <option value={property}>{property}</option>
        {/each}
    </select>
</label>

<label>
    <u>Property Y:</u>
    <select bind:value={fieldY}>
        {#each properties as property}
            <option value={property}>{property}</option>
        {/each}
    </select>
</label>

<br>

<div id="vis"></div>
        `}
    </code>
</pre>


<style>
    label {
        display: block;
        margin-bottom: 3px;
    }
    select {
        padding: 2px;
        border-radius: 5px;
        border: 1px solid #ccc;
    }
</style>

