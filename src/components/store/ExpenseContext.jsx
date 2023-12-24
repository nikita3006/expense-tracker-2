import React, { useEffect, useState } from 'react'

const ExpenseContext = React.createContext({
    expenses : [],
    addExpense : ()=>{},
    deleteExpense : ()=>{},
    editExpense : ()=>{},
    isEdit : '',
    updateExpenseHandler : ()=>{}
})

export const ExpenseContextProvider = (props)=>{
    const [expenses,setExpenses]= useState([]);
    const [isEdit , setIsedit] = useState(null);

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
            }
            //success case
            const data = await response.json();
            const newExpenseWithId = {...obj,id:data.name};
            setExpenses([...expenses,newExpenseWithId]);
            console.log(data,'inexpense context');
            
        } catch (error) {
            alert(error);
        }
        
    }

    const updateExpenseHandler =async(updatingExpense)=>{
        try {
            const existingExpenseIndex = expenses.findIndex((expense)=> expense.id === updatingExpense.id)
            const updatedExpenseState =[...expenses];
            updatedExpenseState[existingExpenseIndex]= updatingExpense;
            setExpenses(updatedExpenseState); 
            setIsedit(null);
            const response = await fetch(`https://expense-tracker-10oct-default-rtdb.firebaseio.com/expenses/${updatingExpense.id}.json`,{
                method:'PUT',
                body:JSON.stringify(updatingExpense),
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.error.message);
            }
            const data = await response.json();
        } catch (error) {
            alert(error);
        }
        
    }

    const deleteExpenseHandler =async(deletingExpense)=>{
        try {
            console.log(deletingExpense.id,'deletehandler');
            const updatedExpense = expenses.filter((expense)=> expense.id !== deletingExpense.id);
            const response = await fetch(`https://expense-tracker-10oct-default-rtdb.firebaseio.com/expenses/${deletingExpense.id}.json`,{
                method:"DELETE",
                body:JSON.stringify(deletingExpense),
                headers: {
                    'Content-Type':'application/json'
                }
            })
            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.error.message);
            }
            const data = await response.json();
            setExpenses(updatedExpense);

        } catch (error) {
            alert(error)
        }
        
        
    }
    const editExpenseHandler =(editingExpense)=>{
        setIsedit(editingExpense);

    }

    const obj = {
        expenses : expenses,
        addExpense: addExpenseHandler,
        deleteExpense : deleteExpenseHandler,
        editExpense: editExpenseHandler,
        isEdit: isEdit,
        updateExpenseHandler: updateExpenseHandler
    }
    return(
        <ExpenseContext.Provider value={obj}>
            {props.children}
        </ExpenseContext.Provider>
    )
}

export default ExpenseContext