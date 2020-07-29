import React, { useState } from 'react';
import './styles.css';
import {FiLogIn} from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api';

export default function Logon(){
  const[id,setId]=useState('');
  const history=useHistory();
  async function handleLogin(e){
    e.preventDefault();

    try{
        const response=await api.post('sessions',{id});
        localStorage.setItem('ongId',id);
        localStorage.setItem('ongName',response.data.name);
        history.push('/profile');
    }catch(err){
      alert('Falha no Login');

    }
  }
  return(
  <div className="logon-container">
    <section className="form">
      <img src={logoImg} alt= "Be the hero" />
      <form  onSubmit={handleLogin}>
        <h1>Faça o seu logon</h1>
        <input placeholder = "Sua ID" value={id} onChange={e=>setId(e.target.value)}/>
       <div className="button">
         <button type="submit">Entrar</button>
         </div> 
        <Link className="back-link" to="/register">
          <FiLogIn size={16}  color="#E02041"/>
          Não tenho cadastro
        </Link>
      </form>
    </section>
    <img src={heroesImg}/>
  </div>
  );
}