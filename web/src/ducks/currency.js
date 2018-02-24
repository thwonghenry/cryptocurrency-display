import processResponse from '../lib/processResponse';
import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import moment from 'moment';

const namespace = 'currency';

export const LOADING = `${namespace}/LOADING`;
export const LOADED = `${namespace}/LOADED`;

export const loadingData = () => ({
    type: LOADING
});

export const loadedData = (data) => ({
    type: LOADED,
    data
});

export const fetchData = () => async (dispatch) => {
    try {
        const data = await fetch(`http://${process.env.API_ENDPOINT}/data`).then(processResponse);
        dispatch(loadedData(data));
        return data;
    } catch (error) {
        // eslint-disable-next-line
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
        if (!action.data || !action.data.forEach) {
            return state;
        }
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

export const lastUpdatedTime = createSelector(
    currencyData,
    (currencyData) => {
        if (!currencyData) {
            return false;
        }
        const lastUpdatedTime = Math.max(
            ...(
                Object.keys(currencyData)
                    .map((pair) => currencyData[pair].timestamp)
                    .filter(timestamp => timestamp > 0)
            )
        );
        return moment.unix(lastUpdatedTime).format('LL LTS');
    }
);

export const availableCurrencies = createSelector(
    currencyData,
    (currencyData) => Object.keys(currencyData).sort()
);

export const currencyInfo = createSelector(
    (state, props) => props.pair,
    currencyData,
    (pair, currencyData) => currencyData[pair]
);
