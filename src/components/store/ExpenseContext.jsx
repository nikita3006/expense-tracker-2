import React, { useState } from 'react'

const ExpenseContext = React.createContext({
    expenses : [],
    addExpense : ()=>{},
})

export const ExpenseContextProvider = (props)=>{
    const [expenses,setExpenses]= useState([]);
    const addExpenseHandler = (obj)=>{
        setExpenses([...expenses,obj]);
    }
    const obj = {
        expenses : expenses,
        addExpense: addExpenseHandler,
    }
    return(
        <ExpenseContext.Provider value={obj}>
            {props.children}
        </ExpenseContext.Provider>
    )
}

export default ExpenseContext