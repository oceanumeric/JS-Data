<script lang="ts">
    import { onMount } from 'svelte'
    import type { PageData } from './$types';
    import { tweened } from 'svelte/motion'
    import { cubicInOut } from 'svelte/easing'
    import { interpolate } from 'd3-interpolate'

    export let data: PageData;

    // initial value
    const circle = tweened({ cx: -300, fill: '#D34052' }, {
		duration: 2000,
        easing: cubicInOut,
        interpolate,
	})


    // update value on mount
    onMount(async () => {
        async function animateCircle() {
        // Update to the new state (move to the right and change fill color)
        await circle.update(prev => ({ ...prev, cx: 300, fill: '#e13238' }));
        // Wait for a short duration (you can adjust this as needed)
        await new Promise(resolve => setTimeout(resolve, 500));
        // Update back to the original state (move to the left)
        await circle.update(prev => ({ ...prev, cx: -300 }));
        // Call the function recursively to create a loop
        animateCircle();
    }

    // Start the animation loop
    animateCircle();
})
</script>


<h1>SVG Animation</h1>

<p>
    The viewBox attribute defines the position and dimension, in user space, of an SVG viewport.
    The value of the viewBox attribute is a list of four numbers: min-x, min-y, width and height. 
    The numbers min-x and min-y represent the top left coordinates of the viewport. 
    The numbers width and height represent its dimensions. 
</p>


<svg width="100%" height="100%" viewBox="-300 -300 800 600">
	<circle cx={$circle.cx} cy={0} r={40} fill={$circle.fill} />
</svg>


<style>
    svg {
        border: 1px solid black;
    }
</style>

