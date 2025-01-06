import { useEffect, useState } from 'react';

const USER_URL = 'http://localhost:5006/users';

export function GetUsers() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(USER_URL);
                if (!response.ok) {
                    throw new Error('Error get users');
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


export function GetUser(userID) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${USER_URL}/${userID}`);
                if (!response.ok) {
                    throw new Error('Error get user');
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

export async function CreateUser(userName, userMail, userFirstName, userLastName, userPassword, userStreet, userCity, userZIP, userIBAN) {
    console.log(userName)
    try {
        const response = await fetch(USER_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                UserName: userName,
                UserMail: userMail,
                UserFirstName: userFirstName,
                UserLastName: userLastName,
                UserPassword: userPassword,
                UserStreet: userStreet,
                UserCity: userCity,
                UserZIP: userZIP,
                UserIBAN: userIBAN
            }),
        });

        const result = await response.json();
        return result; 
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function UpdateUser(userID, userName, userMail, userFirstName, userLastName, userPassword, userStreet, userCity, userZIP, userIBAN) {
    try {
        const response = await fetch(`${USER_URL}/${userID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                UserName: userName,
                UserMail: userMail,
                UserFirstName: userFirstName,
                UserLastName: userLastName,
                UserPassword: userPassword,
                UserStreet: userStreet,
                UserCity: userCity,
                UserZIP: userZIP,
                UserIBAN: userIBAN
            }),
        });

        if (!response.ok) {
            throw new Error('Error update user');
        }

        const result = await response.json();
        return result; 
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function DeleteUser(userID) {
    try {
        const response = await fetch(`${USER_URL}/${userID}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Error delete user');
        }

        return true; 
    } catch (error) {
        throw new Error(error.message);
    }
}