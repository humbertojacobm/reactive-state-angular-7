import { createFeatureSelector,
         createSelector } from '@ngrx/store';
import * as customerReducer from '../customers/customers.reducer';
// -------------------------------------------------------------------
// CUSTOMERS SELECTORS
// -------------------------------------------------------------------
export const selectCustomersState
  = createFeatureSelector<customerReducer.CustomersState>('customers');
export const selectAllCustomers
  = createSelector(selectCustomersState, customerReducer.selectAllCustomers);
