// Define an array of product objects
const products = [
    {
        id: 0,
        image: "./jersey.jpeg",
        title: "Men's Champion Navy Virginia Volleyball Icon Jersey",
        price: 40,
    },
    {
        id: 1,
        image: "./shoes.jpeg",
        title: "Mizuno Wave Bolt 7 Women's Volleyball Shoes",
        price: 134,
    },
    {
        id: 3,
        image: "./knee_pads.jpg",
        title: "Nike Unisex Streak Volleyball Knee Pad Black Skate Safety ",
        price: 26,
    },
    {
        id: 4,
        image: "./Arm_sleeves.jpg",
        title: "Hanaive 4 Pcs Volleyball Arm Sleeves",
        price: 14,
    },
    {
        id: 5,
        image: "./equipment_aid.jpg",
        title: "Solo-Volleyball Training Equipment Aid",
        price: 18,
    },
    {
        id: 6,
        image: "./net.jpg",
        title: "Ultra Sporting Goods Volleyball (32x3 feet) Net",
        price: 50,
    }
];
// Create an array of unique categories based on the products array
const categories = [...new Set(products.map((item) => item.category))];
// Initialize the index
let i = 0;
// Update the HTML of the root element to display the products and add an "Add to Cart" button for each product
document.getElementById("root").innerHTML = products.map((item) => {
    var { image, title, price } = item;
    return (
        `<div class='box'>
            <img class='images' src=${image}></img>
            <div> 
                <div class='bottom'>
                    <p>${title}</p>
                    <h2>$ ${price}.00</h2>` +
        `<button id="button" onclick="AddToCart(${i++})">Add to Cart</button>` +
        `</div>
            </div>
        </div>`
    )
}).join('');
var cart = [];
function AddToCart(a) { //to add the item into cart functionality
    cart.push({ ...products[a] });
    displaycart();
}

function RemoveToCart(a) { //to delete the item into cart functionality
    cart.pop({ ...products[a] });
    displaycart();
}
function delElement(a) { //to delete the items from cart functionality
    cart.splice(a, 1);
    displaycart();
}
function displaycart(a) {
    let j = 0, total = 0;//Initilaizing the variables
    document.getElementById("count").innerHTML = cart.length;// to get count of no.of items customer selected.
    if (cart.length == 0) {
        document.getElementById('cartItem').innerHTML = "Your cart is empty";
        document.getElementById("total").innerHTML = "$ " + 0 + ".00";
    }
    else {
        document.getElementById('cartItem').innerHTML = cart.map((items) => {
            var { image, title, price } = items;
            total = total + price;
            document.getElementById("total").innerHTML = "$" + total + ".00";
            return (
                `<div class="cart-item">
                    <div class='row-ing'>
                        <img class='rowing' src=${image}>
                    </div>
                    <div>
                        <p>${title}</p>
                        <p style='font-size:12px'>$${price}.00</p>
                        <i class='fa-solid fa-trash' onclick='delElement(${j++})'></i>
                        <button  id="button" onclick="RemoveToCart(${i++})">Remove to Cart</button>
                    </div>
                </div>`
            );
        }).join('');
    }
}

function redir_function() {
    if (cart.length === 0) {// Check if the cart is empty
        alert("Your cart is empty. Please add some items to your cart before checking out.");
    } else {
        window.location.href = "Invoice/Invoice.html";
    }
}