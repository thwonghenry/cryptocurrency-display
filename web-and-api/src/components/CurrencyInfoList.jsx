import React, { PureComponent } from 'react';
import CurrencyInfoContainer from './CurrencyInfoContainer';

class CurrentInfoList extends PureComponent {
    componentDidMount() {
        this.props.fetchData();
    }

    render() {
        const { availableCurrencies } = this.props;
        return <ul>
            {
                availableCurrencies.map((pair) => <CurrencyInfoContainer pair={ pair } key={ pair } />)
            }
        </ul>;
    }
}

export default CurrentInfoList;