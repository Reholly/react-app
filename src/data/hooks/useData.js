import {LocalStorage} from '../services/LocalStorage';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {TodoItem} from '../entity/TodoItem'

export const useData = () => {
  const {data, isLoading} = useQuery({
    queryKey: ['todo'],
    queryFn: LocalStorage.getTodoItemsFromLocalStorage,
  });

  return {
    data,
    isLoading,
  };
}

export const useSaveNewTodoItem = () => {
  const client = useQueryClient();

  const {mutate, isPending, isSuccess} = useMutation({
    mutationFn: ({title,priority}) => {
      const newTodoItem = new TodoItem(new Date().getTime(), title, false, priority);
      return LocalStorage.saveTodoItemToLocalStorage(newTodoItem)
    },
    onSuccess: () => {
      client.invalidateQueries(['todo']);
    },
  });

  return {
    mutate,
    isPending,
    isSuccess
  }
}

export const useRemoveById = () => {
  const client = useQueryClient();
  const {
    mutate,
    isPending,
    isSuccess
  } = useMutation({
      mutationFn: ({id}) => {
        return LocalStorage.removeById(id)
      },
      onSuccess: () => {
        client.invalidateQueries(['todo']);
      },
    }
  );

  return {
    removeById: mutate,
    isPending,
    isSuccess
  }
}

export const useSetIsDoneById = () => {
  const client = useQueryClient();
  const {
    mutate,
    isPending,
    isSuccess
  } = useMutation({
    mutationFn: ({id, isDone}) => {
      return LocalStorage.setIsDoneById(id, isDone)
    },
    onSuccess: () => {
      client.invalidateQueries(['todo']);
    },
  }
  );

  return {
    setIsDone: mutate,
    isPending,
    isSuccess
  }
}

export const useSetPriorityById = () => {
  const client = useQueryClient();
  const {
    mutate,
    isPending,
    isSuccess
  } = useMutation({
    mutationFn: ({id, priority}) => {
      return LocalStorage.setPriorityById(id, priority)
    },
    onSuccess: () => {
      client.invalidateQueries(['todo']);
    },
  }
  );

  return {
    mutate,
    isPending,
    isSuccess
  }
}