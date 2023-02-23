//* Library
import React, { useEffect, useState } from 'react'
// import { v4 } from 'uuid'

//* Type (interface)
import { Todo } from '../../@types/todo.type'

//* Components
import InputTodo from '../TodoList'
import Lists from '../Lists'

//* Styles
import '../../SCSS/Responsive/responsive.scss'
import '../../SCSS/style.scss'
import {
  AppNode,
  DarkTheme,
  LightTheme,
  ContainerList,
  SpinEffect,
  MainTitle,
  SetBtn
} from '../../SCSS/Styled Components/tagStyled'
import { ThemeProvider } from 'styled-components'

// interface TodoList {
//   (todos: Todo[]): Todo[]
// }

const TodoList = () => {
  const [todo, setTodo] = useState<Todo[]>([
    {
      id: '1',
      name: 'abc',
      done: true
    },
    {
      id: '2',
      name: 'ABC',
      done: false
    }
  ])

  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)

  //* Completed: Change Theme by Styled-components
  const [theme, setTheme] = useState(DarkTheme)
  const changeTheme = () => {
    if (theme === DarkTheme) {
      setTheme(LightTheme)
    } else {
      setTheme(DarkTheme)
    }
  }

  //* Completed: Add todo
  const addTodo = (name: string) => {
    var objTodo: Todo = {
      id: new Date().toISOString(),
      done: false,
      name: name
    }

    setTodo((pre) => [...todo, objTodo])
    //todo: set todo into localstorage
  }

  //* Completed: Change done
  const doneTodo = (idTodo: string) => {
    setTodo((prev) => {
      return prev.map((item) => {
        if (item.id === idTodo) {
          return { ...item, done: !item.done }
        }
        return item
      })
    })
  }

  //* Completed: Edit todo
  const startEditTodo = (idTodo: string) => {
    const findTodo = todo.find((item) => item.id === idTodo)

    if (findTodo) {
      setCurrentTodo(findTodo)
    }
  }

  const editTodo = (name: string) => {
    setCurrentTodo((prev) => {
      if (prev) {
        return { ...prev, name }
      } else {
        return null
      }
    })
  }

  const finishEditTodo = () => {
    const handler = (todoObj: Todo[]) => {
      return todoObj.map((todo) => {
        if (todo.id === (currentTodo as Todo).id) {
          return currentTodo as Todo
        }
        return todo
      })
    }

    setTodo(handler)
    setCurrentTodo(null)
  }

  //* Completed: Delete todo
  const deleteTodo = (idTodo: string) => {
    //* Reset input khi click edit sau đó click delete
    if (currentTodo) {
      setCurrentTodo(null)
    }

    //* tạo hàm delete có check value đầu vào
    const handler = (todoObj: Todo[]) => {
      const obj = todoObj.filter((item) => item.id !== idTodo)
      return obj
    }

    //* set lại state
    setTodo(handler)
  }

  return (
    <ThemeProvider theme={theme}>
      <section>
        <AppNode className='app__node'>
          <div className='title'>
            <MainTitle>TODO APP</MainTitle>
          </div>

          <InputTodo currentTodo={currentTodo} addTodo={addTodo} editTodo={editTodo} finishEditTodo={finishEditTodo} />

          <div className='setColor'>
            <SetBtn onClick={changeTheme}>Set Theme</SetBtn>
          </div>

          <ContainerList>
            <Lists todo={todo} doneTodo={doneTodo} startEditTodo={startEditTodo} deleteTodo={deleteTodo} />
            <Lists todo={todo} doneTodo={doneTodo} startEditTodo={startEditTodo} deleteTodo={deleteTodo} />
          </ContainerList>
        </AppNode>

        {/* <div className='effect'>
          <SpinEffect></SpinEffect>
          <div className='effect__black'></div>
          <div className='effect__black'></div>
          <SpinEffect></SpinEffect>
        </div> */}
      </section>
    </ThemeProvider>
  )
}

export default TodoList
