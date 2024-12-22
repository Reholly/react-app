import styled from 'styled-components';
import React from "react";

const Root = styled.div `
  display: flex;
  gap: 9px;
  align-items: center;
  padding: 5px 0;
`

export const TodoItemContainer = ({children, style}) => {
  return <Root style={style}>{children}</Root>
}