# Examenopdracht Front-end Web Development

- Student: Milosz Papierz
- Studentennummer: 202181659
- E-mailadres: Milosz.Papierz@student.hogent.be

## Vereisten

Ik verwacht dat volgende software reeds geïnstalleerd is:

- [NodeJS](https://nodejs.org)
- [NPM](https://www.npmjs.com/)
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)

## Opstarten
Installeer alle dependencies met ```npm install``` commando.
Maak een ```.env``` bestand in de root van het project
```
REACT_APP_AUTH0_DOMAIN={uw auth0 domain}
REACT_APP_AUTH0_CLIENT_ID={uw auth0 client id}
REACT_APP_AUTH0_API_AUDIENCE={uw auth0 api audience}
REACT_APP_API_URL={url of webservice + /api}
```
Start dan de server met ```npm start```.

## Testen
Installeer alle dependencies met ```npm install``` commando.
Maak een ```cypress.env.json``` bestand.
```
{
  "auth_audience": "{uw api audience}",
  "auth_url": "{uw api url}",
  "auth_client_id": "{uw client id}",
  "auth_client_secret": "{uw client secret}",
  "auth_username": "{uw testuser username}",
  "auth_password": "{uw testuser password}"
}

```
Start Cypress met ```npm test``` commando.
