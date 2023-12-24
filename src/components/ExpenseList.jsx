import React, { useContext } from 'react'
import ExpenseContext from './store/ExpenseContext'
import { Button, Table } from 'react-bootstrap';

function ExpenseList() {
    const expenseCtx = useContext(ExpenseContext);
    console.log(expenseCtx.expenses,'in expneselist');
  return (
    <div>
        <h3 className="text-center mt-5 text-white">Expenses</h3>
        <Table striped bordered hover variant='light' style={{width:'900px'}} className='container'>
            <thead style={{textAlign:'center'}}>
                <tr>
                    <th>Amount</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Buttons</th>
                    
                </tr>
            </thead>
            <tbody>
                {expenseCtx.expenses.map((expense,index)=>(
                    <tr key={index} style={{textAlign:'center'}}>
                        <td>{expense.amount}</td>
                        <td>{expense.description}</td>
                        <td>{expense.category}</td>
                        <td style={{display:"flex",justifyContent:'space-evenly'}}>
                        <Button variant="primary"className='mx-2' onClick={expenseCtx.editExpense.bind(null,expense)}>Edit</Button>
                        <Button variant="danger" className='mx-2' onClick={expenseCtx.deleteExpense.bind(null,expense)}>Delete</Button></td>
        
                    </tr>
                ))}
            </tbody>
        </Table>
    </div>
  )
}

export default ExpenseList