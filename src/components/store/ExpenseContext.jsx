import React, { useEffect, useState } from 'react'

const ExpenseContext = React.createContext({
    expenses : [],
    addExpense : ()=>{},
})

export const ExpenseContextProvider = (props)=>{
    const [expenses,setExpenses]= useState([]);

    useEffect(()=>{
        const fetchData = async ()=>{
            try {
                const response = await fetch('https://expense-tracker-10oct-default-rtdb.firebaseio.com/expenses.json');
                const data = await response.json();
                const loadedData = [];
                for (let key in data){
                    loadedData.push({...data[key],id:key})
                }
                setExpenses(loadedData)
            } catch (error) {
                console.log(error,'in fetchdata')
            }
        }
        fetchData()
    },[]);


    const addExpenseHandler = async(obj)=>{
        try {
            setExpenses([...expenses,obj]);
            const response = await fetch('https://expense-tracker-10oct-default-rtdb.firebaseio.com/expenses.json',{
                method: 'POST',
                body: JSON.stringify(obj),
                headers:{
                    'Content-Type' : 'application/json'
                }
            })
            //failure case
            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.error.message);
                return 
            }
            //success case
            const data = await response.json();
            console.log(data,'inexpense context');
            
        } catch (error) {
            alert(error);
        }
        
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