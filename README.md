# CCMS Site

This repository contains the CCMS website built with Hugo. The focus is on a clean, corporate style with simple content updates and predictable structure.

## What to Expect

- A Hugo-based site with no external themes
- A small number of custom layout files
- Straightforward folders for pages, images, and styling
- Easy to run locally with one command

## Key Locations

**content/**
All site pages. Update or create Markdown files here.

**layouts/**
Custom page layouts and partials used to control the structure of each page.

**assets/**
SCSS and other processed assets. Main styling lives here.

**static/**
Images, PDFs, and anything that should be served directly.

**config.toml**
Main site settings (title, menus, parameters).

## Running the Site

Start the development server:

```sh
hugo server
```

The site will appear at:

```
http://localhost:1313
```

## Building the Site

Create the production output:

```sh
hugo
```

Files will be placed in **/public**, ready for deployment.
