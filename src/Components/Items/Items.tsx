import React from 'react'
import PropTypes from 'prop-types'
import { Todo } from '../../@types/todo.type'
import { Content, ContainerIcon, Icon } from '../../SCSS/Styled Components/tagStyled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faSquareCheck, faTrash } from '@fortawesome/free-solid-svg-icons'

interface ItemsProps {
  item: { id: string; name: string; done: boolean }
  doneTodo: (id: string) => void
  startEditTodo: (id: string) => void
  deleteTodo: (id: string) => void
}

const Items = (props: ItemsProps) => {
  const { item, doneTodo, startEditTodo, deleteTodo } = props

  const handleDone = (id: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    doneTodo(id)
  }

  return (
    <div className='lists__node'>
      <div className='lists__node__childs'>
        <input type='checkbox' checked={item.done} onChange={handleDone(item.id)}></input>

        <Content style={item.done ? { textDecoration: 'line-through' } : {}}>{item.name}</Content>
      </div>

      <ContainerIcon>
        <React.Fragment>
          <Icon onClick={() => startEditTodo(item.id)}>
            <FontAwesomeIcon color='orange' icon={faPenToSquare} />
          </Icon>
          {/* <Icon>
            <FontAwesomeIcon color='green' icon={faSquareCheck} />
          </Icon> */}
          <Icon onClick={() => deleteTodo(item.id)}>
            <FontAwesomeIcon color='red' icon={faTrash} />
          </Icon>
        </React.Fragment>
      </ContainerIcon>
    </div>
  )
}

export default Items

Items.prototype = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired
  }).isRequired,
  doneTodo: PropTypes.func.isRequired,
  startEditTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired
}
