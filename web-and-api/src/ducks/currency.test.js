import 'whatwg-fetch';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as currency from './currency';
import reducer from './currency';

const mockStore = configureMockStore([ thunk ]);

const sampleResponse = [
    {
        'pair': 'eth-usd',
        'timestamp': 1507993802,
        'base': 'ETH',
        'target': 'USD',
        'price': '341.37512417',
        'volume': '269938.47949139',
        'change': '0.33517305'
    },
    {
        'pair': 'btc-usd',
        'timestamp': 1507993802,
        'base': 'BTC',
        'target': 'USD',
        'price': '5745.11466768',
        'volume': '25513.27444222',
        'change': '57.76877656'
    },
    {
        'pair': 'ltc-usd',
        'timestamp': 1507993802,
        'base': 'LTC',
        'target': 'USD',
        'price': '63.40435592',
        'volume': '226070.81877830',
        'change': '2.55273745'
    },
    {
        'pair': 'xmr-usd',
        'timestamp': 1507993802,
        'base': 'XMR',
        'target': 'USD',
        'price': '95.17843074',
        'volume': '72162.44111036',
        'change': '0.04190510'
    },
    {
        'pair': 'xrp-usd',
        'timestamp': 1507993802,
        'base': 'XRP',
        'target': 'USD',
        'price': '0.25674620',
        'volume': '106357464.22197001',
        'change': '-0.00223847'
    },
    {
        'pair': 'doge-usd',
        'timestamp': 1507993741,
        'base': 'DOGE',
        'target': 'USD',
        'price': '0.00106686',
        'volume': '333532905.26309001',
        'change': '0.00001229'
    },
    {
        'pair': 'dash-usd',
        'timestamp': 1507993802,
        'base': 'DASH',
        'target': 'USD',
        'price': '309.67920738',
        'volume': '4029.38732213',
        'change': '1.45671246'
    },
    {
        'pair': 'maid-usd',
        'timestamp': 1507993802,
        'base': 'MAID',
        'target': 'USD',
        'price': '0.39359781',
        'volume': '',
        'change': '0.00299089'
    },
    {
        'pair': 'lsk-usd',
        'timestamp': 1507993802,
        'base': 'LSK',
        'target': 'USD',
        'price': '4.63400949',
        'volume': '',
        'change': '-0.08671509'
    },
    {
        'pair': 'sjcx-usd',
        'timestamp': 1507993802,
        'base': 'SJCX',
        'target': 'USD',
        'price': '0.49925046',
        'volume': '',
        'change': '-0.00203220'
    }
];

afterEach(() => {
    fetchMock.restore();
});

test('should create loading action', () => {
    const expected = {
        type: currency.LOADING
    };
    expect(currency.loadingData()).toEqual(expected);
});

test('should create loaded action', () => {
    const data = [{ test: 'test '}];
    const expected = {
        type: currency.LOADED,
        data
    };
    expect(currency.loadedData(data)).toEqual(expected);
});

test('should create loaded action after fetched', async () => {
    fetchMock.get('/data', () => sampleResponse);
    
    const expectedActions = [
        { type: currency.LOADED, data: sampleResponse }
    ];

    const store = mockStore({ currencyData: {} });

    await store.dispatch(currency.fetchData());

    expect(store.getActions()).toEqual(expectedActions);
});

test('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
        isLoading: true,
        currencyData: {}
    });
});

test('should handle loading state', () => {
    const newState = reducer(undefined, {
        type: currency.LOADED,
        data: sampleResponse
    });
    const currencyDataState = {};
    sampleResponse.forEach((currency) => {
        currencyDataState[currency.pair] = currency;
    });
    expect(newState).toEqual({
        isLoading: false,
        currencyData: currencyDataState
    });
});