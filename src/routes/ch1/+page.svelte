<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>


<h1> Ch1 - Basic data visualisation</h1>

<p>
    We will learn how to use SVG to create basic data visualisation. You need to know:
</p>

<ul>
    <li> the coordinate system of SVG </li>
    <li> how to draw basic shapes </li>
</ul>


<p>
    The origin (0,0) of an SVG image is at the top left, not the bottom left. This means that higher values for y will give you marks that are lower in the graphic, as you can see with the circle and the rectangle below. When plotting actual data, make sure that you flip that orientation.
</p>


<svg width="300" height="300">
    <circle cx="50" cy="50" r="30"/>
    <circle cx="150" cy="100" r="30"/>
    <rect x="100" y="200" width="70" height="30" />
</svg>

<p>
    Here is the code:
</p>

<pre>
    <code>
        &lt;svg width="300" height="300"&gt;
            &lt;circle cx="50" cy="50" r="30"/&gt;
            &lt;circle cx="150" cy="100" r="30"/&gt;
            &lt;rect x="100" y="200" width="70" height="30" /&gt;
        &lt;/svg&gt;
    </code>
</pre>

<p>
    Now, we will draw a blue dot from cx=50 to cx=300 and notice that the last cycle only
    shows half of the circle. This is because the width of the SVG is 300 and the cx of the
    last circle is 300. So, the circle is drawn at the edge of the SVG.
</p>

<svg width="300" height="100">
    <circle cx="50" cy="50" r="30" fill="blue"/>
    <circle cx="150" cy="50" r="30" fill="blue"/>
    <circle cx="250" cy="50" r="30" fill="blue"/>
    <circle cx="300" cy="50" r="30" fill="blue"/>
</svg>


<p>
    Here is the code:
</p>

<pre>
    <code>
        &lt;svg width="300" height="100"&gt;
            &lt;circle cx="50" cy="50" r="30" fill="blue"/&gt;
            &lt;circle cx="150" cy="50" r="30" fill="blue"/&gt;
            &lt;circle cx="250" cy="50" r="30" fill="blue"/&gt;
            &lt;circle cx="300" cy="50" r="30" fill="blue"/&gt;
        &lt;/svg&gt;
    </code>
</pre>


<p>We could also draw line and path</p>


<svg width="300" height="200">
    <line x1="0" y1="0" x2="300" y2="100" stroke="black" stroke-width="2"/>
    <path d="M 0 200 L 100 50 L 100,150 L 200,0"/>
    <path d="M 20,100 Q 100,20 180,100" stroke="red" stroke-width="2" fill=none />
</svg>


<p>
    Here is the code:
</p>

<pre>
    <code>
        &lt;svg width="300" height="200"&gt;
            &lt;line x1="0" y1="0" x2="300" y2="100"
            stroke="black" stroke-width="2"/&gt;
            &lt;path d="M 0 200 L 100 50 L 100,150 L 200,0"/&gt;
            &lt;path d="M 20,100 Q 100,20 180,100"
            stroke="red" stroke-width="2" fill=none /&gt;
        &lt;/svg&gt;
    </code>
</pre>


<p>
    We could also draw text and use CSS to style it.
</p>

<svg width="300" height="25">
    <text x="0" y="20" font-size="20" font-family="Verdana" fill="red">Hello World</text>
</svg>

<p>
    Here is the code:
</p>

<pre>
    <code>
        &lt;svg width="300" height="250"&gt;
            &lt;text x="0" y="20" font-size="20"
            font-family="Verdana" fill="red"&gt;
            Hello World
            &lt;/text&gt;
        &lt;/svg&gt;
    </code>
</pre>


<p>
    With SVG, you have high level control over the graphic. You could use CSS to style the
    graphic. You could also use Javascript to manipulate the graphic. Therefore,
    if you know the grammar of graphics, you could use SVG to create any graphic you want.
    For instance, ggplo2 in R is built to manipulate similar graphic elements in R
    environment with <a href="https://link.springer.com/book/10.1007/0-387-28695-0">the
    help of this book</a>.
</p>