# laborecettes-api



Ouvrez Postman et procédez aux tests suivants :

GET /api/items  


Méthode : GET  
URL : http://localhost:3000/api/items  
Résultat attendu : un tableau JSON (initialement vide) avec le statut 200.

POST /api/items  


Méthode : POST  
URL : http://localhost:3000/api/items  
Dans l’onglet Body, sélectionnez “raw” et “JSON” et insérez par exemple :

json


{
       "title": "Spaghetti Bolognese",
       "ingredients": ["spaghetti", "tomato", "beef"]
     }
Résultat attendu : un objet JSON contenant le nouvel item avec un id auto-incrémenté et une date de création, statut 201.  
Si vous omettez un champ obligatoire (par exemple, "title"), l’API renverra une erreur 400.

GET /api/items/:id  


Testez avec l’id généré lors de la création pour vérifier la récupération de l’élément.

PUT /api/items/:id  


Méthode : PUT  
URL : http://localhost:3000/api/items/1 (si l’id est 1)  
Dans Body, envoyez la mise à jour (en veillant à respecter la validation) :

json


{
       "title": "Spaghetti Bolognaise (mis à jour)",
       "ingredients": ["spaghetti", "tomato", "minced beef"]
     }
Résultat attendu : renvoi de l’item mis à jour avec un statut 200.
DELETE /api/items/:id  
Méthode : DELETE  
URL : http://localhost:3000/api/items/1  
Résultat attendu : un message de succès et le statut 200, ou une erreur 404 si l’item n’existe pas.
