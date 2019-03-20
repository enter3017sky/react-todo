import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './main.css'
import Todo from './Todo'

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            todos: [{
                id: 0,
                isCompleted: false,
                text: '選擇未完成的待辦事項！'
            },
            {
                id: 1,
                isCompleted: true,
                text: '新增第一筆代辦事項吧！'
            },
            {
                id: 2,
                isCompleted: false,
                text: '清空所有代辦事項！'
            }],
            todoInputText: '',
            filter: 'all'
        }
        this.id = 3
        this.handleChange = this.handleChange.bind(this)
        this.addTodo = this.addTodo.bind(this)
        this.deleteTodo = this.deleteTodo.bind(this)
        this.markTodo = this.markTodo.bind(this)
        this.handlePress = this.handlePress.bind(this)
    }

    // 將 localStorage 取出來，在初始化(ComponentDidMount)時做這件事情
    /** 由於清空時，todo 會是 []，但會因為存在 localStorage 但 id 是 undefined 而出錯，故加上 todoData !== '[]' 作為判斷 */
    componentDidMount() {
        const todoData = window.localStorage.getItem('todoApp')
        if(todoData && todoData !== '[]') {
            const oldTodos = JSON.parse(todoData)
            this.setState({
                todos: oldTodos,
            })
            this.id = oldTodos[oldTodos.length - 1].id + 1
        }
    }

    // 生命週期的更新狀態時，判斷 todo 有沒有改變，如果有的話，將最新的 todo 存儲在 localStorage
    componentDidUpdate(prevProps, prevState) {
        console.log('prevProps', prevProps)
        console.log('prevState', prevState)
        if(prevState.todos !== this.state.todos !== []) {
            window.localStorage.setItem('todoApp', JSON.stringify(this.state.todos))
        } 
    }

    // 處理 input 輸入的文字
    handleChange(e) {
        this.setState({
            todoInputText: e.target.value
        })
    }

    // Add New To-Do 按鈕點擊後執行
    addTodo() {
        const { todoInputText, todos } = this.state
        if(!todoInputText) return
        this.setState({
            // 解構
            todos: [...todos, {
                // 新增的資料
                id: this.id,
                isCompleted: false,
                text: todoInputText
            }],
            // 清空 input
            todoInputText: ''
        })
        this.id++
    }

    // 按下 enter 處理
    handlePress(e) {
        if(e.key === 'Enter') {
            // console.log(e.target instanceof HTMLInputElement)
            const { todoInputText, todos } = this.state
            if(!todoInputText) return
            this.setState({
                // 解構
                todos: [...todos, {
                    // 新增的資料
                    id: this.id,
                    isCompleted: false,
                    text: todoInputText
                }],
                // 清空 input
                todoInputText: ''
            })
            this.id++
        }
    }

    // 刪除
    deleteTodo(id) {
        this.setState({
            todos: this.state.todos.filter(todo => todo.id !== id)
        })
    }

    markTodo(id) {
        this.setState({
            todos: this.state.todos.map(todo => {
                if(todo.id !== id) {
                    return todo
                }

                return {
                    ...todo,
                    isCompleted: !todo.isCompleted
                }
            })
        })
    }

    render() {
        const { todos, todoInputText, filter} = this.state
        return (
            <div className="container">
                <div className="row">
                    <div className="col card card-body">
                        <div className="col card card-body p1"></div>
                        <div className="col card card-body p2"></div>
                        <div className="input-group">
                            <input type="text" name="todo" className="form-control add-todo" placeholder="新增代辦事項" 
                            value={todoInputText}
                            onChange={this.handleChange}
                            onKeyPress={this.handlePress}
                            />
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary addBtn add-todo" type="button" onClick={this.addTodo}>Add New To-Do</button>
                            </div>
                        </div>
                        <div className="btn-group btn_group">
                            <button className="btn btn-outline-success btn-block done" type="button" onClick={()=> {
                                this.setState({
                                    filter: 'all'
                                })
                            } }>全部</button>
                            <button className="btn btn-outline-primary btn-block undone" type="button" onClick={() => {
                                this.setState({
                                    filter: 'completed'
                                })
                            }}>未完成</button>
                            <button className="btn btn-outline-danger btn-block clear" type="button" onClick={() => {
                                // 清空資料
                                this.setState({
                                    todos: []
                                })
                                window.localStorage.clear()
                            }}>清空</button>
                        </div>
                        <ul className="list-group list-group-flush todo_list">
                        {/* <!-- todo 插入的地方 --> */}

                        {todos
                            .filter(todo => filter === 'completed' ? todo.isCompleted : true)
                            .map(todo => (
                                <Todo 
                                key={todo.id} 
                                todo={todo} 
                                deleteTodo={this.deleteTodo} 
                                markTodo={this.markTodo}
                                />
                        ))}

                        {/* <!-- 結尾 --> */}

{/* example */}
{/* <li className="list-group-item d-flex justify-content-between align-items-center">
今晚打老虎
    <div className="btn-group" role="group" aria-label="Basic example">
        <button type="button" className="btn btn-outline-success">完成
        </button>
        <button type="button" className="btn btn-outline-danger delete">刪除</button>
    </div>
</li> */}
{/*  */}
                        </ul>
                    </div>
                </div>
                <footer className="info">
                    <a href="https://github.com/Lidemy/mentor-program-2nd" target="blank">Mentor Program 2nd</a>, created by <a href="https://github.com/enter3017sky?tab=repositories" target="blank">enter3017sky
                    </a>
                </footer>
            </div>
        )
    }
}

export default App