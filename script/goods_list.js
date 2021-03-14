var btnBasket = document.getElementById('basket-btn');
var goodsListSection = document.getElementById('goods-list-section');
var btnCloseCart = document.getElementById('goods-list-section__delete');
var btnOrder = document.getElementsByClassName('product-card-section_btn-order');

//все товары
var  allProducts = {
   Guitar_1: { title : 'Гитара', price : 20000, src : 'img/trash.jpg' },
   Bass_Guitar: { title : 'Бас Гитара', price : 35000, src : 'img/trash.jpg' },
   D_dario: { title : 'Струны', price : 500, src : 'img/trash.jpg' }
};



class CartItem {
    constructor (product) {
        this.title = product.title;
        this.price = product.price;
        this.src = product.src;
        this.quantity = 1;
    }
    //метод возвращает html
    renderWithIndex(index) {
        return `<div class="goods-list__product-box">
        <span class="goods-list__product-box__name">${this.title}</span>
        <div class="goods-list__product-box__price">${this.price}руб</div>
        <div class="goods-list__product-box__quantity">${this.quantity}шт</div>
        <img class="goods-list__product-box__img" src=${this.src} height="100px" alt="">
        <input type="submit" value="Удалить товар" class="goods-list-item__product-box__delete" data-product-index=${index} onclick="deleteItemFromCart()">
        </div>`
    }

    addQuantity() {
        this.quantity += 1;
    }
}

// Создаем корзину
class Cart {
    constructor () {
        this.goods = [];
    }

    render () {
        let listHtml = '';
        let goodsList = document.getElementById('goods-list__product-box');

        this.goods.forEach ((cartItem, indexOfProduct) => {
            listHtml += cartItem.renderWithIndex(indexOfProduct);
        });
        goodsList.innerHTML = listHtml;

        this.totalCartPrice();
    }

    //метод добавления товара в корзину
    addItemToCart(product) {
        let cartItem = this.goods.filter(el => el.title == product.title)[0]

        if (cartItem != undefined) {
            cartItem.addQuantity();
        } else {
            let item = new CartItem(product);
            this.goods.push(item);
        }
    }


    //Метод для вывода итоговой суммы корзины
    totalCartPrice() {
        let totalPrice = document.getElementById('goods-list__total');
        let sum = 0;
        this.goods.forEach (good => {
            sum += good.price * good.quantity;
        });
        totalPrice.innerText = `Итого  ${sum} рублей`;
    }

    deleteItemFromCart(index) {
        this.goods.splice(index, 1);
        this.render();
    }
}


const addItemToCart = () => {
    let productName = event.target.dataset.productName;
    let product = allProducts[productName];
    cart.addItemToCart(product);
}

const deleteItemFromCart = () => {
    let index = event.target.dataset.productIndex;
    cart.deleteItemFromCart(index);
}

var openBasket = () => {
    cart.render();
    goodsListSection.style.display = 'block';
};


var cart = new Cart();

btnBasket.addEventListener('click', openBasket);
window.addEventListener('click', function (evt) {console.log(evt)});
btnCloseCart.addEventListener ('click', function () {goodsListSection.style.display = 'none'});
