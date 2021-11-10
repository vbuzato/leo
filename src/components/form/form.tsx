import {
  ChangeEvent, FormEvent, ReactElement, useEffect, useState,
} from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { saveUser, getUser } from '../../api';
import type { UserProps } from './form-types';

const initialUserState: UserProps = {
  name: '',
  cpf: '',
  phone: '',
  email: '',
};

export default function Form(): ReactElement {
  const [user, setUser] = useState<UserProps>(initialUserState);
  const [message, setMessage] = useState<string | undefined>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { cpf } = useParams<string>();
  const navigate = useNavigate();

  useEffect(() => {
    if (cpf) {
      const userFound = getUser(cpf);
      if (userFound) {
        setUser(userFound);
        setIsEditing(true);
      } else {
        setMessage('Usuário inexistente');
      }
    }
  }, [cpf]);

  const handleFormData = (e: ChangeEvent<HTMLInputElement>): void => {
    setUser((prev) => ({
      ...prev, [e.target.id]: e.target?.value,
    }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>):void => {
    e.preventDefault();
    try {
      saveUser(user);
      setMessage('Usuário salvo com sucesso!');
      setTimeout(() => navigate('/users'), 2000);
    } catch {
      setMessage('Não foi possível salvar o usuário.');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">Nome: </label>
      <input
        id="name"
        value={user.name}
        type="text"
        onChange={handleFormData}
        required
      />

      <label htmlFor="cpf">CPF: </label>
      <input
        id="cpf"
        value={user.cpf}
        type="text"
        onChange={handleFormData}
        required
      />

      <label htmlFor="phone">Telefone: </label>
      <input
        id="phone"
        value={user.phone}
        type="text"
        onChange={handleFormData}
        required
      />

      <label htmlFor="email">E-mail: </label>
      <input
        id="email"
        value={user.email}
        type="email"
        onChange={handleFormData}
        required
      />

      <button type="submit">
        {(isEditing) ? 'Atualizar' : 'Cadastrar usuário'}
      </button>

      <div>{message ?? null}</div>
    </form>
  );
}
