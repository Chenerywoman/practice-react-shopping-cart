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
            const newItem = { item: item, quantity: 1 }
            copyItems.push(newItem)

            const copyProducts = [...this.state.products]

            copyProducts.forEach(copyProduct => {

                if (copyProduct.name === item) {
                    copyProduct.cartQuantity++
                }

            })

            this.setState({ cart: { items: copyItems } });
            this.setState({ products: copyProducts });

        }

        this.increaseItems = (item) => {

            const copyProducts = [...this.state.products]
            const copyItems = [...this.state.cart.items]

            const productToIncrease = copyProducts.find(product => product.name === item);
            const indexOfProduct = copyProducts.findIndex(product => product.name === item);
            productToIncrease.cartQuantity++
            copyProducts.splice(indexOfProduct, 1, productToIncrease);

            copyItems.forEach(copyItem => {

                if (copyItem.item === item) {

                    copyItem.quantity++;
                }
            })

            this.setState({ products: copyProducts });
            this.setState({ cart: { items: copyItems } })
        }

        this.decreaseItems = (item) => {

            const copyProducts = [...this.state.products]
            const copyItems = [...this.state.cart.items]

            copyProducts.forEach(copyProduct => {

                if (copyProduct.name === item & copyProduct.cartQuantity !== 0) {
                    copyProduct.cartQuantity--
                }
            })

            const itemToDecrease = copyItems.find(copyItem => copyItem.item === item);
            const indexOfItemToDecrease = copyItems.findIndex((copyItem => copyItem.item === item));

            if (itemToDecrease.quantity === 1) {
                copyItems.splice(indexOfItemToDecrease, 1)
            } else {
                copyItems[indexOfItemToDecrease].quantity--
            }

            this.setState({ products: copyProducts });
            this.setState({ cart: { items: copyItems } });

        }

    }

    render() {
        return (
            <div>
                <h8k-navbar header={title}></h8k-navbar>
                <div className="layout-row shop-component">
                    <ProductList products={this.state.products} handleCartClick={this.handleCartClick} increaseItems={this.increaseItems} decreaseItems={this.decreaseItems} />
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
