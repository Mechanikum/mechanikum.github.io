---
layout: /src/layouts/Main.astro
title: Portfolio itself
---
<div class="max-w-3xl w-full mx-auto px-6 py-2 markdown space-y-1.5 balance rounded-lg my-6 bg-neutral-900 
text-neutral-300/75">

# Portfolio itself

This thing is a little project on its own. So let's go over the hows and whys behind this website.

## How it started

The first version was a bunch of handwritten HTML pages and a single `.scss` file. Write the text, add the images, push to the repo, and GitHub Pages took care of the rest. Everything was fine—except for one small problem. Filling it with content was a terrible experience because **every** image had to be:

- Manually cropped to size
- Converted to WebP
- Added to the appropriate page manually

At the time, I had two choices: leave it as-is, or use Webpack and graft a terrible abomination with Nunjucks. Since I’d already had an unpleasant experience configuring Webpack (and had no desire to repeat it), I went against the latter.

## A year and a half later

Now, I actually need to update my portfolio with all the React single-page applications I’ve built. The idea of manually adding a page for each one—and repeating all that content work—fills me with dread. So let’s fix this and make it actually pleasant to work on.

Thankfully, a week earlier I’d tried Astro—built a small demo site with it—and loved every second of the experience. It was fast, pleasant, and framework felt like it was helping get things done.

### So why Astro?

**First:** Content. Astro is tailored to make content work less tedious—automatically optimizing images, pulling data from anywhere at build time, and keeping it all type-safe.

**Second:** The magic is internalized. Unlike Next.js, you don’t need to adapt every React component to work with Astro. Just slap on a flag for how a component should be loaded on its call, and you’re good to go. No need to declare whether a component is client- or server-only.

**Third:** It’s framework-agnostic. Mix and match whatever you like — or go full vanilla JS. Astro doesn’t care. And with Nanostores, you can make different frontend components communicate with each other easily.

## Let’s build the thing

I started with the simplest part: adapting the layout. Rewriting everything from SCSS to Tailwind took a couple of hours. Build the header and footer, drop them into the layout file (`src/layouts/main.astro`), and voilà — something reusable across the site.

Next step: content.

### Making a collection

Astro has this handy feature called content collections, which lets you build both content and pages from structured data. All good, but the default file system importers are designed to either collect files from folders using templates or create a collection from a single file.

That meant writing a manifest and manually adding all gallery images and .md file with project description to it again. And I'm lazy, so let's write our own importer instead.

First idea was to use Vite’s `import.meta.glob` to import all subfolders and their files of the `projects` folder, then form collection out of them, containing metadata (name, timestamp, tags, etc.), markdown description, and all the images, and them simply render it all, feeding images to Astro’s `<Image />` component for optimization.

Worked just fine in the dev — until I tried to build the project. Then it all crashed and burned.

The issue: I was importing the images themselves instead of a function to fetch them. Vite couldn’t bind the `@fs` paths those glob imports produced to actual paths. So, I moved image fetching out of the collections and into the files that actually use them. The end logic is:

- Collect all the projects by importing meta.json from folders in `src/assets/projects`
- Pull a `description.md` for each one into `rendered` field of collection entry for the ease of use in .astro components
- In astro components needing project images just pull all the images from `src/assets/projects` and retrieve import functions for the right ones using helper functions

### Making the gallery fancy

Now that we have pages and content, it’s time to make those galleries interactive with full-size image views.

Since I didn’t want to shift whole galleries to the client and still wanted Astro to handle image processing and optimization, I wrote a function that generates a record containing all images (in full resolution, converted to WebP) using Astro’s `getImage()` function.

Now I have all the image IDs and paths pre-associated. On click portfolio pages, if the clicked element (or its parent) has the right `data` attribute and the ID exists in our record, we open a dialog and load the full-size image.

Nice and simple.

## Conclusion

In two days, I essentially built a blog-like system that generates pages from a folder structure. Sure, there are areas to improve and a couple of refactors wouldn’t hurt, but overall it was a breeze. Populating the portfolio with content is no longer a chore—so it’s a win-win: I got deeper into how Astro works, and made my life easier.

</div>
