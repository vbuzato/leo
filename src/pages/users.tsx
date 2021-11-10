import { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers, removeUser } from '../api';
import type { UserProps } from '../components/form/form-types';
import logo from '../assets/logoleo.png';
import './users.css';

export default function Users(): ReactElement {
  const [users, setUsers] = useState<UserProps[]>();
  const navigate = useNavigate();

  const updateUsers = () => {
    setUsers(getUsers());
  };

  useEffect(() => {
    updateUsers();
  }, []);

  const onDelete = (cpf:string) => {
    removeUser(cpf);
    updateUsers();
  };

  const onEdit = (cpf:string) => {
    navigate(`/users/${cpf}`);
  };

  const renderUserCard = (user: UserProps) => {
    const {
      cpf, email, nome, telefone,
    } = user;

    return (
      <div className="line">
        <div className="user-item">
          <span className="title">Nome:</span>
          <span>{nome}</span>
        </div>
        <div className="user-item">
          <span className="title">CPF:</span>
          <span>{cpf}</span>
        </div>
        <div className="user-item">
          <span className="title">Telefone:</span>
          <span>{telefone}</span>
        </div>
        <div className="user-item">
          <span className="title">Email:</span>
          <span>{email}</span>
        </div>
        <div className="button-wrapper">
          <button className="bt-edit" type="button" onClick={() => onEdit(cpf)}>Editar</button>
          <button className="bt-delete" type="button" onClick={() => onDelete(cpf)}>Excluir</button>
        </div>
      </div>
    );
  };

  const renderUsers = () => (
    <div>
      {users && users.length > 0
        ? users?.map((user) => <div key={user.cpf}>{renderUserCard(user)}</div>)
        : <div className="no-users-found">Não há usuários cadastrados</div>}
    </div>
  );

  return (
    <div className="users">
      <header>
        <img alt="Leo Madeiras" src={logo} className="logo-leo" />
        <h2>Registro de Usuário</h2>
      </header>
      {users ? renderUsers() : 'Carregando'}
      <button type="button" className="bt-register" onClick={() => navigate('/')}>Cadastrar</button>
    </div>
  );
}
