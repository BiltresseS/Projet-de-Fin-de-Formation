USE pff_sbiltresse_webapps23;

SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE `pff_sbiltresse_webapps23`.`ranks`;
TRUNCATE `pff_sbiltresse_webapps23`.`users`;

SET FOREIGN_KEY_CHECKS = 1;

insert into ranks (id, `rank`)
VALUES
(1, "Meister"),
(2, "Admin communautaire"),
(3, "Testeur"),
(4, "Abonné");
-- insert into users (id, avatar, login, mail, mdp, bio, `rankId`)
-- VALUES
-- (1, "img", "SebMasta", "s.biltresse@gmail.com", "Craquez-moiça_04", "Bio en construction", 1),
-- (2, "img", "Pierre", "r.wetterene@gmail.com", "C'estMoiPierre42", "Bio en construction", 2),
-- (3, "img", "Nando", "f.biaccalli@gmail.com", "1briqueAprèsL'autre", "Bio en construction", 2),
-- (4, "img", "Inked_monkey", "n.decuyper@gmail.com", "C'estPasLaGrandeForme69", "Bio en construction", 3),
-- (5, "img", "Ordinn", "a.benoit@gmail.com", "Odin_Rulez_01", "Bio en construction", 3),
-- (6, "img", "rico_be", "a.bertrand@gmail.com", "Harder_better_faster_stronger2", "Bio en construction", 4),
-- (7, "img", "Enio", "m.el.haddadi@gmail.com", "Oui.0", "Bio en construction", 4);