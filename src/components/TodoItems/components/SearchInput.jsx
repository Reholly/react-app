import React from 'react';
import {styled} from 'styled-components';


const Input = styled.input``;

// Разобраться, почему не срабатывает ввод символов в строку
export const SearchInput = ({value, setValue, setItems}) => {
  const onInputChange = (event) => {
    if (setValue) {
      setValue(event.nativeEvent.target.value);
      setItems(null);
    }
  }

  return <Input value={value} onChange={onInputChange} placeholder='Поиск' />
}