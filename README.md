# De impact van de betere beheersing van de Engelse taal op de vertalingen van Engelse boeken naar het Nederlands

**Sinds 1986 is er in ons land veel aandacht besteedt aan de Engelse taal, het vak Engels werd toen verplicht in groep 7 en 8 van de basisschool. Ook in de Nederlandse media kwamen we de Engelse taal steeds vaker tegen, met name op de televisie en radio. Uit een recent onderzoek van taalonderwijsbureau EF Education blijkt dat Nederlanders de engelse taal beter beheersen dan andere landen die Engels niet als moedertaal hanteren. Nederlanders zijn over het algemeen dus goed in Engels geworden, maar wat is daar dan de impact van op de vertalingen van Engelse boeken naar het Nederlands?**

## Hoofdvraag
Wat is de impact van de betere beheersing van de Engels taal op de vertalingen van Engelse boeken naar het Nederlands?

### Hypothese
De betere beheersing van de Engelse taal zorgt ervoor dat er minder boeken vertaald worden van het Engels naar het Nederlands

### Benodigde variabelen
* Originele taal
* Taal (beschikbare talen)
* Publicatiejaar
* Doelgroep
* Formaat

## Onderzoek
Om data te koppelen aan de benodigde variabelen gebruiken we gegevens van de Openbare Bibliotheek Amsterdam (OBA).

### Data ophalen uit de OBA API
[Rijk van Zanten](https://github.com/rijkvanzanten) heeft een [tool](https://github.com/rijkvanzanten/node-oba-api) geschreven om data uit de OBA API te halen en te converteren naar JSON. Ik heb de tool aangepast zodat de resultaten van een zoekterm prettified en geschreven worden naar een .json-bestand. Vervolgens heb ik alle keys opgehaald en daar de beschikbare data op gebaseerd.

#### Beschikbare data
* Titel
* Korte titel
* Subtitel
* Hoofdauteur
* Auteur
* Formaat
* Uitgever
* Beschrijving
* Taal
* Originele taal
* Genre
* Kenmerken
* Cover
* ISBN
* SISO
* Publicatiejaar
* Onderwerp
* Editie
* Series
* Doelgroep

### Data doorzoeken
*Folkert en Dennis hebben Rijk's tool aangepast om de tool gangbaarder te maken. Ik heb daarom de overstap gemaakt naar de door hen aangepaste tool.*



#### Data visualiseren

