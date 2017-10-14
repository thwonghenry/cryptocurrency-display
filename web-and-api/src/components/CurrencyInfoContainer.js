import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CurrencyInfo from './CurrencyInfo.jsx';
import { currencyInfo } from '../ducks/currency';

const selector = createStructuredSelector({
    currencyInfo
});

export default connect(selector)(CurrencyInfo);
