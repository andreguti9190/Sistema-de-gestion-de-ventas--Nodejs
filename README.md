# Sistema de gestion de ventas (NodeJS, Express)

Una REST API desarrollada en Node.js y Express que permite gestionar usuarios y órdenes de compra, incluyendo operaciones de creación, consulta, actualización y eliminación de registros en la base de datos.

## Enpoints
### Método POST `/categories`
Este endpoint se encargar de crear una categoria solamente pasando el nombre con un minimo de 3 letras, en caso de no pasarlo, no respetando la regla o que exista mandar un error
```json
// Contenido del body
{
  "name": "bebidas"
}
```
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
### Método POST `/products`
Este endpoint se encargar de crear un product pasando el nombre con un minimo de 3 letras, una descripcion de mas de 10 caracteres, un stock, un precio y categoria(pasada como ID) en caso de no pasarlo, no respetando la regla o que exista mandar un error
```json
// Contenido del body
{
  "name":"Coca cola",
  "description":"Bebida gasificada de 2ltr",
  "stock":40,
  "price":3000,
  "categoriesID":1
}
```
### Método GET `/products`
Este endopoint se encarga de conseguir una lista de productos o un producto en concreto con toda su información dependiendo su url
#### Caso `/products/:id`
En este vas a conseguir un solo producto solamente pasando el id en la url
```json
{
  "error": false,
  "msg": "Product got sucessfully",
  "product": {
    "id": "b6da7bbc-14b9-11f1-9fcd-2418c6c96a00",
    "name": "Coca cola",
    "description": "Bebida gasificada de 2ltr",
    "price": "3000.00",
    "stock": 40,
    "category_id": 1,
    "created_at": "2026-02-28T15:25:29.000Z",
    "updated_at": "2026-02-28T15:25:29.000Z"
  }
}
```

#### Caso `/products`
En este caso va a pasar una lista de productos
```json
[
  {
    "id": "ad996ed3-14bb-11f1-9fcd-2418c6c96a00",
    "name": "Pitusas",
    "description": "Galletas de chocolate rellenas",
    "price": "1200.00",
    "stock": 90,
    "category_id": 5,
    "created_at": "2026-02-28T15:39:32.000Z",
    "updated_at": "2026-02-28T15:39:32.000Z"
  },
  {
    "id": "b6da7bbc-14b9-11f1-9fcd-2418c6c96a00",
    "name": "Coca cola",
    "description": "Bebida gasificada de 2ltr",
    "price": "3000.00",
    "stock": 40,
    "category_id": 1,
    "created_at": "2026-02-28T15:25:29.000Z",
    "updated_at": "2026-02-28T15:25:29.000Z"
  }
]
```
### Método PATCH `/products/:id`
Este endpoint se encarga de acutalizar un producto pasando los parametros q va a actualizar
```json
/* Contenido del body
 todos los campos son opcionales */
{
  "name":"Coca cola",
  "description":"Bebida gasificada de 2ltr",
  "stock":40,
  "price":3000,
  "categoriesID":1
}
```
### Método DELETE `/products/:id`
Este endpoint se encarga de eliminar un producto en concreto pasando el id en la url
```json
// Respuesta del método
{
  "error": false,
  "msg": "Product deleted successfully"
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