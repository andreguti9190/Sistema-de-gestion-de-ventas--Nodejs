# Sistema de gestion de ventas (NodeJS, Express)

Una REST API desarrollada en Node.js y Express que permite gestionar usuarios y órdenes de compra, incluyendo operaciones de creación, consulta, actualización y eliminación de registros en la base de datos.

## Enpoints
### Método POST `/categories`
Este endpoint se encargar de crear una categoria solamente pasando el nombre con un minimo de 3 letras, en caso de no pasarlo, no respetando la regla o que exista mandar un error
```json
// Respuesta satisfactoria
{
  "error": false,
  "msg": "categorie was created sucessfully"
}
```
>[!CAUTION]
> ```json
> // Respuesta erronea
>{
>   "error": true,
>   "msg": "categorie name exist" // Aca va el mensaje de error
> }
> ```
### Método GET `/categories`
Este endopoint se encarga de conseguir una lista de categorias o una categoria en concreto con toda su información dependiendo su url
#### Caso `/categories/:id`
En este vas a conseguir una sola categoria solamente pasando el id en la url
```json
{
  "error": false,
  "msg": "Categorie got sucessfully",
  "categorie": {
    "id": 1,
    "name": "bebidas",
    "created_at": "2026-02-28T14:50:19.000Z"
  }
}
```

#### Caso `/categories`
En este caso va a pasar una lista de categorias
```json
{
  "error": false,
  "categorieList": [
    {
      "id": 1,
      "name": "bebidas",
      "created_at": "2026-02-28T14:50:19.000Z"
    },
    {
      "id": 2,
      "name": "alfajores",
      "created_at": "2026-02-28T15:03:53.000Z"
    },
    {
      "id": 3,
      "name": "galletas",
      "created_at": "2026-02-28T15:04:00.000Z"
    }
  ]
}
```
### Método DELETE `/categories/:id`
Este endpoint se encarga de eliminar una categoria en concreto pasando el id en la url
```json
{
  "error": false,
  "msg": "Categorie deleted successfully"
}
```