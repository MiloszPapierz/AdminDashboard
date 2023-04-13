## Vereisten

Ik verwacht dat volgende software reeds geïnstalleerd is:

- [NodeJS](https://nodejs.org)
- [NPM](https://www.npmjs.com/)
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)


## Opstarten

Om dit API te starten, maak een ```.env``` bestand aan in de root van het project
```
NODE_ENV=development
DATABASE_HOST={localhost of een andere}
DATABASE_PORT={3306 of een andere}
DATABASE_NAME=dashboard
DATABASE_USER={your database user}
DATABASE_PASSWORD={your database password}
CLOUDINARY_NAME={uw cloudinary project -> zie verder}
CLOUDINARY_KEY={uw cloudinary sleutel -> zie verder}
CLOUDINARY_SECRET={uw cloudinary secret -> zie verder}
AUTH_JWKS_URI={uw jwkr uri}
AUTH_AUDIENCE={uw auth audience}
AUTH_ISSUER='{uw auth issuer}'
```
Gebruik ```npm start``` om de server te starten.

## Testen
Maak een ```.env.test``` bestand aan in de root van het project. Dit bevat dezelfde configuratie (gebruik andere database) als hierboven en deze extra's:
```
NODE_ENV=test
AUTH_TEST_USER_USER_ID={uw test user id}
AUTH_TEST_USER_USERNAME={uw test user nickname}
AUTH_TEST_USER_PASSWORD={uw test user password}
AUTH_TOKEN_URL={uw token url}
AUTH_CLIENT_ID={uw client token id}
AUTH_CLIENT_SECRET={uw client secret}
```

Met ```npm test``` kan je de testen runnen. Met ```npm run test:coverage``` kan je de coverage krijgen van alle testen.
