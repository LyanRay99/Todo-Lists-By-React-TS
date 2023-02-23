import { Todo } from '../../@types/todo.type'
import { Title } from '../../SCSS/Styled Components/tagStyled'
import Items from '../Items'

interface ListsProps {
  todo: Todo[]
  doneTodo: (id: string) => void
  startEditTodo: (id: string) => void
  deleteTodo: (id: string) => void
}

const Lists = (props: ListsProps) => {
  const { todo, doneTodo, startEditTodo, deleteTodo } = props

  return (
    <div className='listTotal' style={{ display: 'block' }}>
      <Title>Task List</Title>
      {/* {props.listTodo === 'Task List' ? <Title>Task List</Title> : <Title>Deleted List</Title>} */}
      <div className='lists'>
        {todo.map((item, index) => (
          <Items key={item.id} item={item} doneTodo={doneTodo} startEditTodo={startEditTodo} deleteTodo={deleteTodo} />
        ))}
      </div>
    </div>

    // <div className='listTotal' style={{ display: 'block' }}>
    //   {props.listTodo === 'Task List' ? <Title>Task List</Title> : <Title>Deleted List</Title>}
    //   <div className='lists'>
    //     {props.todo.map((x, index) => (
    //       <Item
    //         key={x.id}
    //         index={index}
    //         todo={x}
    //         checkTodo={props.checkTodo}
    //         handlerDelete={props.handlerDelete}
    //         listTodo={props.listTodo}
    //         exchangeTodo={props.exchangeTodo}
    //         editTodo={props.editTodo}
    //       />
    //     ))}
    //   </div>
    // </div>
  )
}

export default Lists
