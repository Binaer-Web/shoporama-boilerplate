# Shoporama Boilerplate

The goal of this Shoporama Boilerplate, is to make developing Shoporama themes an even better experience.
We will do this by automating as much as possible, in a single build setup.

## Prequisites

- Node.js https://nodejs.org/en/
- Yarn: https://yarnpkg.com/ (Nice to have)
## Commands

- `yarn build` Builds production files to `dist` folder
- `yarn start` Starts watchers, that build to the `dist` folder
- `yarn live` Starts deploy service, that watches and deploys changes from `dist` folder to SFTP
- `yarn deploy` Runs single deploy from `dist` folder to SFTP (remember to build first)
## Quick start

- Download or Fork this repo
- Copy all of your Shoporama theme files (all `.html` files, `theme_settings.ini` and `theme_settings.json`) into the `src/theme` folder
- Create a `config.json` file in the root (see example below)
- Run `yarn`
- Run `yarn build` 
- Run `yarn deploy`
- Congrats! Now your theme is deployed to your Shoporama Shop!

Example of `config.json`, this file should be located in the root of your project, next to the `gulpfile.js`.
You can find all the nessecary information in "Settings" -> "SFTP" in Shoporama.
Make sure to adjust all properties in the config file.

```json
{
  "user": "[Your SFTP username]",
  "password": "[Your SFTP password]",
  "theme": "[name-of-my-theme]",
  "host": "[SFTP Server domain]",
  "port": 1234
}
```

## Live mode (Auto SFTP upload)
When developing, you can have the "Live" command running in the background.
This will automatically upload all the changes, without having to manually upload through your FTP client.

To enable Live mode:
1. `yarn start` This will build your changes into the `dist` folder
2. Open a new terminal window, and here run `yarn live`, this will automatically upload changes

## LESS
This boilerplate uses LESS as preprocessor, and contains some basic styling:
- CSS reset (Based on: https://github.com/hankchizljaw/modern-css-reset)
- Grid system (Based on Bootstrap grid: https://getbootstrap.com/docs/4.5/layout/grid/ ONLY grid system, no bootstrap components included)
- Button component
- Basic variable setup

`master.less` is the file that will be compiled when changing `.less` files. If you change the name of this, make sure to also change it in the `gulpfile.js`, and in `global.html`
## JS
All `.js` files will be compiled with [Babel](https://babeljs.io/) and minified in `master.min.js`.
This enables you to write ES6 code, but still be able to run it in older browsers.

If you are using 3rd party libraries, you can put them in `/src/vendors`. This will compile them into `vendors.min.js`, and this file is included seperately in `global.html`.

If you don't use the Vendor functionality, make sure to exclude the reference in `global.html`.

**Notice**: Vendors are only getting compiled with the `build` command

## SVG
You can put any SVG icon into the `src/svg` folder. These icons will be optimized and merged into a sprite file.
You can reference this sprite file and style your SVG icon as you please, and the client only have to do 1 request for the icons.

You include a SVG file in your HTML by referencing the filename as hash on the sprite, for example:
```html
<svg>
  <use xlink:href="/symbol/svg/sprite.symbol.svg#close"></use>
</svg>
```
This will render the `close.svg` file

### Debugging SVG
If the icons look wierd, make sure to expand the SVG file as much as possible.
In illustrator you can do this by:
1. Select everything
2. Object -> Expand
3. Pathfinder -> Unite

This will often fix wierd looking icons.