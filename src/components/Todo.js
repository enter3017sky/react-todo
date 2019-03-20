import React, { Component } from 'react';

class Todo extends Component {
    constructor(props) {
        super(props)
        this.delete = this.delete.bind(this)
        this.mark = this.mark.bind(this)
    }

    delete() {
        const { todo, deleteTodo } = this.props
        deleteTodo(todo.id)
    }

    mark() {
        const { todo, markTodo } = this.props
        markTodo(todo.id)
    }

    render() {
        const { todo } = this.props
        return (
            <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
                    {todo.isCompleted ? <del>{todo.text}</del> : todo.text }
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className={`btn ${todo.isCompleted ? 'btn-outline-primary' : 'btn-outline-success' }`} onClick={this.mark}>
                        {todo.isCompleted ? '未完成' : '完成'}
                    </button>
                    <button type="button" className="btn btn-outline-danger delete" onClick={this.delete}>刪除</button>
                </div>
            </li>
        ) // return End
    } //  render End
} // Todo End

export default Todo