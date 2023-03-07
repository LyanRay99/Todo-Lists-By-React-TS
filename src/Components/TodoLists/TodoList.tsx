//* Library
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
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

//* Ta có thể dùng interface hoăc type để định nghĩa Todo
interface HandleNewTodos {
  (todos: Todo[]): Todo[]
}

// type HandleNewTodos = (todos: Todo[]) => Todo[]

const syncReactToLocal = (handleNewTodos: HandleNewTodos) => {
  const localTodo = localStorage.getItem('todos')
  const objTodo: Todo[] = JSON.parse(localTodo || '[]')
  const newTodosObj = handleNewTodos(objTodo)
  localStorage.setItem('todos', JSON.stringify(newTodosObj))
}

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
  const NotDoneTodo = todo.filter((item) => !item.done)
  const DoneTodo = todo.filter((item) => item.done)

  //* Get data todo from localstorage
  useEffect(() => {
    const localTodo = localStorage.getItem('todos')
    const objTodo: Todo[] = JSON.parse(localTodo || '[]')
    setTodo(objTodo)
  }, [])

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
    //* check text input có bị trùng với 1 trong các todo đã có hay ko
    var checkTodo: boolean = true
    todo.map((todo, index) => {
      if (todo.name === name) {
        checkTodo = false
      }
    })

    //* Check text input có phải toàn space hay ko
    var checkSpaceText: number = name.replace(/\s/g, '').length

    //* add todo
    if (checkTodo && checkSpaceText) {
      var objTodo: Todo = {
        id: new Date().toISOString(),
        done: false,
        name: name
      }

      setTodo((pre) => [...todo, objTodo])
      syncReactToLocal((todosObj: Todo[]) => [...todosObj, objTodo])
    }

    //* Hiển thị thông báo khi User thêm title todo bị trùng hoặc chỉ chứa toàn dấu space
    if (!checkSpaceText) {
      alert('Vui lòng nhập công việc bạn cần làm vào ô dưới')
    } else if (!checkTodo) {
      alert(`Công việc của bạn hiện đang bị trùng`)
    }
  }

  //* Completed: Change done
  const doneTodo = (idTodo: string) => {
    const handler = (todoObj: Todo[]) => {
      const obj = todoObj.map((item) => {
        if (item.id === idTodo) {
          return { ...item, done: !item.done }
        }
        return item
      })
      return obj
    }

    setTodo(handler)
    syncReactToLocal(handler)
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
    // console.log(name)
    //* check text input có bị trùng với 1 trong các todo đã có hay ko
    var checkTodo: boolean = true
    todo.map((todo, index) => {
      if (todo.name === currentTodo?.name) {
        checkTodo = false
      }
    })

    //* Check text input có phải toàn space hay ko
    var checkSpaceText: number | undefined = currentTodo?.name.replace(/\s/g, '').length

    if (checkTodo && checkSpaceText) {
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
      syncReactToLocal(handler)
    }

    //* Hiển thị thông báo khi User thêm title todo bị trùng hoặc chỉ chứa toàn dấu space
    if (!checkSpaceText) {
      alert('Vui lòng nhập công việc bạn cần làm vào ô dưới')
    } else if (!checkTodo) {
      alert(`Công việc của bạn hiện đang bị trùng`)
    }
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
    syncReactToLocal(handler)
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
            <Lists todo={NotDoneTodo} doneTodo={doneTodo} startEditTodo={startEditTodo} deleteTodo={deleteTodo} />
            <Lists
              todo={DoneTodo}
              doneTodo={doneTodo}
              startEditTodo={startEditTodo}
              deleteTodo={deleteTodo}
              doneTaskList
            />
          </ContainerList>
        </AppNode>

        <div className='effect'>
          <SpinEffect></SpinEffect>
          <div className='effect__black'></div>
          <div className='effect__black'></div>
          <SpinEffect></SpinEffect>
        </div>
      </section>
    </ThemeProvider>
  )
}

export default TodoList

TodoList.prototype = {}
