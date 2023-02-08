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
- **datalaag**
  - [x] voldoende complex (meer dan één tabel)
  - [x] één module beheert de connectie + connectie wordt gesloten bij sluiten server
  - [x] heeft migraties
  - [x] heeft seeds
<br />

- **repositorylaag**
  - [x] definieert één repository per entiteit (niet voor tussentabellen) - indien van toepassing
  - [x] mapt OO-rijke data naar relationele tabellen en vice versa
<br />

- **servicelaag met een zekere complexiteit**
  - [x] bevat alle domeinlogica
  - [x] bevat geen SQL-queries of databank-gerelateerde code
<br />

- **REST-laag**
  - [x] meerdere routes met invoervalidatie
  - [x] degelijke foutboodschappen
  - [x] volgt de conventies van een RESTful API
  - [x] bevat geen domeinlogica
  - [x] degelijke authorisatie/authenticatie op alle routes
<br />

- **varia**
  - [x] een aantal niet-triviale testen (min. 1 controller >=80% coverage)
  - [x] minstens één extra technologie
  - [x] duidelijke en volledige `README.md`
  - [x] maakt gebruik van de laatste ES6-features (object destructuring, spread operator...)
  - [x] volledig en tijdig ingediend dossier


## Projectstructuur
### mappen
- rest <br />
  Hier zitten alle endpoins van de applicatie. Ook validatie wordt hier gedaan aangezien die zo snel mogelijk moet gebeuren. 
- service <br />
  Alle logica van de applicatie zit in de servicelaag. Hier worden externe apis aangeroepen, berekeningen gedaan en dergelijke.
- respository <br />
  Repositorylaag is verantwoordelijk voor de communicatie met de databank. De tabellen worden gemapt naar objecten die dan naar de servicelaag doorgegeven worden.
- data <br />
  Datalaag is verantwoordelijk voor het afhandelen van de communicatie met de databank. Hier wordt er connectie opgezet en afgesloten met de databank. Migraties en seeds vinden ook plaats in de datalaag
- core <br />
  In core worden dingen aangemaakt die op verschillende plaatsen in de applicatie gebruikt kunnen worden. Voorbeelden hiervan zijn logging, communicatie met externe apis error handling enzo
- __tests__  <br />
  Hier zitten modules die voor alle testen gebruikt worden. In de rest map zitten alle integratietesten per entiteit.

## Extra technologie

Mijn extra technologie is multer. Multer is een middleware om multipart/form-data te behandelen. Het wordt vooral gebruikt voor het uploaden van bestanden.
Bij het aanmaken van multer object moet er gekozen worden waar de bestanden opgeslagen zullen worden(diskstorage of memorystorage). Aangezien ik de afbeeldingen naar cloudinary verstuur hou ik ze in de memory bij. Aan de multer object heb ik nog een tweede property gegeven fileFilter. Dit accepteert een functie die de validatie van de bestanden uitvoert. Om een bestand toe te voegen aan de koa context object moet multer gebruikt worden als middleware. Daarvoor werd koa/multer gebruikt. methode single verwacht een parameter die overeenkomt met de key van de formdata object. De afbeelding wordt dan via de api van cloudinary in de cloud gezet.<br />
[multer](https://www.npmjs.com/package/multer)<br />
[@koa/multer](https://www.npmjs.com/package/@koa/multer)<br />
[cloudinary](https://cloudinary.com/)

## Testresultaten
Voor elke entiteit werden er testen geschreven. Daarbij werden alle endpoints getest. Zowel goede als slechte verlopen. Volgende endpoints werden getest:
### Categories
- GET /api/categories
- POST /api/categories
- PUT /api/categories/:id
- DELETE /api/categories/:id
### Products
- GET /api/products
- POST /api/products
- PUT /api/products/:id
- DELETE /api/products/:id
### Orders
- GET /api/orders
- PUT /api/orders/:id
- DELETE /api/orders/:id <br />
![image](https://user-images.githubusercontent.com/100273908/208120423-d7d346bf-d47b-4a70-924c-3df9f69f0ae6.png)
![image](https://user-images.githubusercontent.com/100273908/208120645-96ccdb0a-4caf-46a3-a565-a43604118c94.png)


## Gekende bugs
Er zijn geen gekende bugs
