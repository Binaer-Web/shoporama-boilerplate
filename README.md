# Shoporama Boilerplate

The goal of this Shoporama Boilerplate, is to make developing Shoporama themes an even better experience.
We will do this by automating as much as possible, in a single build setup.

## Prequisites

- Node.js https://nodejs.org/en/
- Yarn: https://yarnpkg.com/ (Nice to have)

## Quick start

- Download or Fork this repo
- Copy all of your Shoporama theme files (all `.html` files, `theme_settings.ini` and `theme_settings.json`) into the `src/theme` folder
- Create a `config.json` file in the root (see example below)
- Run `yarn` (or `npm i` for non-yarn users)
- Run `yarn build` (or `npm run build`)
- Run `yarn deploy` (or `npm run build`)
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

## Commands

- `yarn build` Builds production files to `dist` folder
- `yarn start` Starts watchers, that build to the `dist` folder
- `yarn live` Starts deploy service, that watches and deploys changes from `dist` folder to SFTP
- `yarn deploy` Runs single deploy from `dist` folder to SFTP (remember to build first)

## Git flow

- Before coding `git pull`
- Before commit `git add`
- `git commit` name your update
- `git push` push to make it availiable online
