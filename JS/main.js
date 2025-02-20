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


let productElement = document.getElementById("featured");
fetch("../JSON/file.json")
    .then(response => response.json())
    .then(data => {

    data.forEach(product => {
            productElement.innerHTML += `
            <div>
                <artecle>
                    <img src="${product.image}" alt="${product.title}" width="150">
                    <h4>${product.title}</h4>
                    <p>💰 Price: $${product.price}</p>
                </artecle>
                <artecle>
                    <button type="button" id="dualShock" onclick="addToCart (this.id)"><i class="fa-solid fa-plus"></i> Add to Cart</button>
                </artecle>
            </div>
        `;
    });
    })
    .catch(error => console.error("Error fetching products:", error));
