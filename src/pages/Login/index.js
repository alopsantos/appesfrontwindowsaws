import React, { useState } from 'react';
import api from '../../services/api';

import md5 from 'md5';

export default function Login({ history }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();       

        const response = await api.post('/session', { email, password : md5('estacaostore'+password) });

        const { id, codigosetor } = response.data;
        

        localStorage.setItem('id', id);
        localStorage.setItem('codigosetor', codigosetor);
        if(id >= 1){
            history.push('/dashboard');
        }
        
    }
    return (
        <>
            <p>Faça seu <strong>login</strong> para ter acesso a Estação Store App</p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-Mail *</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Seu melhor email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
                <label htmlFor="senha">Senha *</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}

                />

                <button className="btn" type="submit">Entrar</button>

            </form>
        </>
    )
}
