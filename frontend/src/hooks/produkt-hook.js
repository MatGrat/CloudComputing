import { useEffect, useState } from 'react';

const PRODUCT_URL = 'http://localhost:5004/products';

export function GetProducts() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(PRODUCT_URL);
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
    }, []);

    return { data, loading, error };
}


export function GetProduct(productID) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${PRODUCT_URL}/${productID}`);
                if (!response.ok) {
                    throw new Error('Error get product');
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
    }, [productID]); 

    return { data, loading, error };
}

export async function CreateProduct(productName, productDescription, productPrice, productImageURL) {
    try {
        const response = await fetch(PRODUCT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ProductName: productName,
                ProductDescription: productDescription,
                ProductPrice: productPrice,
                ProductImageUrl: productImageURL,
            }),
        });

        if (!response.ok) {
            throw new Error('Error create product');
        }

        const result = await response.json();
        return result; 
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function UpdateProduct(productID, productName, productDescription, productPrice, productImageURL) {
    try {
        const response = await fetch(`${PRODUCT_URL}/${productID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ProductName: productName,
                ProductDescription: productDescription,
                ProductPrice: productPrice,
                ProductImageUrl: productImageURL,
            }),
        });

        if (!response.ok) {
            throw new Error('Error update product');
        }

        const result = await response.json();
        return result; 
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function DeleteProduct(productID) {
    try {
        const response = await fetch(`${PRODUCT_URL}/${productID}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Error delete product');
        }

        return true; 
    } catch (error) {
        throw new Error(error.message);
    }
}