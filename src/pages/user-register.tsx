import { ReactElement } from 'react';
import Form from '../components/form/form';
import './user-register.css';

export default function UserRegister(): ReactElement {
  return (
    <div className="user-register">
      <div className="img-user-register" />
      <Form />
    </div>
  );
}
