# dataviz-events
dataviz-events permet la visualisation de données d'évènements publics en France [données source : https://bit.ly/2zl8s4B]

Cet outil peut-être particulièrement utile pour les organisateurs d'évènements afin de déterminer à quels lieux et pendant quelles périodes de l'année il serait propice d'effectuer un certain type d'évènement.
Il peut également être interéssant pour un utilisateur lambda de voir quels évènements sont prévus autour de lui dans le futur.

Les données sont représentées de 4 manières différentes dans l'application :
- Une **carte intéractive** de la France sur laquelle les évènements sont placés en fonction de leur longitude et leur latitude. Au survol de chaque département, son nom et sa région sont affichés. Il est possible de déplacer la carte, de zoomer/dézoomer et de la recentrer à sa position initiale.

Cette technique permet principalement de visualiser de façon très intuitive les regroupement géographiques des évènements et donc d'en déterminer les lieux à forte densité d'évènements.

- Un **calendrier heatmap** répertoriant les évènements en fonction de leur date et affichant un carré pour chauqe jour de plus en plus foncé en fonction du nombre d'évènements dans la journée. Au survol d'un jour, sa date et le nombre d'évènements associé sont affichés.

Cette technique permet d'évaluer les tendances de répétitions des évènements en fonction du temps et démontre donc à quelle période du mois ou de l'année ils ont tendance à se dérouler.

- Un **pie chart** à 2 couches, le cercle intérieur affiche le pourcentage des évènements se déroulant dans chaque département, tandis que le cercle extérieur affiche, pour un département donnée, la répartition d'évènements gratuits et payants.

Cette technique permet de voir très rapidement dans quels départements se déroulent le plus d'évènement ainsi que leur type d'entrée.

- Un **radar chart** affichant la répartition des types des évènements dans les 5 plus grandes villes de France.

Cette technique permet la visualisation de la répartition des sortes d'évènements en fonction de leur lieu, on peut y observer des tendances différentes (et donc la préférence) dans chacune de ces villes.


Un **système de filtres** permet de sélectionner les données à afficher, on peut donc faire varier de manière intéractive à tout moment et sur n'importe quel graphique :
- Le nombre d'évènements à afficher
- Le type d'entrée des évènements (Tous, Libre, Payant ou non spécifié)
- La fourchette de dates dans lequel se situent les évènements
- La zone géographique (Région, Département, Ville)


Installation
-

Pré-requis :
- Assurez-vous d'avoir d'abord install node et npm dans votre terminal
- Installez ensuite le projet à l'aide de la commande :
```sh
npm install

```
- Démarrez l'application :
```sh
npm start
```

- Vous devriez être redirigé vers l'adresse suivante, si ce n'est pas le cas accédez-y dans votre navigateur web :
```sh
localhost:3000
```

Projet M2 MBDS Nice Sophia Antipolis - Promo 2018/2019 - Enseignant: Marco Winckler - Langage : React, D3js
