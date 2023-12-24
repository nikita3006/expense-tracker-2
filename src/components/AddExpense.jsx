import React, { useContext, useRef } from 'react'
import { Button, Form } from 'react-bootstrap'
import ExpenseContext from './store/ExpenseContext';
import classes from './AddExpense.module.css';

function AddExpense() {
    const amountRef = useRef();
    const descriptionRef = useRef();
    const categoryRef = useRef();

    const expenseCtx = useContext(ExpenseContext);
    
    const submitHandler = (event)=>{
        event.preventDefault();
        const expenseList = {
            amount: amountRef.current.value,
            description : descriptionRef.current.value,
            category : categoryRef.current.value
        }
        expenseCtx.addExpense(expenseList);
        amountRef.current.value='';
        descriptionRef.current.value='';
        categoryRef.current.value='';

    }
  return (
    <section>
        <div className={classes.expense}>
            <h2>Daily Expense Tracker</h2>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label>Amount:</Form.Label>   
                    <Form.Control 
                        type="number"
                        placeholder="amount"
                        ref={amountRef}
                        required
                        
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description:</Form.Label>   
                    <Form.Control 
                        type="text"
                        placeholder="Description"
                        ref={descriptionRef}
                        required
                        
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Category:</Form.Label>   
                    <Form.Select as='select' ref={categoryRef} required>
                        <option value="Food">--Choose Category</option>
                        <option value="Food">Food</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Salary">Salary</option>
                    </Form.Select>
                </Form.Group>
                <div>
                    <Button variant='primary' type='submit' className='mt-3'>Add Expense</Button>
                </div>
            </Form>
        </div>
    </section>
  )
}

export default AddExpense