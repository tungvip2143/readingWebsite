import httpService from 'services/httpService';
import {
  RequestGetTodoList,
  RequestGetTodoListPaging,
  ResponseGetTodoList,
} from './todo.interface';

class TodoService {
  getTodoList(body?: RequestGetTodoList): Promise<ResponseGetTodoList> {
    return httpService.axios.get('https://jsonplaceholder.typicode.com/todos');
  }

  getTodoListPaging(body: RequestGetTodoListPaging): Promise<ResponseGetTodoList> {
    return httpService.axios.get(
      `https://jsonplaceholder.typicode.com/todos?_page=${body.page}&_limit=${body.limit}`
    );
  }
}

export default new TodoService();
