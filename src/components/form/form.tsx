import {
  ChangeEvent, FormEvent, ReactElement, useEffect, useState,
} from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { saveUser, getUser } from '../../api';
import type { UserProps } from './form-types';
import MaskedInput from '../masked-input/masked-input';
import {
  isValidName,
  isValidCpf,
  isValidPhone,
  isValidEmail,
} from '../../utils';

const initialUserState: UserProps = {
  name: '',
  cpf: '',
  phone: '',
  email: '',
};

export default function Form(): ReactElement {
  const [user, setUser] = useState<UserProps>(initialUserState);
  const [message, setMessage] = useState<string | undefined>();
  const [invalidField, setInvalidField] = useState<string | undefined>();
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

  const isValidUserData = (): boolean => {
    if (!user) return false;

    if (!isEditing && getUser(user.cpf)) {
      setInvalidField('Este CPF já está cadastrado');
      return false;
    }

    switch (!!user) {
      case !isValidName(user.name):
        setInvalidField('Nome inválido');
        return false;
      case !isValidCpf(user.cpf):
        setInvalidField('CPF inválido');
        return false;
      case !isValidPhone(user.phone):
        setInvalidField('Telefone inválido');
        return false;
      case !isValidEmail(user.email):
        setInvalidField('E-mail inválido');
        return false;
      default:
        break;
    }
    return true;
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>): void | null => {
    e.preventDefault();
    setInvalidField(undefined);

    if (!isValidUserData()) {
      return;
    }

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
      />

      <label htmlFor="cpf">CPF: </label>
      <MaskedInput
        id="cpf"
        mask="999.999.999-99"
        onChange={handleFormData}
        value={user.cpf}
      />

      <label htmlFor="phone">Telefone: </label>
      <MaskedInput
        id="phone"
        mask="(99) 99999-9999"
        onChange={handleFormData}
        value={user.phone}
      />

      <label htmlFor="email">E-mail: </label>
      <input
        id="email"
        value={user.email}
        type="email"
        onChange={handleFormData}
      />

      <button type="submit">
        {(isEditing) ? 'Atualizar' : 'Cadastrar usuário'}
      </button>

      <div>{message ?? null}</div>
      <div>{invalidField ?? null}</div>
    </form>
  );
}
