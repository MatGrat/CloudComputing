import { useEffect, useState } from 'react';

const ORDERHISTORY_URL = 'http://localhost:5007/orderhistorys';

export function GetOrderHistorys() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(ORDERHISTORY_URL);
                if (!response.ok) {
                    throw new Error('Error get orderHistory');
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


export function GetOrderHistory(orderHistoryID) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${ORDERHISTORY_URL}/${orderHistoryID}`);
                if (!response.ok) {
                    throw new Error('Error get orderHistory');
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
    }, [orderHistoryID]); 

    return { data, loading, error };
}

export function GetOrderHistoryProducts(userID) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${ORDERHISTORY_URL}/products/${userID}`);
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

export async function CreateOrderHistory(userID) {
    try {
        const response = await fetch(ORDERHISTORY_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                UserID: userID
            }),
        });

        if (!response.ok) {
            throw new Error('Error create orderHistory');
        }

        const result = await response.json();
        return result; 
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function UpdateOrderHistory(orderHistoryID, userID) {
    try {
        const response = await fetch(`${ORDERHISTORY_URL}/${orderHistoryID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                UserID: userID
            }),
        });

        if (!response.ok) {
            throw new Error('Error update orderHistory');
        }

        const result = await response.json();
        return result; 
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function DeleteOrderHistory(orderHistoryID) {
    try {
        const response = await fetch(`${ORDERHISTORY_URL}/${orderHistoryID}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Error delete orderHistory');
        }

        return true; 
    } catch (error) {
        throw new Error(error.message);
    }
}