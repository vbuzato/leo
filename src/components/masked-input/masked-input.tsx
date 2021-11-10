import { ChangeEventHandler } from 'react';
import InputMask from 'react-input-mask';

type InputProps = {
  id: string,
  mask: string,
  onChange: ChangeEventHandler<HTMLInputElement>,
  value: string,
 }

export default function MaskedInput({
  id, value, onChange, mask,
}: InputProps) {
  return (
    <InputMask
      id={id}
      mask={mask}
      value={value}
      onChange={onChange}
    />
  );
}
