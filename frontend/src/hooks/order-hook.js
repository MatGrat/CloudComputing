import { useEffect, useState } from 'react';

const ORDER_URL = 'http://localhost:5003/orders';

export function GetOrders() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(ORDER_URL);
                if (!response.ok) {
                    throw new Error('Error get orders');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
}

export function GetOrdersByShopCart(shopCartID) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${ORDER_URL}/shopcart/${shopCartID}`);
                if (!response.ok) {
                    throw new Error('Error get orders');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
}


export function GetOrder(orderID) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${ORDER_URL}/${orderID}`);
                if (!response.ok) {
                    throw new Error('Error get order');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [orderID]); 

    return { data, loading, error };
}

export async function CreateOrder(shopCartID, productID, orderQuantity) {
    try {
        const response = await fetch(ORDER_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ShopCartID: shopCartID,
                ProductID: productID,
                OrderQuantity: orderQuantity,
            }),
        });

        console.log('Creating Order with:', shopCartID, productID, orderQuantity);

        if (!response.ok) {
            throw new Error('Error create order');
        }

        const result = await response.json();
        return result; 
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function UpdateOrder(orderID, shopCartID, productID, orderQuantity) {
    try {
        const response = await fetch(`${ORDER_URL}/${orderID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ShopCartID: shopCartID,
                ProductID: productID,
                OrderQuantity: orderQuantity,
            }),
        });

        if (!response.ok) {
            throw new Error('Error update order');
        }

        const result = await response.json();
        return result; 
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function DeleteOrder(orderID) {
    try {
        const response = await fetch(`${ORDER_URL}/${orderID}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Error delete order');
        }

        return true; 
    } catch (error) {
        throw new Error(error.message);
    }
}