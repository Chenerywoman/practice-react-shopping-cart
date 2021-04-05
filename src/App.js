import React, { Component } from 'react';
import './App.css';
import 'h8k-components';
import ProductList from "./components/product-list";
import Cart from "./components/cart";

const title = "HackerShop";

class App extends Component {
    constructor() {
        super();
        const products = [...PRODUCTS].map((product, index) => {
            product.id = index + 1;
            product.image = `/images/items/${product.name.toLocaleLowerCase()}.png`;
            product.cartQuantity = 0;
            return product;
        });
        this.state = {
            cart: {
                items: []
            },
            products
        }

        this.handleCartClick = (item) => {

            const copyItems = [...this.state.cart.items]

            if (copyItems[item]) {
                copyItems[item].quantity++
            } else {
                const newItem = { "item": item, quantity: 1 }
                copyItems.push(newItem)
            }

            const copyProducts = [...this.state.products]

            copyProducts.forEach(copyProduct => {

                if (copyProduct.name === item) {
                    copyProduct.cartQuantity++
                }

            })

            this.setState({ cart: { items: copyItems } });
            this.setState({ products: copyProducts });

        }
    }


    render() {
        return (
            <div>
                <h8k-navbar header={title}></h8k-navbar>
                <div className="layout-row shop-component">
                    <ProductList products={this.state.products} handleCartClick={this.handleCartClick} />
                    <Cart cart={this.state.cart} />
                </div>
            </div>
        );
    }
}

export const PRODUCTS = [
    {
        name: "Cap",
        price: 5
    },
    {
        name: "HandBag",
        price: 30
    },
    {
        name: "Shirt",
        price: 35
    },
    {
        name: "Shoe",
        price: 50
    },
    {
        name: "Pant",
        price: 35
    },
    {
        name: "Slipper",
        price: 25
    }
];
export default App;
