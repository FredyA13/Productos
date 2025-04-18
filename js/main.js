const main = document.getElementsByTagName("main").item(0);
const ulMenu = document.getElementById("ulMenu");
const mainProds= document.getElementById("mainProds");
const URLMain = "https://fakestoreapi.com/products/";
//const URLMainCategories = "https://fakestoreapi.com/products/categories";

function getData(cat){
    //El tipo de metodo que se puede utilizar
    const options = {"method": "GET"};
    //The fetch() method of the Window interface starts the process of fetching a resource from the network, returning a promise that is fulfilled once the response is available.
    //https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch
    //https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    //Según sea el caso, "cat" puede tomar una categoría o puede ser todas, osea:
        // 1. https://fakestoreapi.com/products/
        // 2. https://fakestoreapi.com/products/category/jewerly (o cualquier categoría de la API)
    fetch(URLMain+cat, options)
                .then((response) =>{
                    console.log(response);
                    //Nos va a regrar un json de manera de promesa. El problema es que no sabemos el tamaño y el tiempo
                    response.json().then((res) => {
                        //mostramos la longitud que tiene el arreglo, 20 objetos de tipo JSON
                        //console.log(res.length);
                        //Mostramoss el titulo del objeto que queremos
                        //console.log(res[0].title);

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

function getCategories(){
    //El tipo de metodo que se puede utilizar
    const options = {"method": "GET"};
    //Le agregamos la extension de categories
    fetch(URLMain+"categories/", options)
                .then((response) =>{
                    console.log(response);
                    //Nos va a regrar un json de manera de promesa. El problema es que no sabemos el tamaño y el tiempo
                    response.json().then((res) => {
                        //console.log("categories:", res);
                        res.forEach((cat) => {
                            ulMenu.insertAdjacentHTML("afterbegin",
                                //Le agregamos un metodo "onclick", el cual manda a llamar al metodo getData para mostrar las cards de la categoria
                                //usamos "replace" para remplazar " ' " por "%27"
                                `<li><a class="dropdown-item" style="cursor: pointer;" onclick="getData('category/${(cat.replace("'","%27"))}');">${cat}</a></li>`);
                        });
                    });
                })
                .catch((err)=> {
                    main.insertAdjacentHTML("beforeend",
                        `<div class="alert alert-danger" role="alert">
                            ${err.message}
                        </div>`);
                });

}//getCategories()

getCategories();
getData("");

//Creamos las cartas en el HTML
function createCards(prods){

    //Limpiamos las tarjetas, y mostrará las tarjetas según la categoría
    mainProds.innerHTML="";

    for (let i = 0; i < prods.length; i++) {
        
        const producto = prods[i];
        const modalId = `modal-${producto.id}`;

        mainProds.insertAdjacentHTML("beforeend",
            //`<div class="col-sm">
                `<div class="card" style="width: 18rem;">
                    <img src="${producto.image}" class="card-img-top" alt="${producto.title}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.title}</h5>
                        <p class="card-text" style="font-weight: bold;"> - ${producto.category} - </p>
                        <p class="card-text">${producto.description.slice(0, 100)}...</p>
                        <p class="card-text">${producto.rating.rate}</p>

                        <!-- Button trigger modal -->
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${modalId}">
                        Más info
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
                                        <div>
                                            <p style="text-align: right; font-weight: bold;">$${producto.price} USD</p>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`);
            //</div>`);
    }
}//createCards

