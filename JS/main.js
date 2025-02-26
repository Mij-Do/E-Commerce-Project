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

// api json for products
// fetch("JSON/file.json")
//     .then(response => response.json())
//     .then(data => {

//     data.forEach(product => {
//             productElement.innerHTML += `
//                 <div>
//                     <artecle>
//                         <img src="${product.image}" loading="lazy" alt="${product.title}">
//                         <h4>${product.title}</h4>
//                         <p>💰 Price: $${product.price}</p>
//                     </artecle>
//                     <artecle>
//                         <button type="button" id="${product}" onclick="addToCart (this.id)"><i class="fa-solid fa-plus"></i> Add to Cart</button>
//                     </artecle>
//                 </div>
//         `;
//     });
//     })
//     .catch(error => console.error("Error fetching products:", error));



let cart = document.getElementById('cart');
let cartsPro = document.getElementById('cartsPro');
let home = document.getElementById('home');

async function fetchData () {
    let res = await fetch ('JSON/file.json');
    if (!res.ok) {
        throw new Error('not found');
    };
    
    let data = await res.json();

    let productElement = document.getElementById("featured");

    data.forEach(product => {
                    productElement.innerHTML += `
                        <div>
                            <article>
                                <img src="${product.image}" loading="lazy" alt="${product.title}">
                                <h4>${product.title}</h4>
                                <p>💰 Price: $${product.price}</p>
                            </article>
                            <article>
                                <button type="button" id="${product.title}" class="addToCart"><i class="fa-solid fa-plus"></i> Add to Cart</button>
                            </article>
                        </div>
                `});
    
    // add to cart
    let addToCart = document.querySelectorAll('.addToCart');

    addToCart.forEach(button => {
        button.addEventListener('click', () => {
            data.forEach(product => {
                if (product.title == button.id) {
                    cart.innerHTML +=`
                            <div>
                                <article>
                                    <img src="${product.image}" loading="lazy" alt="${product.title}">
                                    <h4>${product.title}</h4>
                                    <p>💰 Price: $${product.price}</p>
                                </article>
                                <article>
                                    <button type="button" id="${product.title}" class="buy">Buy</button>
                                    <button type="button" id="${product.title}" class="delete">Delete</button>
                                </article>
                            </div>
                        `;
                }
            })
        });
    });
    
}

fetchData();


cart.style.display = 'none';

function goToCart () {
    if (cart.style.display === 'none') {
        cart.style.display = 'block';
        home.style.display = 'none';
    } else {
        cart.style.display = 'none';
        home.style.display = 'block';
    }
}

function backHome () {
    if (home.style.display === 'none') {
        home.style.display = 'block';
        cart.style.display = 'none';
    }
}