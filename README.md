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