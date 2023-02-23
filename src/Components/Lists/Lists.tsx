import PropTypes from 'prop-types'
import { Todo } from '../../@types/todo.type'
import { Title } from '../../SCSS/Styled Components/tagStyled'
import Items from '../Items'

interface ListsProps {
  doneTaskList?: boolean
  todo: Todo[]
  doneTodo: (id: string) => void
  startEditTodo: (id: string) => void
  deleteTodo: (id: string) => void
}

const Lists = (props: ListsProps) => {
  const { doneTaskList, todo, doneTodo, startEditTodo, deleteTodo } = props

  return (
    <div className='listTotal' style={{ display: 'block' }}>
      {doneTaskList ? <Title>Done List</Title> : <Title>Task List</Title>}
      <div className='lists'>
        {todo.map((item, index) => (
          <Items key={item.id} item={item} doneTodo={doneTodo} startEditTodo={startEditTodo} deleteTodo={deleteTodo} />
        ))}
      </div>
    </div>
  )
}

export default Lists

Lists.prototype = {
  doneTaskList: PropTypes.bool,
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired
  }).isRequired,
  doneTodo: PropTypes.func.isRequired,
  startEditTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired
}
