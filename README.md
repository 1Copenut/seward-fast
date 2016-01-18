# Seward Fast
Codebase for Seward Fast Internet Initiative Website

## Purpose
Seward County, Nebraska is working to bring high-speed fiber into every home and business. This site is being constructed as a public forum and information piece.

## Instructions for Development:
1. ``` git clone git@github.com:1Copenut/seward-fast.git ```
2. ``` cd seward-fast ```
3. ``` node server ```
4. ``` nodemon build ```

These commands will clone the existing master branch, change to the working directory, start the server, and start the Nodemon automatic rebuild script. Nodemon is configured via the nodemon.json file, and will rebuild on any changes to **Javascript**, **JSON**, **Markdown**, or **Handlebars** files in the /src and /templates directories.

This automatic rebuild script does not trigger for CSS or SCSS/Sass/Less changes. A separate watch task and LiveReload will be configured to handle those changes.
