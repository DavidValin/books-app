'use strict';
import { createStore } from 'redux';
import { initialState } from './initial_state';
import { appReducer } from "./reducers/app_reducer";

/**
 * The state container
 */
export const store = createStore(appReducer, initialState);
