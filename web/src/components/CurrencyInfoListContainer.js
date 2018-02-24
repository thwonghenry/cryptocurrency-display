import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CurrencyInfoList from './CurrencyInfoList.jsx';
import { availableCurrencies, lastUpdatedTime } from '../ducks/currency';
import { fetchData } from '../ducks/currency';

const selector = createStructuredSelector({
    availableCurrencies,
    lastUpdatedTime
});

const mapDispatchToProps = (dispatch) => ({
    fetchData: () => dispatch(fetchData())
});

export default connect(selector, mapDispatchToProps)(CurrencyInfoList);
