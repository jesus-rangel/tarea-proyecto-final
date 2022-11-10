/******* INTEGRANTES *******/
// * Jesus Rangel
// * Bastian Ceron
// * David Zegarra
// * Alexander Millano

// let btnViewProducts = document.getElementById("btnViewProducts");
// let btnViewProductsM = document.getElementById("btnViewProductsM");
let btnPaginacion = document.getElementById("btnPaginacion");
let btnAnterior = document.getElementById("btnAnterior");
let btnSiguiente = document.getElementById("btnSiguiente");
let cart = document.getElementById("cart");
let itemsCart = document.getElementById("itemsCart");
let mainViewCart = document.getElementById("mainViewCart");
let bodyDom = document.querySelector("body");

const isOk = true;
let limite = 20;
let pagina = 0;
let state = {
  products: [],
  cart: [],
};
const productos = [
  {
    id: "1",
    title: "Lentes de Sol Calvin Klein Plateado",
    price: 100,
    stock: 10,
    thumbnail:
      "https://www.schilling.cl/media/catalog/product/cache/f0863b93965a9ef2fa85fc190d594c75/2/0/2048319-1.jpg",
  },
  {
    id: "2",
    title: "Lentes de Sol Harley Davidson Gris",
    price: 200,
    stock: 20,
    thumbnail:
      "https://www.schilling.cl/media/catalog/product/cache/f0863b93965a9ef2fa85fc190d594c75/2/0/2050857-1.jpg",
  },
  {
    id: "3",
    title: "Lentes de Sol Ferraro  Negro",
    price: 300,
    stock: 30,
    thumbnail:
      "https://www.schilling.cl/media/catalog/product/cache/f0863b93965a9ef2fa85fc190d594c75/2/0/2045989-1.jpg",
  },
  {
    id: "4",
    title: "Lentes de Sol Ferraro Azul",
    price: 300,
    stock: 30,
    thumbnail:
      "https://www.schilling.cl/media/catalog/product/cache/f0863b93965a9ef2fa85fc190d594c75/2/0/2045947-1_1.jpg",
  },
  {
    id: "5",
    title: "Lentes de Sol Timberland Gris",
    price: 300,
    stock: 30,
    thumbnail:
      "https://www.schilling.cl/media/catalog/product/cache/f0863b93965a9ef2fa85fc190d594c75/2/0/2050946-1.jpg",
  },
  {
    id: "6",
    title: "Lentes de Sol Benetton Gris",
    price: 300,
    stock: 30,
    thumbnail:
      "https://www.schilling.cl/media/catalog/product/cache/f0863b93965a9ef2fa85fc190d594c75/2/0/2052508-1_1.jpg",
  },
  {
    id: "7",
    title: "Lentes de Sol Pepe Jeans Negro",
    price: 300,
    stock: 30,
    thumbnail:
      "https://www.schilling.cl/media/catalog/product/cache/f0863b93965a9ef2fa85fc190d594c75/2/0/2052396-1_1.jpg",
  },
  {
    id: "8",
    title: "Lentes de Sol Lacoste Negro",
    price: 300,
    stock: 30,
    thumbnail:
      "https://www.schilling.cl/media/catalog/product/cache/f0863b93965a9ef2fa85fc190d594c75/2/0/2048107-1.jpg",
  },
  {
    id: "9",
    title: "Lentes de Sol Nike",
    price: 300,
    stock: 30,
    thumbnail:
      "https://www.schilling.cl/media/catalog/product/cache/f0863b93965a9ef2fa85fc190d594c75/2/0/2032885-1_1.jpg",
  },
  {
    id: "10",
    title: "Lentes de Sol U-Bahn Negro",
    price: 300,
    stock: 30,
    thumbnail:
      "https://www.schilling.cl/media/catalog/product/cache/f0863b93965a9ef2fa85fc190d594c75/2/0/2034146-1_1.jpg",
  },
];

const customFetch = (time, task) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isOk) {
        resolve(task);
      } else {
        reject("Error");
      }
    }, time);
  });
};

// const createCard = (items) => {
//   let body = "";
//   items.map((items, index) => {
//     body += `
//     <div id="${index + 1}" class="card">
//       <div class="card-header">
//         <p class="card-price">$${items.price}</p>
//       </div>
//       <div class="card-body">
//         <div class="card-img">
//           <img src="${items.url}" alt="img" />
//         </div>
//         <div class="box-text">
//           <p class="card-text">${items.title}</p>
//         </div>
//       </div>
//     </div>
//     `;
//   });
//   return body;
// };

// const mostrarProductos = () => {
//   customFetch(2000, productos).then((data) => {
//     let body = createCard(data);
//     btnPaginacion.classList.add("hidden");
//     document.getElementById("mainCards").innerHTML = body;
//   });
// };

const getProductos = async () => {
  let url = `https://api.mercadolibre.com/sites/MLC/search?q=laptop&offset=${pagina}&limit=${limite}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.error) {
      document.getElementById(
        "mainCards"
      ).innerHTML = `<p>Error: ${data.error}</p>`;
    } else {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

const formatterPeso = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
});

const mostrarProductosM = async () => {
  let listProduct = [];
  const data = await getProductos();
  if(pagina >= 1){
    btnAnterior.classList.remove("hidden")
    listProduct =  data.results;   
  }else{
    listProduct = listProduct.concat(productos, data.results);
    btnAnterior.classList.add("hidden");
  }
  state.products = listProduct;

  // console.log('data:', data)
  let body = "";
  btnPaginacion.classList.add("hidden");
  switch (data.results.length) {
    case 0:
      document.getElementById(
        "mainCards"
      ).innerHTML = `<p>No se encotraron resultados para tu busqueda</p>`;
      break;

    default:
      listProduct.map((items, index) => {
        body += `
        <div id="${index + 1}" class="card">
          <div class="card-header">
            <p class="card-price">${formatterPeso.format(items.price)}</p>
            <div id="cardStock" class="card-stock" onclick="addToCart('${
              items.id
            }')">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M24 0C10.7 0 0 10.7 0 24S10.7 48 24 48H76.1l60.3 316.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H179.9l-9.1-48h317c14.3 0 26.9-9.5 30.8-23.3l54-192C578.3 52.3 563 32 541.8 32H122l-2.4-12.5C117.4 8.2 107.5 0 96 0H24zM176 512c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm336-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48z"/></svg>
            </div>
          </div>
          <div class="card-body">
            <div class="card-img">
              <img src="${items.thumbnail}" alt="img" />
            </div>
            <div class="box-text">
              <p class="card-text">${items.title}</p>             
            </div>
          </div>
        </div>
        `;
      });
      document.getElementById("mainCards").innerHTML = body;
      btnPaginacion.classList.remove("hidden");
      
      break;
  }
};
mostrarProductosM();
// btnViewProducts.addEventListener("click", mostrarProductos);
// btnViewProductsM.addEventListener("click", mostrarProductosM);

btnSiguiente.addEventListener("click", () => {
  pagina += 1;
  mostrarProductosM();
  // (function smoothscroll() {
  //   let currentScroll =
  //     document.documentElement.scrollTop || document.body.scrollTop;
  //   if (currentScroll > 0) {
  //     window.requestAnimationFrame(smoothscroll);
  //     window.scrollTo(0, currentScroll - currentScroll / 5);
  //   }
  // })();
});

btnAnterior.addEventListener("click", () => {
  if (pagina >= 1) {
    pagina -= 1;
    mostrarProductosM();
  }
});

const addToCart = (id) => {
  let addCart = state.products.filter((item) => item.id === id);
  let itemRepeat = state.cart.filter((item) => item.id === id);
  if (itemRepeat.length > 0) {
    itemRepeat[0].quantity += 1;
  } else {
    let nuevoState = addCart[0];
    nuevoState.quantity = 1;
    state.cart.push(nuevoState);
  }

  itemsCart.textContent = state.cart.length;
  itemsCart.classList.remove("hidden");
};

cart.addEventListener("click", () => {
  createCardCart(state.cart);
  mainViewCart.classList.toggle("hidden"); 
  bodyDom.classList.toggle("activo");
});
const createCardCart = (data) => {
  let body = "";
  // console.log("state.cart:", state.cart);
  data.map((items, index) => {
    body += `
       
    <div class="card">
      <div class="card-img">
      <img src="${items.thumbnail}" alt="img" />
      </div> 
      <div class="box-text">      
          <p class="card-price">Precio: ${formatterPeso.format(
            items.price
          )}</p>        
          <p class="card-text">${items.title}</p>   
          <p class="card-text"><span class="subtitle">Cantidad: </span>${
            items.quantity
          }</p>
      </div> 
      <button class="btn btn-delete" onclick="delTocart('${items.id}')">Borrar</button>     

    </div>
      
      
   
    `;
  });
  bodyCart.innerHTML = body;
};
const delTocart = (id) => {
  let newItems = state.cart.filter((item) => item.id !== id);
  state.cart = newItems;
  createCardCart(state.cart);
  if (state.cart.length === 0) {
    itemsCart.textContent = "";
    itemsCart.classList.add("hidden");
  } else {
    itemsCart.textContent = state.cart.length;
    itemsCart.classList.remove("hidden");
  }
};
