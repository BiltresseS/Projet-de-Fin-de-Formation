USE pff_sbiltresse_webapps23;

SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE `pff_sbiltresse_webapps23`.`tests`;
TRUNCATE `pff_sbiltresse_webapps23`.`tests_consoles`;
TRUNCATE `pff_sbiltresse_webapps23`.`tests_genres`;
TRUNCATE `pff_sbiltresse_webapps23`.`tests_upvotes`;
TRUNCATE `pff_sbiltresse_webapps23`.`consoles`;
TRUNCATE `pff_sbiltresse_webapps23`.`developpers`;
TRUNCATE `pff_sbiltresse_webapps23`.`distributers`;
TRUNCATE `pff_sbiltresse_webapps23`.`gallery`;
TRUNCATE `pff_sbiltresse_webapps23`.`genres`;

SET FOREIGN_KEY_CHECKS = 1;

insert into consoles (id, name)
VALUES
(1, "Magnavox Odissey"),
(2, "Pong"),
(3, "Coleco Telstar"),
(4, "Fairchild Channel F"),
(5, "Atari 2600"),
(6, "Mattel intellivision"),
(7, "Sega Master System"),
(8, "Atari 7800"),
(9, "Nintendo Intertainment System"),
(10, "NEC TurboGrafx-16"),
(11, "Sega Genesis/MegaDrive"),
(12, "DNK NeoGeo"),
(13, "Super Nintendo Entertainment System"),
(14, "Sega Saturn"),
(15, "Sony Playstation"),
(16, "Nintendo 64"),
(17, "Sega Dreamcast"),
(18, "Sony Playstation 2"),
(19, "Nintendo GameCube"),
(20, "Microsoft Xbox"),
(21, "Microsoft Xbox 360"),
(22, "Sony Playstation 3"),
(23, "Nintendo Wii"),
(24, "Nintendo Wii U"),
(25, "Sony Playstation 4"),
(26, "Microsoft Xbox One"),
(27, "Nintendo Switch"),
(28, "Microsoft Xbox Series X/S"),
(29, "Sony Playstation 5"),
(30, "PC");

insert into developpers (id, name)
VALUES
(1, "Sonic Team"),
(2, "Nintendo"),
(3, "Naughty Dog");

insert into distributers (id, name)
VALUES
(1, "SEGA"),
(2, "Nintendo"),
(3, "Sony Computer Entertainment");

insert into genres (id, name)
VALUES
(1, "Plateforme"),
(2, "FPS"),
(3, "TPS"),
(4, "Combat"),
(5, "Beat'em up"),
(6, "Infiltration"),
(7, "Survie"),
(8, "Rythme"),
(9, "Horror"),
(10, "Metroidvania"),
(11, "Text adventure"),
(12, "Visual novel"),
(13, "FMV"),
(14, "Puzzle"),
(15, "RPG"),
(16, "MMO"),
(17, "Roguelike"),
(18, "Tactical"),
(19, "Arcade"),
(20, "Simulation"),
(21, "Course"),
(22, "RTS"),
(23, "MOBA"),
(24, "Tower defense"),
(25, "TBS"),
(26, "Sport"),
(27, "Party game"),
(28, "Sandbox"),
(29, "Aventure"),
(30, "Action");

insert into tests (id, title, cover, `developpeurId`, `distributerId`, dateSortieJAP, dateSortieUS, dateSortiePAL, resume, test, note, `authorId`)
VALUES
(1, "Sonic Frontiers", "https://fr.wikipedia.org/wiki/Sonic_Frontiers#/media/Fichier:Sonic_Frontiers_logo.webp", 1, 1, "08/11/2022", "08/11/2022", "08/11/2022", 'Sonic Frontiers est un jeu de plateforme et d''action-aventure en 3D. Le joueur, en tant que Sonic, explore les îles Starfall, qui comprennent divers biomes, notamment des champs fleuris, des forêts, des ruines antiques et des déserts. L''histoire commence lorsque Sonic, Miles "Tails" Prower et Amy Rose sont aspirés par un trou de ver et que Sonic est perdu sur une île mystérieuse, séparée de Tails et Amy. Une intelligence artificielle guide le joueur alors qu''il cherche à collecter les Émeraudes du Chaos et à retrouver Amy et Tails.', 'Sonic conserve ses capacités des précédents jeux Sonic the Hedgehog : il court à grande vitesse, récupère des anneaux, grince sur des rails et se concentre sur les ennemis à attaquer. Le joueur peut faire un double saut, esquiver à l''aide des boutons d''épaule de sa manette de jeu et accélérer avec la gâchette droite s''il a suffisamment d''énergie. Les nouvelles capacités incluent les attaques de combat, courir le long des murs et utiliser le Cyloop pour créer un cercle de lumière autour des objets et interagir avec eux. Le joueur peut personnaliser les commandes et ajuster la vitesse, les virages, l''accélération et la résistance de Sonic, et peut améliorer la vitesse, les attaques, la défense et la capacité des anneaux de Sonic au fur et à mesure de sa progression.

Les îles Starfall agissent comme le premier monde ouvert de la série. Le monde ouvert conserve les éléments Sonic traditionnels, tels que les ressorts, les pads de suralimentation et les rails de broyage. Le joueur explore les îles alors qu''il escalade des tours dans des défis de plate-forme pour révéler des parties de la carte et résout des énigmes, y compris l''orientation de statues et le speedrun, pour collecter des objets. Les objets de collection incluent des Kocos, qui améliorent l''ensemble de mouvements de Sonic, et des jetons de mémoire, qui sauvent les amis de Sonic. La quête principale prend 20 à 30 heures, tandis que trouver tous les objets de collection prend jusqu''à 60 heures.

Le joueur combat des robots à travers les îles ; Sonic peut esquiver et parer les attaques et utiliser le Cyloop pour rendre les ennemis plus faciles à frapper. Vaincre des ennemis accorde au joueur des points d''expérience qui lui permettent d''acheter des capacités supplémentaires. Aux côtés de petits ennemis réguliers, le joueur combat de grands boss qu''il doit escalader pour attaquer. Les boss fournissent au joueur des éléments d''un portail qui, une fois assemblés, lui permettent d''entrer dans le "Cyber Space" - des niveaux courts et linéaires similaires à ceux des précédents jeux Sonic (tant sur le décor que sur la structuration des niveaux). Les niveaux linéaires, qui alternent entre les perspectives à la troisième personne et à défilement latéral, contiennent plusieurs objectifs, y compris l''attaque contre la montre et la collecte d''anneaux rouges, et récompensent les joueurs avec une clé requise pour collecter une Émeraude du Chaos. Certains présentent des défis uniques, comme un mini-jeu de pêche organisé par Big the Cat.', 19, 1),
(2, "The Legend of Zelda: Breath of the Wild", "https://fr.wikipedia.org/wiki/The_Legend_of_Zelda:_Breath_of_the_Wild#/media/Fichier:The_Legend_of_Zelda_Breath_of_the_Wild_Logo.png", 2, 2, "03/03/2017", "03/03/2017", "03/03/2017", 'The Legend of Zelda: Breath of the Wild (ou simplement Breath of the Wild, parfois abrégé BotW) est un jeu d''action-aventure développé par la division Nintendo EPD, assisté par Monolith Soft, et publié par Nintendo le 3 mars 2017 sur Nintendo Switch lors du lancement de la console, ainsi que sur Wii U dont il est le dernier jeu produit par Nintendo. C''est le dix-neuvième jeu de la franchise The Legend of Zelda.', 'Breath of the Wild propose d''incarner Link, amnésique, réveillé après un long sommeil d''une centaine d''années par une mystérieuse voix qui le guide afin d''éliminer Ganon, « Le Fléau », et restaurer la paix dans le royaume d''Hyrule. À l''instar du premier jeu de la série sorti en 1986, le joueur reçoit peu d''instructions et peut librement explorer un univers en monde ouvert, en résolvant différentes quêtes, sanctuaires et énigmes, en plus de la tâche principale.

L''un des objectifs majeurs de cet épisode fixé par l''équipe de développement est de repenser les conventions de la série. Le jeu propose ainsi de nouvelles mécaniques de gameplay, comme l''implémentation d''un moteur physique complet pour la gestion des objets et de l''environnement, des voix off pour les personnages principaux, mais aussi des visuels en haute définition. L''univers de Breath of the Wild n''est pas structuré linéairement et est conçu pour récompenser l''exploration, l''histoire pouvant ainsi être suivie de manière non linéaire.

Lors de sa sortie, le jeu est encensé par la critique. Malgré quelques faiblesses techniques et des visuels en deçà de ceux des jeux des consoles concurrentes, il est ovationné pour sa direction artistique, la démesure de son monde ouvert et de son contenu, la qualité des musiques et l''ingéniosité des énigmes. Le jeu reçoit différentes récompenses en 2016 et 2017, dont le prix du jeu de l''année aux Game Awards 2017. Au 30 juin 2021, il s''est écoulé à 24,89 millions d''exemplaires, dont 23,20 millions sur Nintendo Switch et 1,69 million sur Wii U, ce qui fait de lui le jeu le plus vendu de la franchise. Une suite intitulée The Legend of Zelda: Tears of the Kingdom est annoncée pendant l''E3 2019 et sortie en mai 2023.', 18, 5);

insert into gallery (id, url, commentaire, `testId`)
VALUES
(1, "https://upload.wikimedia.org/wikipedia/en/3/33/Sonic_Frontiers_gameplay_screenshot.png", "Sonic engages in combat with robots in the open world, using the new Cyloop ability", 1),
(2, "https://upload.wikimedia.org/wikipedia/commons/2/23/Sleeping_With_Sirens_-_Collide_with_the_sky_tour_01_%28cropped%29.jpg", "Sleeping with Sirens vocalist Kellin Quinn features in three songs on the soundtrack", 1),
(3, "https://upload.wikimedia.org/wikipedia/commons/6/69/AlpediSiusi_panorama2.JPG", "L'univers de Breath of the Wild est principalement constitué de plaines et de montagnes...", 2),
(4, "https://upload.wikimedia.org/wikipedia/commons/d/d1/BOTW_%2835018356406%29.jpg", "L'Épée de légende est enfouie dans les Bois Perdus.", 2),
(5, "https://upload.wikimedia.org/wikipedia/commons/8/8b/Rupees_zelda.svg", "Des rubis, devise utilisée dans le royaume d'Hyrule.", 2);

insert into tests_consoles (test_id, console_id)
VALUES
(1, 27),
(1, 29),
(1, 26),
(1, 28),
(2, 24),
(2, 27);

insert into tests_genres (test_id, genre_id)
VALUES
(1, 29),
(1, 1),
(2, 30),
(2, 29);

insert into tests_upvotes (test_id, user_id)
VALUES
(1, 1),
(1, 4),
(1, 5),
(2, 2),
(2, 3),
(2, 4),
(2, 5),
(2, 6);