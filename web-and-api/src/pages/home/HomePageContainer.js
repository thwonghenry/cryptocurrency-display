import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import HomePage from './HomePage.jsx';
import { availableCurrencies } from '../../ducks/currency';
import { fetchData } from '../../ducks/currency';

const selector = createStructuredSelector({
    availableCurrencies
});

const mapDispatchToProps = (dispatch) => ({
    fetchData: () => dispatch(fetchData())
});

export default connect(selector, mapDispatchToProps)(HomePage);
