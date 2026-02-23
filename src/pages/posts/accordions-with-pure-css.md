---
# yaml-language-server: $schema=schemas\page.schema.json
layout: ../../layouts/PostLayout.astro
title: Accordions with pure CSS
published: 20.02.2026
description: How to create working, animated accordions with "details" tag and some CSS
---
# Accordions With Pure CSS   
Simple tutorial on using `<details />` with css to create an accordion   
I am exploring today some properties and elements that could allow me to create an accordion without any javascript on it, without any kind of hacks or weird stuff.   
To begin with, I have the following markup   

```html
<details class="details" name="webtech">
  <summary class="details__summary">HTML</summary>
  <div class="details__content">
    <p>Hypertext Markup Language</p>
    <p>It is the language used to express the structure of the document</p>
  </div>
</details>
<details class="details" name="webtech">
  <summary class="details__summary">CSS</summary>
  <div class="details__content">
    <p>Cascading Style Sheets</p>
    <p>Responsible for the presentation of the content, colors, fonts, layouts and even animations and transitions</p>
  </div>
</details>
<details class="details" name="webtech">
  <summary class="details__summary">JS</summary>
  <div class="details__content">
    <p>JavaScript</p>
    <p>It's a turing complete scripting language, mainly used for business and application logic</p>
  </div>
</details>
```

Some key concepts:   
- the `details` element does the heavy lifting of showing and hiding content   
- the `name` property in the `details` is what creates the mutually exclusive behavior of the accordion, as long as the elements share a name, only one can be open at any given time.   
   
   
## Starting to style   
I just threw some initial styling to it, so it can start to look a little bit nicer:   

```css
:root {
  --primary-color: oklch(60% 50% 200deg);
}

.details {
  width: 400px;
  margin-block: .5rem;
  font-family: sans-serif;
  color: oklch(from var(--primary-color) 10% c h);
}

.details__summary {
  list-style: none;
  background-color: var(--primary-color);
  cursor: pointer;
  
  padding: .5rem;
  
  &:hover {
    background-color: oklch(from var(--primary-color) calc(l * 5/6) c h)
  }
}

.details__content {
  padding: .2rem 1rem;
  background-color: oklch(from var(--primary-color) calc(l * 4/3) calc(c * 2/5) h)
}
```

I basically tried to do it all with one single color and added some variations of it, so now they look a little bit like boxes you can open and close.   

## Starting the animation effect   
This effect relies on combining two pieces:    
- the `interpolate-size` property, which allows us to animate into a height of `auto` from a value, like `0`    
- the `allow-discrete` value for `transition-behavior` property, which will let us transition from and to values of properties that are not really animatable, in this case the `content-visibility` property   
   
   
First we update the `:root` to use `interpolate-size`    

```css
:root {
  --primary-color: oklch(60% 50% 200deg);
  interpolate-size: allow-keywords;
}
```

Next we go to the styling of the `::details-content` pseudo-element, that wraps all the collapsable content of our accordion and change its size from `0` (when closed) to `auto` (when opened). We also need to include `overflow: hidden` in the `.details` style.   

```css
.details {
  max-width: 300px;
  margin-block: .5rem;
  font-family: sans-serif;
  color: oklch(from var(--primary-color) 10% c h);
  overflow: hidden; /* this is necessary */
}

.details::details-content {
  transition: height .5s ease;
  height: 0;
}

.details[open]::details-content {
  height: auto;
}
```

This already works for opening the items of the accordion, but the closing effect does not work as intended.   
That is because the `::details-content` pseudo-element changes the value of its `content-visibility`  property to `hidden`  for accessibility purposes.   
To solve it we need to include it in the transition, with the `allow-discrete` behavior:   

```css
.details::details-content {
  --duration: .5s;
  transition: height var(--duration) ease,
    content-visibility var(--duration) allow-discrete;
  height: 0;
}
```
   
## Demo   
   
<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="ByzvxKm" data-pen-title="No JS Accordion" data-user="jsanchesleao" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
      <span>See the Pen <a href="https://codepen.io/jsanchesleao/pen/ByzvxKm">
  No JS Accordion</a> by Jeferson Leao (<a href="https://codepen.io/jsanchesleao">@jsanchesleao</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
      </p>
      <script async src="https://public.codepenassets.com/embed/index.js"></script>
