import { ChangeEventHandler } from 'react';
import InputMask from 'react-input-mask';

type InputProps = {
  disabled?: boolean,
  id: string,
  mask: string,
  onChange: ChangeEventHandler<HTMLInputElement>,
  value: string,
 }

export default function MaskedInput({
  disabled, id, value, onChange, mask,
}: InputProps) {
  return (
    <InputMask
      id={id}
      mask={mask}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  );
}
