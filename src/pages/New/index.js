import React, { useEffect, useState } from 'react';
//import { Link } from 'react-router-dom';

import api from '../../services/api';

export default function New(history) {
    const [vendedores, setVendedores] = useState([]);
    const [pessoa_id, setPessoaid] = useState([]);
    const [datavenda, setDatavenda] = useState([]);
    const [valor, setValor] = useState([]);


    async function handleSubmit(event) {
        //event.preventDefault();
        
        const response = await api.post('/movimentos', {            
            pessoa_id: pessoa_id,
            tipomovimentacao_id: 1,
            tipopagamento_id: 1,
            data: datavenda,
            datavenda: datavenda,
            valortotal: valor,
        });
        
          }
    useEffect(() => {
        async function carregarVendedor() {
            const codigosetor = localStorage.getItem('codigosetor');
            const response = await api.get('/pessoasselect/' + codigosetor);

            setVendedores(response.data);
        }
        carregarVendedor();
    }, []);

    return (
        <>
            <p>Adicione as venda do seu <strong>vendedor</strong> aqui!</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="Vendedor" >Vendedor</label>
                <select id="pessoa_id" onChange={event => setPessoaid(event.target.value)} >
                    <option value={0}>Selecione um vendedor</option>
                    {vendedores.map(vendedor => (
                        <option key={vendedor.id} value={`${vendedor.id}`} >
                            {vendedor.nome}
                        </option>
                    ))}
                </select>
                <label htmlFor="Data da venda">Data da venda</label>
                <input
                    id="datadavenda"
                    type="date"
                    value={datavenda}
                    onChange={event => setDatavenda(event.target.value)}
                />
                <label htmlFor="Valor">Valor (ex: <strong>100.00</strong>)</label>
                <input
                    id="valor"
                    type="text"
                    value = {valor}
                    onChange={event => setValor(event.target.value)}
                />
                <button className="btn" type="submit">Adicionar</button>
                <a href="/dashboard" className="btn voltar" type="submit">🔙</a>    
            </form>
        </>
    )
}