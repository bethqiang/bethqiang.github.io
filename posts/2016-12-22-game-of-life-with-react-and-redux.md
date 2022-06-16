---
title: "Game of Life with React and Redux: The Hard Parts"
tags: ["react", "redux", "game of life"]
date: "2016-12-22"
excerpt: "For the past few days, I've spent most of my time slowly cobbling together the Game of Life using React, Redux, and Sass. There's actually really not that much Sass – starting out, I wanted to practice it, although now that I'm halfway through, I'm realizing that I really don't need it."
---

For the past few days, I've spent most of my time slowly cobbling together the Game of Life using React, Redux, and Sass. There's actually really not that much Sass – starting out, I wanted to practice it, although now that I'm halfway through, I'm realizing that I really don't need it. I probably should have just saved it for another project – but anyway.

In the [first week of Fullstack](/writing/2016-11-4-game-of-life-and-introductory-nodejs/), we actually built Game of Life with vanilla JavaScript. My pair and I fought through some battles together, and so I anticipated that re-doing it using a few extra technologies wasn't going to be *that* hard. (Famous last words.)

## The Webpack Rabbit Hole

The first roadblock I ran into was trying to run and deploy a front-end-only React app via GitHub Pages. (I didn't want to bother with any kind of back-end, even a little mini server to serve static files, because I recently discovered that Heroku makes you give them your credit card information if you want to deploy more than five apps. Which is fine, and I'm sure I'll do it eventually, but if I can avoid it, I totally will.) So, I couldn't serve static files. Which meant that my main `index.html` file had to be in my root directory. Okay, that's annoying, but that's not *too* bad. (Yet.)

After pondering a couple of different possibilities, including just linking CDNs to React and Redux in the index.html, I decided to go the Webpack route. I'd then be able to throw Sass into the mixture. I set up a basic version of Webpack, along with React and Redux, coded a quick "Hello World," and deployed it under a repo titled "experiment." I told Webpack to output my `bundle.js` in a `public` folder. And...then I realized I had no idea how to open my app locally.

As a result, I ended up diving into and spending hours in a Webpack rabbit hole learning how to set up the Webpack dev server and a production Webpack configuration. Webpack can do *a lot* of things, and I'm sure I didn't even come across half of them. After a few more rounds of experimentally uploading and deploying, I finally settled on a configuration that would deploy without errors, and had a colorful "Hello World!" to prove it!

So, that was a fun day 1 of this project.

## The Beginning (aka, the Starting Grid)

My next major hurdle came when I started adding files I thought I'd need (action creators, reducers, components, containers, etc.). I started by trying to create rough outlines of the components, and then I'd think about everything I'd need the component's containers to do, and then I tried writing functions in containers, and then I forgot entirely how Redux worked, and then I got really overwhelmed.

So. Deep breath.

I deleted my rough outlines in attempt to start from a clean slate. I started again, this time with the *sole goal* of just getting some kind of grid to show up. I wasn't sure where to put this magical `makeGrid` function, and stuck it in a `utils.js` file for the moment, figuring I could move it later. I needed to represent the board's cells and their status in some way. I made a giant array of objects, each of which would have properties like an `id` and a `status`, which is what my pair and I did when we did this in vanilla JavaScript.

```
export const makeGrid = (width, height) => {
  let grid = [];
  for (let yCoord = 0; yCoord < width; yCoord++) {
    for (let xCoord = 0; xCoord < height; xCoord++) {
      grid.push({
        xCoord,
        yCoord,
        status: 'dead'
      })
    }
  }
  return grid;
}
```

When I passed this through the `BoardContainer` down to the `Board` component, I didn't see a way I could easily map over the array in a way that would give me a board with a certain number of rows and columns, instead of a board that consisted of one row with many, many columns. I revisited my `makeGrid` function and instead, made an array that had rows that were also arrays that held objects, that were each of the individual cells.

```
export const makeGrid = (height, width) => {
  let grid = [];
  for (let yCoord = 0; yCoord < height; yCoord++) {
    let row = [];
    for (let xCoord = 0; xCoord < width; xCoord++) {
      row.push({
        xCoord,
        yCoord,
        status: 'dead'
      });
    }
    grid.push(row);
  }
  return grid;
};
```

I wanted the `yCoord` to refer to the vertical axes and the `xCoord` to refer to the horizontal axes, as that seemed like the most intuitive path to me. Little did I know that this would cause me a slight headache later. Anyway, in my `Board` component, I could map over each row, and within each row, map over each cell, like so:

```
const Board = props => {
  return (
    <div>
      <table>
        <tbody>
          {props.board.grid.map((row, yCoord) => (
            <tr key={yCoord}>
              {row.map((cell, xCoord) => (
                <Cell key={xCoord}
                  id={props.id}
                  status={props.board.grid[xCoord][yCoord].status}
                  handleClick={() => props.toggleCell(xCoord, yCoord)} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
```

I then set up a very basic cell component, added in some styling, and voila, I had a grid!

Making the board have a random configuration upon the initial render wasn't difficult; I just added a `randomize` parameter with a default value of `true` to the `makeGrid` function and a conditional:

```
if (randomize) {
  if (Math.random() > 0.75) status = 'alive';
  else status = 'dead';
}
```

## Counting Living Neighbors

Cool! Next goal: advance to the next generation, given the number of dead or alive neighbors around each cell.

After creating actions, I needed to create a new function that would "calculate" the new statuses of each cell. This ended up looking like this:

```
export const stepForward = (grid = []) => {

  const height = grid.length;
  const width = grid[0].length;
  const newGrid = [];
  let status;

  for (let yCoord = 0; yCoord < height; yCoord++) {
    let newRow = [];
    for (let xCoord = 0; xCoord < width; xCoord++) {
      let currStatus = grid[xCoord][yCoord].status;
      let count = getLivingNeighbors(xCoord, yCoord, grid);
      if (currStatus === 'alive' && (count === 2 || count === 3)) {
        status = 'alive';
      } else if (currStatus === 'dead' && count === 3) {
        status = 'alive';
      } else {
        status = 'dead';
      }
      newRow.push({
        xCoord,
        yCoord,
        status
      });
    }
    newGrid.push(newRow);
  }
  return newGrid;
};
```

Yes, there's a lot of repetition in there...I'm essentially recreating the `makeGrid` function, with some extra stuff in between. Refactoring these huge functions is definitely on the to-do list.

`getLivingNeighbors` was a function that consisted of nested `for` loops, to loop through each cell that surrounded the current cell, checked if the `className` on the cell DOM element was `'alive'`, and if so, incremented the `count`.
I was quite proud of myself for figuring out all of this, and ran my code...only to realize that all of the cells would immediately die on the first "step." After puzzling and Googling, it turns out, `document.getElementById` doesn't work in React – you can't directly manipulate the DOM! Well, that's something. A few Stack Overflow answers suggested trying the `ref` property that React provides, but even though it was a possibility, it didn't seem like what the `ref` property was intended for. (I didn't have a callback function to provide within it; I just wanted to access the DOM element...)

Instead, I took a somewhat roundabout way of getting the surrounding cells and their status. To make this work, I also had to change the values of the `status` field from `'alive'` or `'dead'` to 1s and 0s so that I could just increment the count based on neighboring statuses instead of trying to deal with conditionals for each neighbor.

```
const getLivingNeighbors = (xCoord, yCoord, grid = []) => {

  const height = grid.length;
  const width = grid[0].length;

  // If a cell is at the edge of the grid, the cell on the opposite edge will be its neighbor
  const left = xCoord - 1 < 0 ? (width - 1) : (xCoord - 1);
  const right = xCoord + 1 === width ? 0 : (xCoord + 1);
  const up = yCoord - 1 < 0 ? (height - 1) : (yCoord - 1);
  const down = yCoord + 1 === height ? 0 : (yCoord + 1);

  let count = 0;

  count += grid[left][up].status;
  count += grid[xCoord][up].status;
  count += grid[right][up].status;
  count += grid[left][yCoord].status;
  count += grid[right][yCoord].status;
  count += grid[left][down].status;
  count += grid[xCoord][down].status;
  count += grid[right][down].status;

  return count;
};
```

## Non-Intuitive Grid Positioning

So, remember when I said, "I wanted the `yCoord` to refer to the vertical axes and the `xCoord` to refer to the horizontal axes, as that seemed like the most intuitive path to me. Little did I know that this would cause me a slight headache later."

Well, once I had the `stepForward` function coded out and triggering with a click on the corresponding button, I discovered that though my Game of Life was doing *something* in the next generation, the common patterns weren't behaving quite as expected. (Although, they weren't disappearing, at least.)

After a lot of state-examining (thanks, `redux-logger`!) and clicking around on boxes, I discovered that there was a conflict between the way I had set up my grid and the way I was referencing positions in it. Because I set it up so that each row is its own array and the rows were the y coordinates, this actually meant that whenever I wanted to reference a position on the grid, I'd have to specify the y coordinate first. (e.g. `grid[y][x]` – until this point, I had been doing the opposite.)

After changing this in every place I was referencing a grid position, everything worked as expected! I could now advance generations on the click of a button, as well as click to toggle a cell to be `alive` or `dead`.

## Next Steps

Now that I have at least the basic core functionality down of moving from generation to generation, I have a couple of smaller things to add:

* A `setInterval` or `requestAnimationFrame` so that the game will automatically advance generations on initial render or on the press of the play button
* A counter to show the number of generations that have passed
* Functionality of the rest of the buttons (play, stop, random)
* Some styling and pretty colors

Possibly one the more intensive and time-consuming things will be refactoring – right now, most of my core functionality is in a massive `utils.js` file with two large and repetitive functions. It'd be nice to see if I could also make it so that when I'm referencing positions in the grid, I can specify the x coordinate first instead of the y.

In case you're curious, [here's](https://github.com/bethqiang/game-of-life) the GitHub repo for this project. It's not deployed yet, but I do plan on it after I'm done!
