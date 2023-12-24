import React, { useContext, useEffect, useRef } from 'react'
import { Button, Form } from 'react-bootstrap'

import classes from './AddExpense.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { expenseActions } from './store/ExpenseSlice';

function AddExpense() {
    const amountRef = useRef();
    const descriptionRef = useRef();
    const categoryRef = useRef();
    const dispatch = useDispatch();
    const userEmail = useSelector(state => state.auth.userEmail);

    const editingExpense = useSelector(state => state.expense.editingExpense);

    const userName = userEmail && userEmail.split("@")[0]; 

    

    useEffect(()=>{
        if(editingExpense){
            amountRef.current.value= editingExpense.amount;
            descriptionRef.current.value =  editingExpense.description;
            categoryRef.current.value=  editingExpense.category;
        }
    },[editingExpense]);
  

    const fetchRequest = async(req={})=> {
        try {
            const endpoint = req.id ? `/${req.id}` : ''  ;                                                    
            const response = await fetch(`https://expense-tracker-10oct-default-rtdb.firebaseio.com/expenses/${userName}${endpoint}.json`,{
                method: req.method ? req.method : 'GET',
                body: req.body ? JSON.stringify(req.body) : null,
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.error.message);
            }
            const data = await response.json();
            return data;

        } catch (error) {
            alert(error);
        }
    }
    useEffect(()=>{
        const getData = async()=>{
            const data = await fetchRequest();
            const loadedData = [];
            for (let key in data){
                loadedData.push({...data[key],id:key})
            }
            dispatch(expenseActions.replaceExpenses(loadedData));
        }
        getData();
    },[])
    
    const submitHandler = async(event)=>{
        try {
            event.preventDefault();
            const expenseList = {
                amount: amountRef.current.value,
                description : descriptionRef.current.value,
                category : categoryRef.current.value
            }
            if(editingExpense){
                await fetchRequest({method:"PUT",body: expenseList,id:editingExpense.id});
                dispatch(expenseActions.updateExpense({...expenseList,id: editingExpense.id}));
                // expenseCtx.updateExpenseHandler({...expenseList,id:expenseCtx.isEdit.id})
                clearFields();
                return;
            }
            // expenseCtx.addExpense(expenseList);
            const data = await fetchRequest({method:"POST",body:expenseList});
            console.log(data,'insubmithandler');
            dispatch(expenseActions.addExpense({...expenseList,id:data.name}));
            clearFields()

        } catch (error) {
            console.log(error);
        }
        
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
                    <Button variant={editingExpense ? 'warning' : 'primary'}  type='submit' className='mt-3'>{!editingExpense ? "Add Expense" : "Update"}</Button>
                </div>
            </Form>
        </div>
    </section>
  )
}

export default AddExpense