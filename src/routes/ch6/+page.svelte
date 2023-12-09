<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;

    import createREGL from "regl";
    import { onMount } from "svelte";

    const width = 600;
    const height = 400;

    let canvas: HTMLCanvasElement;
    let foodiv: HTMLDivElement;
    let drawShape: any;
    let regl: any;

    onMount(() => { 
        regl = createREGL(canvas);
        // This command creates a draw call
        regl.frame(function () {
            // Instead of magenta, we oscillate the color
            regl.clear({
                color: [0, 0.5 * (1.0 + Math.cos(Date.now() * 0.01)), 1, 1]
            })
        })

        var regl2 = createREGL(foodiv);

        var drawTriangle = regl2({
            vert: `
            precision mediump float;
            attribute vec2 position;
            varying vec3 fcolor;
            void main () {
                fcolor = abs(vec3(position.x, 0, position.y));
                gl_Position = vec4(position, 0, 1);
            }
            `,

            frag: `
            precision mediump float;
            varying vec3 fcolor;
            void main () {
                gl_FragColor = vec4(fcolor, 1);
            }
            `,

            attributes: {
                position: [
                [1, 0],
                [0, 1],
                [-1, -1]
                ]
            },

            count: 3
            });

        regl2.frame(function () {
            regl2.clear({
            color: [0, 0, 0, 1],
            depth: 1
        })
            drawTriangle();
        })

    });
</script>


<h1>Introduction to regl</h1>


<canvas bind:this={canvas} {width} {height} />

<div bind:this = {foodiv}>
hello another div
</div>