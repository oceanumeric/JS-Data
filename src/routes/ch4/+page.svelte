<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;

    import createScatterplot from "regl-scatterplot";
    import { scaleLinear } from "d3-scale";
    import { extent } from "d3-array";
    import { onMount } from "svelte";

    const width = 800;
    const height = 400;

    $: xScale = scaleLinear().domain([-180, 180]).range([-2, 2]);
    $: yScale = scaleLinear().domain([-90, 90]).range([-1, 1]);
    $: rScale = scaleLinear()
        .domain(
            extent(
                data.flights.map((d) => {
                    return +d.distance;
                })
            )
        )
        .range([0, 1]);

    $: points = data.flights.map((d) => [
        xScale(d.from_long),
        yScale(d.from_lat),
        d.from_country == d.to_country ? 0 : 1,
        rScale(+d.distance),
    ]);
    let full_points = {}
    $: data.flights.forEach((d,i) => {
        full_points[i] = d
    })
    // $: console.log(points.map((d) => { return d[3]}))

    const dataFlow = ({ points: index }) => {
        canvas.value = index; // Array.from(index, (i) => points[i]);
        canvas.dispatchEvent(new Event("input"));
    }

    let canvas;
    let scatterplot = undefined;
    let selectedPointIDs = []
    let selectedPointID = undefined
    onMount(() => {
        scatterplot = createScatterplot({
            canvas,
            width,
            height,
            // opacityBy: 'density',
            opacity: 0.4,
            colorBy: "value1",
            pointColor: ["#4682B4", "#ff0000"],
            sizeBy: "value2",
            pointSize: points.map((d) => {
                return d[3] * 10;
            }),
            // cameraDistance: 1,
            // cameraRotation: Math.PI/4,
            // showReticle: true,
            // reticleColor: "rgba(1,0,0,1)",
            pointOutlineWidth: 2,
            xScale: scaleLinear().domain([-180, 180]).range([-2, 2]),
        });

        // console.log(points)
        scatterplot.draw(points);

        // dataFlow({ points: [] });
        scatterplot.subscribe("select", (d) => { selectedPointIDs = d });
    });
    // $: console.log(selectedPointIDs.points)
    $: { if ( selectedPointIDs.points ) { 
        selectedPointIDs.points.forEach((d) => { console.log(full_points[d])})}}
</script>


<h1>Data Visualization with regl-scatterplot</h1>

<canvas bind:this={canvas} {width} {height} />

{#if selectedPointIDs.points}
<ul>
{#each selectedPointIDs.points as point_id}
<li>{JSON.stringify(full_points[point_id].from_airport)}</li>
{/each}
</ul>
{/if}


<style>
    canvas {
        width: 100%;
        height: 100%;
        background-color: #000;
        border: 1px solid;
    }
</style>