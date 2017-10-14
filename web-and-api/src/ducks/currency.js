import processResponse from '../lib/processResponse';
import { combineReducers } from 'redux';
import { createSelector } from 'reselect';

const namespace = 'currency';

const LOADING = `${namespace}/LOADING`;
const LOADED = `${namespace}/LOADED`;

export const loadingData = () => ({
    type: LOADING
});

export const loadedData = (data) => ({
    type: LOADED,
    data
});

export const fetchData = () => async (dispatch) => {
    let data;
    try {
        data = await fetch('/data').then(processResponse);
        dispatch(loadedData(data));
        return data;
    } catch (error) {
        console.error(error);
    }
};

const isLoadingReducer = (state = true, action) => {
    switch (action.type) {
    case LOADING:
        return true;
    case LOADED:
        return false;
    default:
        return state;
    }
};

const currencyDataReducer = (state = {}, action) => {
    switch (action.type) {
    case LOADED: {
        const newState = { ...state };
        action.data.forEach((currency) => {
            newState[currency.pair] = currency;
        });
        return newState;
    }
    default:
        return state;
    }
};

export default combineReducers({
    isLoading: isLoadingReducer,
    currencyData: currencyDataReducer
});

export const currencyData = (state) => state.currency.currencyData;

export const availableCurrencies = createSelector(
    currencyData,
    (currencyData) => Object.keys(currencyData).sort()
);

export const currencyInfo = createSelector(
    (state, props) => props.pair,
    currencyData,
    (pair, currencyData) => currencyData[pair]
);
