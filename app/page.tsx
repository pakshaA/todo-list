import { Header } from "./components/Header/Header";
import { TodoList } from "./components/TodoList/TodoList";
import style from './page.module.css'

export default function Home() {
  return (
    <>
      <Header />
      <TodoList />
    </>
  );
}
