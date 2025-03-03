// scroll 
function getEle (event, id) {
    event.preventDefault();
    const element = document.getElementById(id);
    
    if (element) {
        element.scrollIntoView({ behavior: "smooth" });
    }    
}

// back to top btn 
let backToTop = document.getElementById('backToTop');

window.onscroll = function () {
    if (document.documentElement.scrollTop > 300) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
};

backToTop.addEventListener ('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
});

// nav for small screen
let navBtnToOpen = document.getElementById('navBtnToOpen');
let navItems = document.getElementById('navItems');
let navBtnToClose = document.getElementById('navBtnToClose');

navBtnToOpen.addEventListener('click', function () {
    if (navItems.style.display === 'none') {
        navItems.style.display = 'block';
        navBtnToOpen.style.display = 'none';
        navBtnToClose.style.display = 'block';
        navBtnToClose.addEventListener('click', function () {
            if (navItems.style.display === 'block') {
                navItems.style.display = 'none'
                navBtnToOpen.style.display = 'block';
                navBtnToClose.style.display = 'none';
            }
        });
    } else {
        navItems.style.display = 'none';
    }
});


// get the products from json file 
let tmp;
let cart = document.getElementById('cart');
let cartsPro = document.getElementById('cartsPro');
let home = document.getElementById('home');

async function fetchData () {
    let res = await fetch ('JSON/file.json');
    if (!res.ok) {
        throw new Error('not found');
    };
    
    let data = await res.json();
    tmp = data;
    let productElement = document.getElementById("products");

    data.forEach(product => {
                    productElement.innerHTML += `
                        <div>
                            <article>
                                <img src="${product.image}" loading="lazy" alt="${product.title}">
                                <h4>${product.title}</h4>
                                <p>💰 Price: $${product.price}</p>
                            </article>
                            <article>
                                <button type="button" id="${product.title}" onclick="addToCartFunc(this.id)"><i class="fa-solid fa-plus"></i> Add to Cart</button>
                            </article>
                        </div>
    `});
}

fetchData();

// add to cart

let dataPro;

if (localStorage.products != null) {
    dataPro = JSON.parse(localStorage.products);
} else {
    dataPro = [];
}

function showData () {
    cart.innerHTML = ``;
    if (localStorage.products != null) {
        dataPro = JSON.parse(localStorage.products);
    } else {
        dataPro = [];
    }
    for (let i = 0; i < dataPro.length; i++) {
        cart.innerHTML +=`
                        <div>
                            <article>
                                <img src="${dataPro[i].image}" loading="lazy" alt="${dataPro[i].title}">
                                <h4>${dataPro[i].title}</h4>
                                <p>💰 Price: $${dataPro[i].price}</p>
                            </article>
                            <article>
                                <button type="button" id="${dataPro[i].title}" class="buy">Buy</button>
                                <button type="button" id="${dataPro[i].title}" onClick="deleteFromCart (this.id)" class="delete">Delete</button>
                            </article>
                        </div>
                    `;
                    cartsPro.innerHTML = `${dataPro.length}`;
    };
};

showData();

function addToCartFunc (id) {
    let objLength = Object.keys(tmp).length;
    
    for (let i = 0; i < objLength; i++) {   
        let products = {
            id: tmp[i].id,
            title: tmp[i].title,
            price: tmp[i].price,
            image: tmp[i].image,
        };
        if (products.title === id) {
            if (dataPro.some(product => product.title === products.title)) {
                window.alert('the product is already added to cart!');
            } else {
                dataPro.push(products);
            }
        }
    };
    
    window.localStorage.setItem('products', JSON.stringify(dataPro));
    showData();
};

// go to cart & back to main functions

cart.style.display = 'none';

function goToCart () {
    if (cart.style.display === 'none') {
        cart.style.display = 'block';
        home.style.display = 'none';
    } else {
        cart.style.display = 'none';
        home.style.display = 'block';
    };
};

function backHome () {
    if (home.style.display === 'none') {
        home.style.display = 'block';
        cart.style.display = 'none';
    };
};

// delete products from cart
function deleteFromCart (id) {
    for (let i = 0; i < dataPro.length; i++) {
        if (dataPro[i].title === id) {
            dataPro.splice(i, 1);
            localStorage.products = JSON.stringify(dataPro);
            showData ();
            cartsPro.innerHTML = `${dataPro.length}`
        };
    };
};