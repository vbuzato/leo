import { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers, removeUser } from '../api';
import type { UserProps } from '../components/form/form-types';

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
      cpf, email, name, phone,
    } = user;

    return (
      <div>
        <div>
          <span>Nome:</span>
          <span>{name}</span>
        </div>
        <div>
          <span>CPF:</span>
          <span>{cpf}</span>
        </div>
        <div>
          <span>Telefone:</span>
          <span>{phone}</span>
        </div>
        <div>
          <span>Email:</span>
          <span>{email}</span>
        </div>
        <button type="button" onClick={() => onEdit(cpf)}>Editar</button>
        <button type="button" onClick={() => onDelete(cpf)}>Excluir</button>
      </div>
    );
  };

  const renderUsers = () => (
    <div>
      {users && users.length > 0
        ? users?.map((user) => renderUserCard(user))
        : 'Não há usuários cadastrados'}
    </div>
  );

  return (
    <div>
      {users ? renderUsers() : 'Carregando'}
    </div>
  );
}
