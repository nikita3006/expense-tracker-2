import { createSlice } from "@reduxjs/toolkit";
const active = localStorage.getItem('isActive');

const intialExpenseState = {
    expenses :[],
    editingExpense : null,
    isActive : active,
    darkMode : localStorage.getItem('darkMode'),

}

const expenseSlice = createSlice({
    name : 'expenses',
    initialState: intialExpenseState,
    reducers: {
        addExpense (state,action) {
            // console.log(state, action,'inexpense slice');
            state.expenses.push(action.payload);
        },
        removeExpense (state, action){
            console.log(action,'inexpense slice');
            const deletingExpense = action.payload
            state.expenses = state.expenses.filter((expense)=> expense.id !== deletingExpense.id);
            // state.expenses = updatedExpenses;
        },
        // get data after refreshing replacing expenses with loaded data .
        replaceExpenses (state,action){
            state.expenses = action.payload
        },

        editExpense (state, action){
            state.editingExpense = action.payload;
        },
        updateExpense (state, action){
            const updatingExpense = action.payload 

            state.expenses  = state.expenses.map(
                (expense)=>( expense.id === updatingExpense.id )? updatingExpense : expense
            )
            state.editingExpense = null;
            console.log(action.payload,'in update expense');
        },
        activatePremium (state) {
            // console.log(state.isActive,'in actviepremium')
            state.isActive = true;
            localStorage.setItem('isActive',true);
        },
        darkMode (state,action){
            state.darkMode= true;
            localStorage.setItem('darkMode',state.darkMode)
        },
        lightMode(state,action){
            state.darkMode = false;
            localStorage.removeItem('darkMode');
        },
    },
})

export const expenseActions = expenseSlice.actions;

export default expenseSlice;