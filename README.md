# apsitvarkom-fe

Apsitvarkom front end React web app

## Dependencies

- [Google Maps JS API](https://developers.google.com/maps/documentation/javascript)
- [apsitvarkom-be](https://github.com/vu-vibedosa/apsitvarkom-be)

## Running locally

1. Install dependencies by running `npm install`
2. Make sure you have `.env.development.local` files with this content:

```
REACT_APP_MAPS_API_KEY=<REPLACE_WITH_OUR_API_KEY>
```

3. Make sure back end API is running
4. Start the project by running `npm start`

## Styling

For styling we use [tailwindcss](https://tailwindcss.com/)

## Recommended VSCode plugins

- [PostCSS Language Support](https://marketplace.visualstudio.com/items?itemName=csstools.postcss)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) (turn on "Format on save" in vscode user settings and you may need to Ctrl+Shift+P, search for "Format document" and select Prettier as formatter when you try to run it for the first time)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## CICD

- Every PR to `staging` branch runs CI automatically that builds, tests and reports coverage in the PR.
- Every merge/push to `staging` branch runs CICD that automatically builds, tests, builds docker image, pushes it to an [Artifact Registry](https://cloud.google.com/artifact-registry) and then deploys it in [Cloud Run](https://cloud.google.com/run). See "Environments" on GitHub to access `staging` environment url.
