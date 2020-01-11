import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

export default function Dashborad(){
    const [vendas, setVendas] = useState([]);

    useEffect(() =>{
        async function caregarVendas(){
            const pessoa_id = localStorage.getItem('id');
            const response = await api.get('/dashboard', {
                headers: { pessoa_id }
            });
            setVendas(response.data);
            //console.log(response.data);
        }
        caregarVendas();
    }, []);

    return (
        <>
            <table className="venda-lista">
                <thead>
                    <tr>
                        <td>Valor</td>
                        <td>Data</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                {vendas.map(venda => (  
                    <tr key={venda.id} >
                        <td width="100">{venda.valortotal}</td>
                        <td>{venda.datavenda}</td>
                        <td>
                            <Link to={`/atualizar/${venda.id}`}>
                            <button className="btn">+</button>
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <Link to="/new">
            <button className="btn">Adicionar</button>
            </Link>
        </>
    )
}
