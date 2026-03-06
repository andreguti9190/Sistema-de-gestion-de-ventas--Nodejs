# Sistema de gestion de ventas (NodeJS, Express)

Una REST API desarrollada en Node.js y Express que permite gestionar órdenes de compra, incluyendo operaciones de creación, consulta, actualización y eliminación de registros en la base de datos.
>[!NOTE] 
> 🔒 Necesita ser autenticado 

## Enpoints
### Método POST `/signup`
Este en endpoint se encarga de registrar un usuario con el username, email y password, y te devuelve una accessToken si no esta registrado
```json
{
  "username":"manuelito",
  "email":"manuelito@gamer.com",
  "password":"sosaltogroso123"
}
```

### Método POST `/login`
Este en endpoint se encarga de logear a un usuario con el username, email y password, y te devuelve una accessToken si esta correcto
```json
{
  "username":"manuelito",
  "email":"manuelito@gamer.com",
  "password":"sosaltogroso123"
}
```

### Método POST `/logout`
Este en endpoint se encarga de deslogear a un usuario 

### Método POST `/categories` 🔒
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
### Método DELETE `/categories/:id` 🔒
Este endpoint se encarga de eliminar una categoria en concreto pasando el id en la url, en caso de haber un producto con esta categoria mandara un error con el id del producto
```json
{
  "error": false,
  "msg": "Categorie deleted successfully"
}
```
>[!CAUTION]
>```json
>// error
>{
>  "error": true,
>  "msg": "there are products with this category",
>  "productList": [
>    {
>      "id": "1373fe00-14e4-11f1-9fcd-2418c6c96a00"
>    }
>  ]
>}
>```
### Método POST `/products` 🔒
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
### Método PATCH `/products/:id` 🔒
Este endpoint se encarga de acutalizar un producto pasando los parametros que va a actualizar
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
### Método DELETE `/products/:id` 🔒
Este endpoint se encarga de eliminar un producto en concreto pasando el id en la url, en caso de existir una orden de compra el producto mandara un error con el id del detalle de compra y el id de la compra
```json
// Respuesta del método
{
  "error": false,
  "msg": "Product deleted successfully"
}
```
>[!CAUTION]
>```json
>{
>  "error": true,
>  "msg": "there are sales with this product",
>  "salesList": [
>    {
>      "idSaleDetails": "4033e9a1-5858-44c9-b1d7-39c718933372",
>      "idSale": "878d89a7-a1a1-4411-a359-1ad08965fb30"
>    }
>  ]
>}
>```
### Método POST `/clients` 🔒
En este endpoint se encarga de crear los clientes los cuales son los que hacen las ordenes de compra
```json
// Contenido del body
{
  "name":"Mark Zuckemberg",
  "email":"markz@facebook.com"
}
```
### Método GET `/clients` 🔒
Este endopoint se encarga de conseguir una lista de clientes o un cliente en concreto con toda su información dependiendo su url
#### Caso `/clients/:id` 🔒
En este vas a conseguir un solo cliente solamente pasando el id en la url
```json
{
  "error": false,
  "client": {
    "id": "49a5ddf8-14ce-11f1-9fcd-2418c6c96a00",
    "name": "albert Epstein",
    "email": "albertE@ralatividad.com"
  }
}
```

#### Caso `/clients` 🔒
En este caso va a pasar una lista de clientes
```json
{
  "error": false,
  "listClients": [
    {
      "id": "036c71c5-14e0-11f1-9fcd-2418c6c96a00",
      "name": "Mark Zuckemberg",
      "email": "markz@facebook.com"
    },
    {
      "id": "49a5ddf8-14ce-11f1-9fcd-2418c6c96a00",
      "name": "albert Epstein",
      "email": "albertE@ralatividad.com"
    }
  ]
}
```
### Método PATCH `/clients/:id` 🔒
Este endpoint se encarga de acutalizar un cliente pasando los parametros que va a actualizar
```json
/* Contenido del body
 todos los campos son opcionales */
{
  "name":"Mark Zuckemberg",
  "email":"markzuck@facebook.com"
}
```
### Método DELETE `/clients/:id` 🔒
Este endpoint se encarga de eliminar un cliente en concreto pasando el id en la url, en caso de tener una compra asociada a este cliente se mandar un error con el id de las compras que realizo
```json
{
  "error": false,
  "msg": "Client deleted successfully"
}
```
>[!CAUTION]
>```json
>{
>  "error": true,
>  "msg": "there are sales with this client",
>  "saleList": [{
>      "idSale": "878d89a7-a1a1-4411-a359-1ad08965fb30"
>    }]
>}
>```
### Método POST `/sales`🔒
Este enpoint se encarga de crear una orden de compra donde se ingresa los productos comprados y se disminuira en el stock, en caso de pedir mas que el stock mandara error
```json
{ 
  "clientId":"036c71c5-14e0-11f1-9fcd-2418c6c96a00",
  "ordenDetails":[{
    "productId":"1373fe00-14e4-11f1-9fcd-2418c6c96a00",
    "quantity": 10
    }] 
}
```
`/products/1373fe00-14e4-11f1-9fcd-2418c6c96a00`
```json
// Antes
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
```json
// Despues
{
  "error": false,
  "msg": "Product got sucessfully",
  "product": {
    "id": "1373fe00-14e4-11f1-9fcd-2418c6c96a00",
    "name": "Coca cola",
    "description": "Bebida gasificada de 2ltr",
    "price": "3000.00",
    "stock": 30,
    "category_id": 1,
    "created_at": "2026-02-28T20:28:43.000Z",
    "updated_at": "2026-02-28T20:31:28.000Z"
  }
}
```
### Método GET `/sales` 🔒
Este endopoint se encarga de conseguir una lista de clientes o un cliente en concreto con toda su información dependiendo su url
#### Caso `/sales/:id` 🔒
En este vas a conseguirla orden de compra con todos los productos pasando el id en la url
```json
{
  "error": false,
  "data": [
    {
      "idSales": "4e42fc03-edf3-4212-afb5-47e9ae8400a4",
      "idSalesDetails": "1b71fff6-ca67-424d-a391-f14b0a63d8ec",
      "clientsId": "036c71c5-14e0-11f1-9fcd-2418c6c96a00",
      "clientsName": "Mark Zuckemberg",
      "idProduct": "1eeeaded-14e6-11f1-9fcd-2418c6c96a00",
      "nameProduct": "Ptusas",
      "quantity": 30,
      "price": "1200.00",
      "total": "36000.00"
    },
    {
      "idSales": "4e42fc03-edf3-4212-afb5-47e9ae8400a4",
      "idSalesDetails": "bc7ff6f2-d092-46fa-a893-71c860c2a69d",
      "clientsId": "036c71c5-14e0-11f1-9fcd-2418c6c96a00",
      "clientsName": "Mark Zuckemberg",
      "idProduct": "2cfba483-14e6-11f1-9fcd-2418c6c96a00",
      "nameProduct": "Pepsi",
      "quantity": 50,
      "price": "5000.00",
      "total": "250000.00"
    }
  ]
}
```

#### Caso `/sales` 🔒
En este caso va a pasar todos los detalles de la ordenes de compra 
```json
{
  "error": false,
  "data": [
    {
      "idSales": "4e42fc03-edf3-4212-afb5-47e9ae8400a4",
      "idSalesDetails": "1b71fff6-ca67-424d-a391-f14b0a63d8ec",
      "clientsId": "036c71c5-14e0-11f1-9fcd-2418c6c96a00",
      "clientsName": "Mark Zuckemberg",
      "idProduct": "1eeeaded-14e6-11f1-9fcd-2418c6c96a00",
      "nameProduct": "Ptusas",
      "quantity": 30,
      "price": "1200.00",
      "total": "36000.00"
    },
    {
      "idSales": "878d89a7-a1a1-4411-a359-1ad08965fb30",
      "idSalesDetails": "4033e9a1-5858-44c9-b1d7-39c718933372",
      "clientsId": "036c71c5-14e0-11f1-9fcd-2418c6c96a00",
      "clientsName": "Mark Zuckemberg",
      "idProduct": "1373fe00-14e4-11f1-9fcd-2418c6c96a00",
      "nameProduct": "Coca cola",
      "quantity": 10,
      "price": "3000.00",
      "total": "30000.00"
    },
    {
      "idSales": "4e42fc03-edf3-4212-afb5-47e9ae8400a4",
      "idSalesDetails": "bc7ff6f2-d092-46fa-a893-71c860c2a69d",
      "clientsId": "036c71c5-14e0-11f1-9fcd-2418c6c96a00",
      "clientsName": "Mark Zuckemberg",
      "idProduct": "2cfba483-14e6-11f1-9fcd-2418c6c96a00",
      "nameProduct": "Pepsi",
      "quantity": 50,
      "price": "5000.00",
      "total": "250000.00"
    }
  ]
}
```
### Método PATCH `/sales/:id` 🔒
Este endpoint se encarga de acutalizar la orden pasando el id del detalle de la compra y los parametros que va a actualizar
```json
{
  // opcionales son los campos
    "productId":"1373fe00-14e4-11f1-9fcd-2418c6c96a00",
    "quantity":20
}
```
### Método DELETE `/sales/:id` 🔒
Este endopint se encarga de eliminar la orden de compra pasando el id de la orden

- Ruta ejecutada `/sales/4e42fc03-edf3-4212-afb5-47e9ae8400a4
 DELETE`
- Resultados de `/sales GET`
```json
// Antes
{
  "error": false,
  "data": [
    {
      "idSales": "4e42fc03-edf3-4212-afb5-47e9ae8400a4",
      "idSalesDetails": "1b71fff6-ca67-424d-a391-f14b0a63d8ec",
      "clientsId": "036c71c5-14e0-11f1-9fcd-2418c6c96a00",
      "clientsName": "Mark Zuckemberg",
      "idProduct": "1373fe00-14e4-11f1-9fcd-2418c6c96a00",
      "nameProduct": "Coca cola",
      "quantity": 20,
      "price": "3000.00",
      "total": "60000.00"
    },
    {
      "idSales": "878d89a7-a1a1-4411-a359-1ad08965fb30",
      "idSalesDetails": "4033e9a1-5858-44c9-b1d7-39c718933372",
      "clientsId": "036c71c5-14e0-11f1-9fcd-2418c6c96a00",
      "clientsName": "Mark Zuckemberg",
      "idProduct": "1373fe00-14e4-11f1-9fcd-2418c6c96a00",
      "nameProduct": "Coca cola",
      "quantity": 10,
      "price": "3000.00",
      "total": "30000.00"
    },
    {
      "idSales": "4e42fc03-edf3-4212-afb5-47e9ae8400a4",
      "idSalesDetails": "bc7ff6f2-d092-46fa-a893-71c860c2a69d",
      "clientsId": "036c71c5-14e0-11f1-9fcd-2418c6c96a00",
      "clientsName": "Mark Zuckemberg",
      "idProduct": "2cfba483-14e6-11f1-9fcd-2418c6c96a00",
      "nameProduct": "Pepsi",
      "quantity": 50,
      "price": "5000.00",
      "total": "250000.00"
    }
  ]
}
```
```json
// Despues
{
  "error": false,
  "data": [
    {
      "idSales": "878d89a7-a1a1-4411-a359-1ad08965fb30",
      "idSalesDetails": "4033e9a1-5858-44c9-b1d7-39c718933372",
      "clientsId": "036c71c5-14e0-11f1-9fcd-2418c6c96a00",
      "clientsName": "Mark Zuckemberg",
      "idProduct": "1373fe00-14e4-11f1-9fcd-2418c6c96a00",
      "nameProduct": "Coca cola",
      "quantity": 10,
      "price": "3000.00",
      "total": "30000.00"
    }
  ]
}
```
