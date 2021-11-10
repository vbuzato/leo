import { ReactElement } from 'react';
import Form from '../components/form/form';
import './user-register.css';

export default function UserRegister(): ReactElement {
  return (
    <div className="user-register">
      <div className="background-green">
        <div className="img-user-register" />
      </div>
      <Form />
    </div>
  );
}
