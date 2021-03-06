import React ,{useEffect, useState}from 'react';
import{Link,useHistory} from 'react-router-dom'
 import logoImg from '../../assets/logo.svg';
 import './styles.css';
import api from '../../services/api';

import { FiPower,FiTrash2, FiTrash } from 'react-icons/fi';
export default function Profile(){
  const[incidents,setIncidents]=useState([]);
  const history=useHistory();
   const ongId=localStorage.getItem('ongId');
  const ongName=localStorage.getItem('ongName');
 
  useEffect(()=>{
    api.get('profile',{
      headers: {
      Authorization: ongId,
    } }).then(response=>{setIncidents(response.data);
    })},[ongId]);
     async function handleDeleteIncident(id){
      try{
        await api.delete(`incidents/${id}`,{
          headers:{
            Authorization:ongId,
          }
        });
        setIncidents(incidents.filter(incident=>incident.id!==id));
      }catch(err){
        alert('Erro ao deletar caso,tente novamente');

      }
    }
    function hadleLogout(){
      localStorage.clear();
      history.push('/');
    }

    // teesteee 
  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the Hero"/>
  <span>Bem vinda,{ongName}</span>
        <Link className="button" to="/incidents/new" style ={{width:200}}>Cadastrar novo caso</Link>
        <button onClick={hadleLogout} type="button" >
          <FiPower size={18} color="#02041"/>
        </button>
      </header>
        <h1>Casos cadastrados</h1>
          <ul>
            {incidents.map(incident=>(
                <li key={incident.id}>
                  {console.log(incident.id)}
                  <strong>Caso</strong>
                  <p>{incident.title}</p>
                  <strong>Descrição</strong>
                  <p>{incident.description}</p>
                  <strong>Valor</strong>
                  <p>{Intl.NumberFormat('pt-BR',{style: 'currency',currency:'BRL'}).format(incident.value)}</p>
                  <button onClick={()=>handleDeleteIncident(incident.id)} type="button">
                    <FiTrash2 size={20} color="#a8a8b3"/>
                  </button>
               </li>
            ))}
          </ul>
    </div>
  )
}