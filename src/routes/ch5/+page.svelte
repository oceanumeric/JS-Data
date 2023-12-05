<script lang="ts">
    import * as createREGL from 'regl';
    import { onMount } from "svelte";
    import type { PageData } from './$types';

    export let data: PageData;

    const width = 800;
    const height = 400;

    let canvas: HTMLCanvasElement;
    let drawTriangle: any;
    let regl: any;



    onMount(() => {
        regl = createREGL({
            canvas: canvas
        });

        drawTriangle = regl({
            // fragment shader
            frag: `
            precision mediump float;
            uniform vec4 color;
            void main () {
                gl_FragColor = color;
            }`,

            // vertex shader
            vert: `
            precision mediump float;
            attribute vec2 position;
            void main () {
                gl_Position = vec4(position, 0, 1);
            }`,

            // attributes
            attributes: {
                position: [[-1, 0], [0, -1], [1, 1]]
            },

            // uniforms
            uniforms: {
                color: [1, 0, 0, 1]
            },

            // vertex count
            count: 3
            });
        
        drawTriangle();
    });

   

</script>

<h1>Data Visualization with regl</h1>


<canvas bind:this={canvas} {width} {height} />

