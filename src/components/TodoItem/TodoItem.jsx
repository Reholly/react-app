import React, {useState} from 'react';
import styled, { css } from "styled-components"
import {TodoItemContainer} from './TodoItemContainer'
import {TodoItemCheckbox} from './TodoItemCheckbox';
import {useRemoveById} from "../../data/hooks/useData";
import {PrioritySelect} from "./Priority";

const checkedCss = css`
  color: #B5B5BA;
  text-decoration: line-through;
`

const Title = styled.span(props => {
  return `
    font-size: 15px;
    overflow-wrap: anywhere; 
    ${props.checked ? checkedCss : ''};
  `;
})

const Delete = styled.span`
  display: inline-block;
  width: 13px;
  height: 13px;
  background-image: url(assets/images/png/delete.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 13px;
  cursor: pointer;
`;



export const TodoItem = ({id, title, checked: isDone, priority}) => {
    const [highlight, setHighlighting] = useState( priority * 30);
    const { removeById } = useRemoveById();

    const onDelete = () => {
        if (window.confirm(`Вы уверены?`)) {
            removeById({ id });
        }
    }

    return (
      <TodoItemContainer
      style={{
          opacity: 1 - (priority / 13),
          backgroundColor: `rgb(${highlight}, 100, 100)`,
        }}>
        <TodoItemCheckbox checked={isDone} id={id} priority={priority} />
          <PrioritySelect id={id} priority={priority} setColor={setHighlighting} />
          <Title checked={isDone}>
              {title}
          </Title>
        <Delete onClick={onDelete}/>
    </TodoItemContainer>
  )
}
