import axios from 'axios';
import { useEffect, useState } from 'react';
import Layout from 'sprint-8/duckbank/src/app/layout.jsx'

export default function Inicio(){
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:8000/api/loans')
        .then(response => {
            setData(response.data);
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
        });
    }, []);

    return (
        <Layout>
        <div>
            {data.map(item => (
            <div key={item.id}>{item.name}</div>
        ))}
    </div>
    </Layout>
);
}