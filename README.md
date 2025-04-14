# Productos

### Enlace de la página
[Productos](https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch)

### Proyecto usando el método fetch

Este proyecto se enfoca principalmente en el manejo del método"fetch()".
Este método tiene como objetivo el regreso o la busqueda de recursos mediante la red a través de una "Promise" (Promesa).
Para manejo de este método se utilizó la API de `https://fakestoreapi.com` la cuál regresa una lista de productos de forma de arreglo (array).

#### Opciones en el método
Puede tener una lista de opciones, por default este método utiliza como base el método "GET" pero se puede declarar de la siguiente manera.

```javascript
const options = {"method": "GET"};
fetch(URLMain+cat, options)
```

#### Creacion de cartas representativas de los productos

La creación de las tarjetas de los productos funciona gracias a la función "createCards" que se manda a llamar dentro de la función "getData()", la cuál
al estar usando el método "fetch()", su respuesta se permite regresar en formato JSON y nuevamente en forma de promesa.

De esta manera la manipulacion de la información de la API se facilitará gracias a que la respuesta del método fetch() puede manejar formatos JSON.

> getData()

```javascript
function getData(cat){
    const options = {"method": "GET"};
    fetch(URLMain+cat, options)
                .then((response) =>{
                    console.log(response);
                    response.json().then((res) => {
                        createCards(res);
                    });
                    
                })
                .catch((err)=> {
                    main.insertAdjacentHTML("beforeend",
                        `<div class="alert alert-danger" role="alert">
                            ${err.message}
                        </div>`);
                });

}//getData()
```

> createCards()

```javascript
//Creamos las cartas en el HTML
function createCards(prods){

    mainProds.innerHTML="";

    for (let i = 0; i < prods.length; i++) {
        
        const producto = prods[i];
        const modalId = `modal-${producto.id}`;

        mainProds.insertAdjacentHTML("beforeend",
            `<div class="col-sm">
                <div class="card mx-auto" style="width: 18rem;">
                    <img src="${producto.image}" class="card-img-top" alt="${producto.title}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.title}</h5>
                        <p class="card-text"> - ${producto.category} - </p>
                        <p class="card-text">${producto.description.slice(0, 100)}...</p>
                        <p class="card-text">${producto.rating.rate}</p>

                        <!-- Button trigger modal -->
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${modalId}">
                        More info
                        </button>

                        <!-- Modal -->
                        <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="${modalId}" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="${modalId}">${producto.title}</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                    ${producto.description}
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary">$${producto.price}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`);
    }
}//createCards
```

> Visualización de la página.

![index_productos](https://raw.githubusercontent.com/FredyA13/Productos/refs/heads/main/imagenes/index_productos.jpeg)

### Referencias

* [https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch](https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch)
* [https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
* [https://fakestoreapi.com](https://fakestoreapi.com)