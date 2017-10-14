import React, { PureComponent } from 'react';
import CurrencyInfoContainer from './CurrencyInfoContainer';
import styles from './CurrencyInfoList.scss';

class CurrentInfoList extends PureComponent {
    componentDidMount() {
        this.props.fetchData();
    }

    render() {
        const { availableCurrencies } = this.props;
        return <ul className={ styles.list }>
            {
                availableCurrencies.map((pair) => <CurrencyInfoContainer pair={ pair } key={ pair } />)
            }
        </ul>;
    }
}

export default CurrentInfoList;