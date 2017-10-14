import React, { PureComponent } from 'react';
import CurrencyInfoContainer from './CurrencyInfoContainer';
import styles from './CurrencyInfoList.scss';

class CurrentInfoList extends PureComponent {
    componentDidMount() {
        this.props.fetchData();
        this.interval = setInterval(() => this.props.fetchData(), 60000);
    }

    componentWillUnmount() {
        clearTimeout(this.interval);
    }

    render() {
        const { availableCurrencies, lastUpdatedTime } = this.props;
        return <main>
            <p className={ styles.remarks }>Remarks: The information will refresh every minute</p>
            { lastUpdatedTime && <p className={ styles.remarks }>Last update: { lastUpdatedTime }</p> }
            <ul className={ styles.list }>
                {
                    availableCurrencies.map((pair) => <CurrencyInfoContainer pair={ pair } key={ pair } />)
                }
            </ul>
        </main>;
    }
}

export default CurrentInfoList;