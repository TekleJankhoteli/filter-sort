let container = document.getElementById("container");
let input = document.getElementById("input");
let url = "https://api.escuelajs.co/api/v1/products/";




async function fetchAllProducts() {
    const allProducts = await fetchProducts(url);
    renderProducts(allProducts);
}

function main() {

   
    fetchAllProducts()
    const fetchWithDebounce = debounce(1000, fetchAndRenderData);
    input.addEventListener("input", (e) => {
        let filterInput = e.target.value;
        fetchWithDebounce(filterInput);
    });
}

function fetchProducts(url) {
    return fetch(url)
        .then((response) => response.json())
        .catch(() => {});
}

async function fetchAndRenderData(filter) {
  
    const apiUrl = `https://api.escuelajs.co/api/v1/products?title=${filter}`;
    const products = await fetchProducts(apiUrl);
    renderProducts(products);
}

function renderProducts(products) {
    let productItems = products.map((i, index) => `
    <table id="table">
        ${index === 0 ? `
            <tr class="headerTr">
                <th>ID</th>
                <th>Title</th>
                <th>Price</th>
                <th>Category</th>
                <th>CreatedAt</th>
            </tr>
        ` : ''}
        
        <tr class="productTr">
            <td>${i.id}</td>
            <td>${i.title}</td>
            <td>${i.price}</td>
            <td>${i.description}</td>
            <td>${i.createdAt}</td>
        </tr>
    </table>
`);

    container.innerHTML = productItems.join("");
}

function debounce(delay, callback) {
    let timeout;

    return (...args) => {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            callback(...args);
        }, delay);
    };
}

main();
