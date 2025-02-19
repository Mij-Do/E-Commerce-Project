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
        behavior: 'smooth'
    });
});