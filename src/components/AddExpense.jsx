import React, { useContext, useEffect, useRef } from 'react'
import { Button, Form } from 'react-bootstrap'
import ExpenseContext from './store/ExpenseContext';
import classes from './AddExpense.module.css';

function AddExpense() {
    const amountRef = useRef();
    const descriptionRef = useRef();
    const categoryRef = useRef();

    const expenseCtx = useContext(ExpenseContext);

    useEffect(()=>{
        if(expenseCtx.isEdit){
            amountRef.current.value=expenseCtx.isEdit.amount;
            descriptionRef.current.value = expenseCtx.isEdit.description;
            categoryRef.current.value= expenseCtx.isEdit.category;
        }
    })
    
    const submitHandler = (event)=>{
        event.preventDefault();
        const expenseList = {
            amount: amountRef.current.value,
            description : descriptionRef.current.value,
            category : categoryRef.current.value
        }
        if(expenseCtx.isEdit){
            expenseCtx.updateExpenseHandler({...expenseList,id:expenseCtx.isEdit.id})
            clearFields();
            return;
        }
        expenseCtx.addExpense(expenseList);
        clearFields()
    }
    const clearFields = ()=>{
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
                        <option value="" hidden>--Choose Category</option>
                        <option value="Food">Food</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Salary">Salary</option>
                    </Form.Select>
                </Form.Group>
                <div>
                    <Button variant={expenseCtx.isEdit ? 'warning' : 'primary'}  type='submit' className='mt-3'>{!expenseCtx.isEdit ? "Add Expense" : "Update"}</Button>
                </div>
            </Form>
        </div>
    </section>
  )
}

export default AddExpense