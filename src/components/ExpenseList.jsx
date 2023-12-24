import React, { useContext } from 'react'
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { expenseActions } from './store/ExpenseSlice';

function ExpenseList() {
    
    const expenses = useSelector(state => state.expense.expenses);
    console.log(expenses,'in expenseList');

    const userEmail = useSelector(state => state.auth.userEmail);
    const userName = userEmail && userEmail.split("@")[0]; 
    const dispatch = useDispatch();

    const deleteExpense = async (deletingExpense)=>{
        try {
            const response = await fetch(`https://expense-tracker-10oct-default-rtdb.firebaseio.com/expenses/${userName}/${deletingExpense.id}.json`,{
                method: 'DELETE'
            })
            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.error.message);
            }
            dispatch(expenseActions.removeExpense(deletingExpense));
            
        } catch (error) {
            alert(error)
        }
    }
    const editExpense = (editingExpense)=>{
        dispatch(expenseActions.editExpense(editingExpense));
    }
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
                {expenses.map((expense,index)=>(
                    <tr key={index} style={{textAlign:'center'}}>
                        <td>{expense.amount}</td>
                        <td>{expense.description}</td>
                        <td>{expense.category}</td>
                        <td style={{display:"flex",justifyContent:'space-evenly'}}>
                        <Button variant="primary"className='mx-2' onClick={editExpense.bind(null,expense)}>Edit</Button>
                        <Button variant="danger" className='mx-2' onClick={deleteExpense.bind(null,expense)}>Delete</Button></td>
        
                    </tr>
                ))}
            </tbody>
        </Table>
    </div>
  )
}

export default ExpenseList