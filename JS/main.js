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
let productElement = document.getElementById("featured");
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


async function fetchData () {
    let res = await fetch ('JSON/file.json');
    if (!res.ok) {
        throw new Error('not found');
    };

    let data = await res.json();

    data.forEach(product => {
                    productElement.innerHTML += `
                        <div>
                            <article>
                                <img src="${product.image}" loading="lazy" alt="${product.title}">
                                <h4>${product.title}</h4>
                                <p>💰 Price: $${product.price}</p>
                            </article>
                            <article>
                                <button type="button" id="${product}" onclick="addToCart (this.id)"><i class="fa-solid fa-plus"></i> Add to Cart</button>
                            </article>
                        </div>
                `});
    
}
fetchData();


