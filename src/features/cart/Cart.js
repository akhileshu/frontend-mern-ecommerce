import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteItemFromCartAsync,
  increment,
  incrementAsync,
  selectCartLoaded,
  selectCount,
  selectItems,
  updateCartAsync,
} from "./cartSlice";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Navigate } from "react-router-dom";
import { discountedPrice } from "../../app/constants";

// {
//   "_id":"$oid": "64dc15f525a0190cce12d725"
//   "quantity": 1,
//   "product": {
// we are just storing product id but can retreive whole product object because we are using ref in schema
//     "$oid": "64da0304a2a9c3c3e88264a3"
//   },
//   "user": {
// we are just storing product id but can retreive whole user object because we are using ref in schema
//     "$oid": "64db6ce4a0ca5ae76fb3fc4a"
//   },
// }

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const cartLoaded = useSelector(selectCartLoaded);
  const totalPrice = items.reduce(
    (acc, item) => acc + discountedPrice(item.product) * item.quantity,
    0
  );
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }));
  };
  const handleRemove = (item) => {
    dispatch(deleteItemFromCartAsync(item.id));
  };

  return (
    <>
      {!items.length && cartLoaded && (
        <Navigate to="/" replace={true}></Navigate>
      )}

      <div>
        <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
              Cart
            </h1>
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <Link to={`/product-detail/${item.product.id}`}>
                        <img
                          src={item.product.thumbnail}
                          alt={item.product.title}
                          className="h-full w-full object-cover object-center"
                        />
                      </Link>
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <Link to={`/product-detail/${item.product.id}`}>
                              {item.product.title}
                            </Link>
                          </h3>
                          <p className="ml-4">
                            {discountedPrice(item.product)}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.product.brand}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-500">
                          <label
                            htmlFor="quantity"
                            className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                          >
                            Qty
                          </label>
                          <select
                            value={item.quantity}
                            onChange={(e) => handleQuantity(e, item)}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>

                        <div className="flex">
                          <button
                            onClick={() => handleRemove(item)}
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${totalPrice}</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Total Items in Cart</p>
              <p>{totalItems} items</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <Link
                to="/checkout"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </Link>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or{" "}
                <Link to="/">
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
