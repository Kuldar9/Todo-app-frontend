import { createSignal } from "solid-js";
import Button from "./components/button";
import Input from "./components/input";
import ToggleButton from "./components/toggleButton";
import Container from "./components/container";

interface Todo {
  text: string;
  done?: boolean;
}

interface Group {
  name: string;
  todos: Todo[];
}

export default function TodoApp() {
  const [groups, setGroups] = createSignal<Group[]>([]);
  const [newGroupName, setNewGroupName] = createSignal<string>("");
  const [newTodoText, setNewTodoText] = createSignal<string>("");
  const [activeGroupIndex, setActiveGroupIndex] = createSignal<number | null>(null);

  const handleAddGroup = () => {
    if (newGroupName().trim()) {
      setGroups([...groups(), { name: newGroupName().trim(), todos: [] }]);
      setNewGroupName("");
    }
  };

  const handleDeleteGroup = (groupIndex: number) => {
    const updatedGroups = groups().filter((_, index) => index !== groupIndex);
    setGroups(updatedGroups);
    setActiveGroupIndex(null);
  };

  const handleAddTodo = () => {
    if (activeGroupIndex() !== null && newTodoText().trim()) {
      const updatedGroups = [...groups()];
      updatedGroups[activeGroupIndex()!].todos.push({ text: newTodoText().trim() });
      setGroups(updatedGroups);
      setNewTodoText("");
    }
  };

  const handleInputChange = (setter: (value: string) => void) => (value: string) => {
    setter(value);
  };

  const handleDeleteTodo = (groupIndex: number, todoIndex: number) => {
    const updatedGroups = [...groups()];
    updatedGroups[groupIndex].todos.splice(todoIndex, 1);
    setGroups(updatedGroups);
  };

  const handleToggleTodo = (groupIndex: number, todoIndex: number) => {
    const updatedGroups = [...groups()];
    updatedGroups[groupIndex].todos[todoIndex].done = !updatedGroups[groupIndex].todos[todoIndex].done;
    setGroups(updatedGroups);
  };

  const handleSelectGroup = (index: number) => {
    setActiveGroupIndex(index);
  };

  return (
    <Container>
      <h1>Todo List</h1>
      <div class="input-group">
        <Input value={newGroupName()} onChange={handleInputChange(setNewGroupName)} maxlength={15} />
        <Button onPress={handleAddGroup}>Add Group</Button>
      </div>
      <div class="groups">
        {groups().map((group, groupIndex) => (
          <div class="group" onClick={() => handleSelectGroup(groupIndex)}>
            <div class="group-header">
              <h2 class="group-name">{group.name}</h2>
              <Button onPress={() => handleDeleteGroup(groupIndex)}>Delete Group</Button>
            </div>
            {activeGroupIndex() === groupIndex && (
              <div class="todo-section">
                <div class="input-group">
                  <Input value={newTodoText()} onChange={handleInputChange(setNewTodoText)} />
                  <Button onPress={handleAddTodo}>Add Todo</Button>
                </div>
                <ul class="todo-list">
                  {group.todos.map((todo, todoIndex) => (
                    <li class="todo-item">
                      <ToggleButton
                        text={todo.text}
                        done={todo.done}
                        onToggle={() => handleToggleTodo(groupIndex, todoIndex)}
                      />
                      <Button onPress={() => handleDeleteTodo(groupIndex, todoIndex)}>Delete</Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </Container>
  );
}