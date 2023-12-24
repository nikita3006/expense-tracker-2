import React, { useContext } from 'react'
import ExpenseContext from './store/ExpenseContext'
import { Table } from 'react-bootstrap';

function ExpenseList() {
    const expenseCtx = useContext(ExpenseContext);
    console.log(expenseCtx.expenses,'in expneselist');
  return (
    <div>
        <h3 className="text-center mt-5 text-white">Expenses</h3>
        <Table striped bordered hover variant='light' className='container'>
            <thead>
                <tr>
                    <th>Amount</th>
                    <th>Description</th>
                    <th>Category</th>
                </tr>
            </thead>
            <tbody>
                {expenseCtx.expenses.map((expense,index)=>(
                    <tr key={index}>
                        <td>{expense.amount}</td>
                        <td>{expense.description}</td>
                        <td>{expense.category}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </div>
  )
}

export default ExpenseList