import { useEffect, useState } from 'react';

const SHOPCART_URL = 'http://localhost:5005/shopcarts';

export function GetShopCarts() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(SHOPCART_URL);
                if (!response.ok) {
                    throw new Error('Error get shopCarts');
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


export function GetShopCart(shopCartID) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${SHOPCART_URL}/${shopCartID}`);
                if (!response.ok) {
                    throw new Error('Error get shopCart');
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
    }, [shopCartID]); 

    return { data, loading, error };
}

export function GetShopCartProducts(userID) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${SHOPCART_URL}/products/${userID}`);
                if (!response.ok) {
                    throw new Error('Error get products');
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
    }, [userID]); 

    return { data, loading, error };
}

export async function CreateShopCart(userID) {
    try {
        const response = await fetch(SHOPCART_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                UserID: userID
            }),
        });

        console.log('Creating ShopCart with:', userID);

        if (!response.ok) {
            throw new Error('Error create shopCart');
        }

        const result = await response.json();
        return result; 
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function UpdateShopCart(shopCartID, userID) {
    try {
        const response = await fetch(`${SHOPCART_URL}/${shopCartID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                UserID: userID
            }),
        });

        if (!response.ok) {
            throw new Error('Error update shopCart');
        }

        const result = await response.json();
        return result; 
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function DeleteShopCart(shopCartID) {
    try {
        const response = await fetch(`${SHOPCART_URL}/${shopCartID}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Error delete shopCart');
        }

        return true; 
    } catch (error) {
        throw new Error(error.message);
    }
}