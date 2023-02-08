# Milosz Papierz (202181659)
- [x] Front-end Web Development
  - [GitHub repository](https://github.com/Web-IV/2223-frontendweb-MiloszPapierz1607)
  - [Online versie](https://dashboard-admin.onrender.com)
- [x] Web Services:
  - [GitHub repository](https://github.com/Web-IV/2223-webservices-MiloszPapierz1607)
  - [Online versie](https://admin-dashboard-omus.onrender.com)

**Logingegevens** <br />

**Applicatie**
- Gebruikersnaam/e-mailadres: Milosz.papierz1607@gmail.com
- Wachtwoord: Letmein1! <br />

**Cloudinary**
- e-mailadres: Milosz.papierz@student.hogent.be
- Wachtwoord: Admindashboard1! <br />
Ga naar dashboard. Daar zal je cloud name, api key en api secret vinden. Dit zal in ```.env``` bestand moeten komen.
Bovenaan kan je naar media library gaan. Daar zal je foto's vinden van producten. Foto's zullen daar komen als je een product aanmaakt met een foto.

## Projectbeschrijving
Mijn project is een simpele dashboard pagina voor een fictivie e-commerce zaak. Na de login komt de gebruiker op een dashboard. Daar ziet hij gegevens over zijn zaak. Hij ziet ook een grafiek waarop de geplaatste orders staan. Uiteindelijk is er ook een lijst waar de categorieën opgelijst worden. De gebruiker kan ze verwijderen of een nieuwe categorie toevoegen. Vervolgens is er product pagina. Daarop ziet de gebruiker welke producten er allemaal in zijn webshop zitten. Hij kan de producten verwijden, aanpassen of een nieuwe aanmaken. Op de laatste pagina ziet de admin een overzicht van geplaatste orders. Hij kan de orders verwijderen of de status van een order aanpassen. Als hij op de order klikt dan ziet hij welke producten besteld werden.
![image](https://user-images.githubusercontent.com/100273908/208118897-54acac75-8cab-4131-a5ac-b548239b88ab.png)

## Screenshots
![image](https://user-images.githubusercontent.com/100273908/208117783-071f1f58-5e18-4e8b-9768-75ea9117b8a5.png)
![image](https://user-images.githubusercontent.com/100273908/208117934-1fe89820-d6bb-4233-8977-799a7302ecfb.png)
![image](https://user-images.githubusercontent.com/100273908/208117988-8a5239b5-d24c-4f7c-8770-b6aa72bb167c.png)
![image](https://user-images.githubusercontent.com/100273908/208118021-c91e8694-35ee-4a22-a273-66c3e61f9125.png)
![image](https://user-images.githubusercontent.com/100273908/208118074-4139bd20-d5b7-4ada-95c8-e48db6644862.png)
![image](https://user-images.githubusercontent.com/100273908/208118129-c3e6237d-d395-41f7-b0d9-3739872097c9.png)
![image](https://user-images.githubusercontent.com/100273908/208118191-5beaebe8-5440-4021-9af3-50711df0d77c.png)

## Behaalde minimumvereisten
- **componenten**
  - [x] heeft meerdere componenten - dom & slim (naast login/register)
  - [x] definieert constanten (variabelen, functies en componenten) buiten de component
  - [x] minstens één form met validatie (naast login/register)
  - [x] login systeem (eigen of extern zoals bv. Auth0)
<br />

- **routing**
  - [x] heeft minstens 2 pagina's (naast login/register)
  - [x] routes worden afgeschermd met authenticatie en autorisatie
<br />

- **state-management**
  - [x] meerdere API calls (naast login/register)
  - [x] degelijke foutmeldingen indien API call faalt
  - [x] gebruikt useState enkel voor lokale state
  - [x] gebruikt Context, useReducer, Redux… voor globale state
<br />

- **hooks**
  - [x] kent het verschil tussen de hooks (useCallback, useEffect…)
  - [x] gebruikt de hooks op de juiste manier
<br />

- **varia**
  - [x] een aantal niet-triviale testen (unit en/of e2e en/of ui)
  - [x] minstens één extra technologie
  - [x] duidelijke en volledige README.md
  - [x] volledig en tijdig ingediend dossier

## Projectstructuur
### mappen
- api <br /> 
  Hier worden per entiteit alle api calls met axios bewaard.
- components <br />
  In components folder zitten alle globale componenten zoals Loading, Error enzovoort. Per pagina is er een folder. Daarin zit er een main component (meestal een lijst in de naam). De main componenten zijn slimme componenten. Ze bevatten de state en functies om de state aan te passen. Ook is er een folder voor authenticatie waarin alle componenten zitten die te maken hebben met authenticatie en authorizatie.
- contexts <br />
  Bevat contexten die de globale state van de applicatie bijhouden.
- types <br />
  Bevat custom interfacen voor TypeScript.
 
## Extra technologie
Mijn extra technologie is TypeScript. TypeScript is een sterk getypeerde programmeertaal die voortbouwt op JavaScript. TypeScript zal at compiletime de type checken van variabelen, parameters... . Uiteindelijk zal TypeScript alles omzetten naar JavaScript.
Tweede technologie is react-chartjs-2. Dit is een library die componenten levert van chartjs(een library voor grafieken). Het enige wat er moet gebeuren om het werkende te krijgen is een klein beetje configuratie. Dan kiezen we een component. Voor bijna elke soort grafiek is er een component voorzien. De component verwacht dat we de configuratie meegeven en de data. De component retourneert een canvas met de grafiek. <br />
[TypeScript](https://www.typescriptlang.org/) <br />
[react-chartjs-2](https://react-chartjs-2.js.org/)

## Testresultaten
Alle pagina's worden getest. Eerst wordt er getest of de juiste dingen getoond worden. Dan wordt er gekeken wat er gebeuerd bij een trage api call en een api call met een error. Voor elke entiteit worden ook alle crud operaties getest. Category en Order calls worden gemockt. Voor producten wordt dit niet gedaan aangezien er getest wordt of de afbeelding effectief op cloudinary toegevoegd wordt. Er wordt ook getest of de applicatie draait. Login en logout functionaliteiten worden ook getest.
![image](https://user-images.githubusercontent.com/100273908/208139193-f79bb50d-2e3e-4ddd-9fb3-4ead834bb3a1.png)

## Gekende bugs
Er zijn geen gekende bugs
