import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Todo } from '../../@types/todo.type'
import { InputTodoList, SetBtn } from '../../SCSS/Styled Components/tagStyled'

//* Tạo interface này để gán các state mà component nhận được. Sau đó truyền vào props
//* Như vậy 1 phần sẽ check được type đúng của props nhận vào (code chặt chẽ hơn)
//* Và sau đó ta có thể dùng Destructuring để lấy các state trong interface ra (do ta đã gán interface = props)
interface InputTodoProps {
  currentTodo: Todo | null
  addTodo: (name: string) => void
  editTodo: (name: string) => void
  finishEditTodo: () => void
}

const InputTodo = (props: InputTodoProps) => {
  const { currentTodo, addTodo, editTodo, finishEditTodo } = props

  const [name, setName] = useState<string>('')

  //* Completed: handle change input
  //* Tip: khi không biết type của event nhận vào là gì. Ta đưa con trỏ vào để xem type của nó và code type đó vào
  //* Event bên dưới là React.ChangeEvent<HTMLInputElement>
  const getTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (currentTodo) {
      editTodo(event.target.value)
    } else {
      setName(event.target.value)
    }
  }

  const handleAdd = () => {
    addTodo(name)
    setName('')
  }

  return (
    <div className='inputTodo'>
      <InputTodoList
        type='text'
        placeholder='Input Todo'
        value={currentTodo ? currentTodo.name : name}
        onChange={getTodo}
      ></InputTodoList>

      {currentTodo ? (
        <SetBtn className='updateBtn' onClick={() => finishEditTodo()}>
          Update
        </SetBtn>
      ) : (
        <SetBtn onClick={() => handleAdd()}>Add</SetBtn>
      )}
    </div>
  )
}

export default InputTodo

InputTodo.prototype = {
  currentTodo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired
  }).isRequired,
  addTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  finishEditTodo: PropTypes.func.isRequired
}
