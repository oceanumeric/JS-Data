<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;

    import createREGL from "regl";
    import { onMount } from "svelte";

    const width = 600;
    const height = 400;

    let canvas: HTMLCanvasElement;
    let foodiv: HTMLDivElement;
    let dotsdiv: HTMLDivElement;
    let sstdiv: HTMLDivElement;
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

        // reg3 for dots
        var regl3 = createREGL(dotsdiv);

        const drawDots = regl3({
            frag: `
            precision mediump float;
            uniform vec4 color;
            void main () {
                gl_FragColor = color;
            }`,
            vert: `
            precision mediump float;
            attribute vec2 position;
            uniform float pointWidth;

            void main () {
                gl_PointSize = pointWidth;
                gl_Position = vec4(position, 0, 1);
            }`,
            attributes: {
                position: function(context, props) {
                    return [
                        [-1 * Math.cos(context.tick / 100), 0.2],
                        [Math.sin(context.tick / 100), -0.8],
                        [Math.sin(context.tick / 100), 0.8]
                    ];
                }
            },

            uniforms: {
                color: function(context, props) {
                    return props.color;
                },
                pointWidth: regl3.prop('pointWidth')
            },
            
            count: 3,

            primitive: 'points'
        })

        regl3.frame(function(contenxt) {
            drawDots({
                color: [0.208, 0.304, 1.0, 1.0],
                pointWidth: 100
            })
        })

        // reg4 for spinning stretched triangle
        var regl4 = createREGL(sstdiv);

        const drawSpinningStretchedTriangle = regl4({
            frag: `
            precision mediump float;
            void main() {
                gl_FragColor = vec4(0, 1, 0, 1);
            }`,

            vert: `
            attribute vec2 position;
            uniform float angle, scale, width, height;
            void main() {
                float aspect = width / height;
                gl_Position = vec4(
                    scale * (cos(angle) * position.x - sin(angle) * position.y),
                    aspect * scale * (sin(angle) * position.x + cos(angle) * position.y),
                    0,
                    1.0);
            }`,
            // set up attributes
            attributes: {
                position: [[0, -1], [-1, 0], [1, 1]]
            },

            // uniforms
            uniforms: {
                //
                // Dynamic properties can be functions.  Each function gets passed:
                //
                //  * context: which contains data about the current regl environment
                //  * props: which are user specified arguments
                //  * batchId: which is the index of the draw command in the batch
                //
                angle: function(context, props, batchId) {
                    return props.speed * context.tick + 0.01 * batchId;
                },

                // As a shortcut/optimization we can also just read out a property
                // from the props.  For example, this
                scale: regl4.prop('scale'),

                //
                // is semantically equivalent to
                //
                //  scale: function (context, props) {
                //    return props.scale
                //  }
                //

                // Similarly there are shortcuts for accessing context variables
                width: regl4.context('viewportWidth'),
                height: regl4.context('viewportHeight'),
                //
                // which is the same as writing:
                //
                // width: function (context) {
                //    return context.viewportWidth
                // }
                //
            },

            // This tells regl the number of vertices to draw in this command
            count: 3
        })

        // call the drawSpinningStretchedTriangle command once for each triangle
        regl4.frame(function(context) {
            // 
            // Draws one spinning triangle
            drawSpinningStretchedTriangle({
            scale: 0.3,
            speed: 0.01
            })

            // draw multiple spinning triangles
            drawSpinningStretchedTriangle(
                [
                    { scale: 0.3, speed: 0.01 },
                    { scale: 0.2, speed: -0.02 },
                    { scale: 0.1, speed: 0.03 }
                ]
            )
        })
    });
</script>


<h1>Introduction to regl</h1>


<canvas bind:this={canvas} {width} {height} />

<div bind:this = {foodiv}>
hello another div
</div>


<div bind:this = {dotsdiv}>
    Hello moving dots
</div>


<div bind:this = {sstdiv}>
    Hello spinning stretched triangle
</div>