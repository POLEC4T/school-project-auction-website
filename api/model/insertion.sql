-- ROLE --
INSERT INTO roles(name,"createdAt","updatedAt") values('vendeur',CURRENT_DATE,CURRENT_DATE);
INSERT INTO roles(name,"createdAt","updatedAt") values('acheteur',CURRENT_DATE,CURRENT_DATE);
INSERT INTO roles(name,"createdAt","updatedAt") values('admin',CURRENT_DATE,CURRENT_DATE);

-- USER --
INSERT INTO users(login,password,email,nb_strikes,date_naiss,"createdAt","updatedAt","roleId") values('nathan','azerty','nathan.nathan@gmail.com',1,'2000-01-01',CURRENT_DATE,CURRENT_DATE,1);
INSERT INTO users(login,password,email,nb_strikes,date_naiss,"createdAt","updatedAt","roleId") values('milo','123456','milo.olim@gmail.com',0,'2001-12-25',CURRENT_DATE,CURRENT_DATE,1);
INSERT INTO users(login,password,email,nb_strikes,date_naiss,"createdAt","updatedAt","roleId") values('etienne','poiuy','eti.enne@gmail.com',2,'2003-11-03',CURRENT_DATE,CURRENT_DATE,1);
INSERT INTO users(login,password,email,nb_strikes,date_naiss,"createdAt","updatedAt","roleId") values('lilian','zqsd','lil.yann@gmail.com',0,'2003-03-01',CURRENT_DATE,CURRENT_DATE,1);
INSERT INTO users(login,password,email,nb_strikes,date_naiss,"createdAt","updatedAt","roleId") values('adrien','ytreza','adrien.ad@gmail.com',1,'2002-06-29',CURRENT_DATE,CURRENT_DATE,1);
INSERT INTO users(login,password,email,nb_strikes,date_naiss,"createdAt","updatedAt","roleId") values('alexis','123abc','alexis.lebg@gmail.com',2,'2000-01-01',CURRENT_DATE,CURRENT_DATE,2);
INSERT INTO users(login,password,email,nb_strikes,date_naiss,"createdAt","updatedAt","roleId") values('doigby','tuescapable','om.g@gmail.com',0,'1985-10-20',CURRENT_DATE,CURRENT_DATE,2);
INSERT INTO users(login,password,email,nb_strikes,date_naiss,"createdAt","updatedAt","roleId") values('vladimir','satan2','vladimir.ovitch@gmail.com',0,'1960-08-08',CURRENT_DATE,CURRENT_DATE,2);
INSERT INTO users(login,password,email,nb_strikes,date_naiss,"createdAt","updatedAt","roleId") values('raymond','poooooooooo2','raie.mont@orange.fr',2,'1949-05-14',CURRENT_DATE,CURRENT_DATE,2);
INSERT INTO users(login,password,email,nb_strikes,date_naiss,"createdAt","updatedAt","roleId") values('bob','obo','bob.obo@gmail.com',1,'1999-01-10',CURRENT_DATE,CURRENT_DATE,3);

-- ARTICLE --
INSERT INTO articles(titre,prix_depart,description,"createdAt",expires,couleurs,materiaux,taille,seuil_reserve,"updatedAt","vendeurId") values('cardigan colore',30.0,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eget mi vulputate, pretium turpis eget, pulvinar libero. Vestibulum faucibus arcu ac justo viverra, ac bibendum mi molestie. Ut facilisis vel justo vel consequat. In posuere, libero ut non. ',CURRENT_DATE,CURRENT_DATE+1,'rouge,vert,jaune,bleu,rose','laine','M',40.0,CURRENT_DATE,1);
INSERT INTO articles(titre,prix_depart,description,"createdAt",expires,couleurs,materiaux,taille,seuil_reserve,"updatedAt","vendeurId") values('t-shirt vert',5.0,'t-shirt de couleur verte en coton bio',CURRENT_DATE,CURRENT_DATE+1,'vert','coton','S',8.0,CURRENT_DATE,2);
INSERT INTO articles(titre,prix_depart,description,"createdAt",expires,couleurs,materiaux,taille,seuil_reserve,"updatedAt","vendeurId") values('tricot vintage',10.0,'tricot de grand-mère iconique',CURRENT_DATE,CURRENT_DATE+1,'blanc','laine','XL',20.0,CURRENT_DATE,3);
INSERT INTO articles(titre,prix_depart,description,"createdAt",expires,couleurs,materiaux,taille,seuil_reserve,"updatedAt","vendeurId") values('polaire recyclee',8.0,'polaire conçue avec des bouteilles en plastique recylees',CURRENT_DATE,CURRENT_DATE+1,'noir','polyester','L',15.0,CURRENT_DATE,2);
INSERT INTO articles(titre,prix_depart,description,"createdAt",expires,couleurs,materiaux,taille,seuil_reserve,"updatedAt","vendeurId") values('foulard doux',75.0,'foulard en soie de grande qualite',CURRENT_DATE,CURRENT_DATE+1,'blanc,jaune,noir','soie','S',100.0,CURRENT_DATE,4);
INSERT INTO articles(titre,prix_depart,description,"createdAt",expires,couleurs,materiaux,taille,seuil_reserve,"updatedAt","vendeurId") values('chaussettes de Noël',10.0,'chaussettes pour les fêtes en cachemire',CURRENT_DATE,CURRENT_DATE+1,'blanc,rouge','cachemire','XS',18.0,CURRENT_DATE,5);

-- ENCHERE --
INSERT INTO encheres(montant,date,"createdAt","updatedAt","userId","articleId") values(30.0,CURRENT_DATE,CURRENT_DATE,CURRENT_DATE,1,1);
INSERT INTO encheres(montant,date,"createdAt","updatedAt","userId","articleId") values(5.0,CURRENT_DATE,CURRENT_DATE,CURRENT_DATE,2,2);
INSERT INTO encheres(montant,date,"createdAt","updatedAt","userId","articleId") values(10.0,CURRENT_DATE,CURRENT_DATE,CURRENT_DATE,3,3);
INSERT INTO encheres(montant,date,"createdAt","updatedAt","userId","articleId") values(8.0,CURRENT_DATE,CURRENT_DATE,CURRENT_DATE,4,2);
INSERT INTO encheres(montant,date,"createdAt","updatedAt","userId","articleId") values(100.0,CURRENT_DATE,CURRENT_DATE,CURRENT_DATE,5,4);
INSERT INTO encheres(montant,date,"createdAt","updatedAt","userId","articleId") values(10.0,CURRENT_DATE,CURRENT_DATE,CURRENT_DATE,6,5);

-- IMAGE --
INSERT INTO images(url,"createdAt","updatedAt","articleId") values('https://images.ctfassets.net/hrltx12pl8hq/3j5RylRv1ZdswxcBaMi0y7/b84fa97296bd2350db6ea194c0dce7db/Music_Icon.jpg',CURRENT_DATE,CURRENT_DATE,1);
INSERT INTO images(url,"createdAt","updatedAt","articleId") values('https://images.ctfassets.net/hrltx12pl8hq/3j5RylRv1ZdswxcBaMi0y7/b84fa97296bd2350db6ea194c0dce7db/Music_Icon.jpg',CURRENT_DATE,CURRENT_DATE,1);
INSERT INTO images(url,"createdAt","updatedAt","articleId") values('https://images.ctfassets.net/hrltx12pl8hq/3j5RylRv1ZdswxcBaMi0y7/b84fa97296bd2350db6ea194c0dce7db/Music_Icon.jpg',CURRENT_DATE,CURRENT_DATE,1);
INSERT INTO images(url,"createdAt","updatedAt","articleId") values('https://images.ctfassets.net/hrltx12pl8hq/3j5RylRv1ZdswxcBaMi0y7/b84fa97296bd2350db6ea194c0dce7db/Music_Icon.jpg',CURRENT_DATE,CURRENT_DATE,2);
INSERT INTO images(url,"createdAt","updatedAt","articleId") values('https://images.ctfassets.net/hrltx12pl8hq/3j5RylRv1ZdswxcBaMi0y7/b84fa97296bd2350db6ea194c0dce7db/Music_Icon.jpg',CURRENT_DATE,CURRENT_DATE,3);
INSERT INTO images(url,"createdAt","updatedAt","articleId") values('https://images.ctfassets.net/hrltx12pl8hq/3j5RylRv1ZdswxcBaMi0y7/b84fa97296bd2350db6ea194c0dce7db/Music_Icon.jpg',CURRENT_DATE,CURRENT_DATE,4);
INSERT INTO images(url,"createdAt","updatedAt","articleId") values('https://images.ctfassets.net/hrltx12pl8hq/3j5RylRv1ZdswxcBaMi0y7/b84fa97296bd2350db6ea194c0dce7db/Music_Icon.jpg',CURRENT_DATE,CURRENT_DATE,5);
INSERT INTO images(url,"createdAt","updatedAt","articleId") values('https://images.ctfassets.net/hrltx12pl8hq/3j5RylRv1ZdswxcBaMi0y7/b84fa97296bd2350db6ea194c0dce7db/Music_Icon.jpg',CURRENT_DATE,CURRENT_DATE,6);

-- REPORT --
INSERT INTO reports(motif,date,"createdAt","updatedAt") values('Ce t-shirt est offensant! il y a une inscription dessus qui est grossière!',CURRENT_DATE,CURRENT_DATE,CURRENT_DATE);

-- LIKES --

INSERT INTO likes("createdAt","updatedAt","userId","articleId") values(CURRENT_DATE,CURRENT_DATE,1,1);
INSERT INTO likes("createdAt","updatedAt","userId","articleId") values(CURRENT_DATE,CURRENT_DATE,3,1);
INSERT INTO likes("createdAt","updatedAt","userId","articleId") values(CURRENT_DATE,CURRENT_DATE,2,1);
INSERT INTO likes("createdAt","updatedAt","userId","articleId") values(CURRENT_DATE,CURRENT_DATE,1,2);