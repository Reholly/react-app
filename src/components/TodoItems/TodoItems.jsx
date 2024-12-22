import React, {useEffect, useState} from 'react';
import {TodoItemsContainer} from './TodoItemsContainer';
import {NewTodoItem} from '../TodoItem/NewTodoItem';
import {TodoItem} from '../TodoItem/TodoItem';
import {useData} from '../../data/hooks/useData';
import {SearchInput} from './components/SearchInput';

export const TodoItems = () => {
  const [searchValue, setSearchValue] = useState('');
  const {data: todoItems, isLoading} = useData();


  const [currentItems, setCurrentItems] = useState(null);
  useEffect(() => {
    if (currentItems) {
      setCurrentItems(todoItems.filter((todoItem) => {
        return todoItem.title.trimStart().includes(
            searchValue.trimStart()
        )
      }));
    }
  }, [todoItems]);

  if (!todoItems || isLoading) {
    return (
      <TodoItemsContainer>
        Загрузка данных...
      </TodoItemsContainer>
    );
  }

  // Фукнция filter вызывает для каждого элемента переданный ей колбек
  // И формирует в filteredBySearchItems новый массив элементов, для которых колбек вернул true
  // Для проверки вхождения подстроки в строку нужно использовать indexOf
  const filteredBySearchItems = todoItems.filter((todoItem) => {
    return todoItem.title.trimStart().includes(
      searchValue.trimStart()
    )
  });

  const onClickSortUp = () => {
    setCurrentItems(
      filteredBySearchItems.sort(
        (a, b) => b.priority - a.priority
      )
    );
  };

  const onClickSortDown = () => {
    setCurrentItems(
      filteredBySearchItems.sort(
        (a, b) => a.priority - b.priority
      )
    );
  };

  let todoItemsElements

  if (currentItems) {
    todoItemsElements = currentItems.map((item) =>
    { return <TodoItem key={item.id}
          title={item.title}
          checked={item.isDone}
          id={item.id}
          priority={item.priority}/>;
    })
  } else {
    todoItemsElements = filteredBySearchItems.map((item) => {
      return <TodoItem
          key={item.id}
          title={item.title}
          checked={item.isDone}
          id={item.id}
          priority={item.priority} />;
    });
  }

  return (
      <TodoItemsContainer>
        <SearchInput value={searchValue} setValue={setSearchValue} setItems={setCurrentItems}/>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'stretch'
        }}>
          <button onClick={onClickSortUp}>
            По возрастанию
          </button>
          <button onClick={onClickSortDown}>
            По убыванию
          </button>
        </div>
        {todoItemsElements}
        <NewTodoItem/>
      </TodoItemsContainer>
  )
}