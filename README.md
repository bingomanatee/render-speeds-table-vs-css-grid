## Table vs css grid test

This is a set of files to test the render speed 
of css grids vs. tables. 

## The tests:

The methodology of these tests was fairly simple:

1. Generate a low-impact high-data target for both the grid and table.
2. use ejs to render out HTML files with minimal CSS.
3. render these files in the browser while logging performance.

the cache was disabled during the trials, and the latest versions of Firefox(68.0.2 (64-bit)) 
and Chrome (Version 76.0.3809.132 (Official Build) (64-bit)) were used on a 
2017 iMac Pro running Mohave.

### CSS notes

Many of the visual qualities were NOT made the same to equalize the css being 
applied to both cases. For instance vertical alignment and row height were 
not controlled, and as a result the content does not look the same from
grid to table in all cases. 

Table cell width was controlled (where it was controlled) using nth-child
notation; table column notation no longer seems effective. 

CSS Grid used `.grid-template-columns` notation to define cell width. 

Cells were bordered in both cases with 1px solid black; table borders were collapsed.

The good news is that on a fast system, both browsers let you render large amounts
of tabluar data efficiently regardless of your methodology. 

### Baseline: 50x200-nums

This test has the least defined or stressful requirements of all:
no predefined width, simple content. (although this may increase the times, 
as without predefined width, entire columns must be considered as a unit)

### Fixed: 50x200-nums-fixed

The same data, with predefined widths of 50px. Overflow hidden.
Note, to get fixed columns to work we have to specify a table width. even
saying 100% (wrong) seems to work. 

### Rich Content: 4x200-rich-content 

Here we get into the "real world F**kedness" of web design: a table with 
html tags in the content, generating variable row height , and 
block level content inside cells. 

### Kitten Torture: 5x500-rich-content-with-image

The above tests, with more rows, and kitten images. The images don't have
width/height and are non-standard sizes (and not always present) generating
the maximum amount of chaos for the rendering as images load and resize the grid
after the initial pass.

## Results: Chrome

```
                          	table	grid
50x200-nums	                    543  798
50x200-nums-fixed	            523  656
4x200-rich-content	            251  230
5x500-rich-content-with-image	682  796

```

![chrome graph](https://github.com/bingomanatee/render-speeds-table-vs-css-grid/blob/master/times/chrome%20rendering%20times.png?raw=true)

CASS Grid is , surprisingly, slower in nearly all categories; faster in 
one of the real world scenarios. However the times ranged from 16% better to 
47% worse, were generally within 10-20% of each other. 

The "single number" result is that CSS Grid is 20% slower than Tables. 

## Results: Firefox

```
                              table    grid
50x200-nums                      557    388
50x200-nums-fixed                287    266
4x200-rich-content               164    215
5x500-rich-content-with-image    320    548

```

![chrome graph](https://github.com/bingomanatee/render-speeds-table-vs-css-grid/blob/master/times/firefox%20rendering%20times.png?raw=true)

On Firefox the results were more extreme but due to one single 
slow test (the last one) the net results are the same: 20% slower. 

## Summary

Its worth noting that all these tests have a large cell count but 
overall the rendering times were 0.3 seconds. Variation at this scale 
are not huge and vary significantly by browser. 

Chrome was on average half as fast as Firefox. 

More browser tests, and  more tests, are needed to be conclusive, but I think
its fair to say the two systems give comparable speeds.  
