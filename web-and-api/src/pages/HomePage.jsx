import React, { PureComponent } from 'react';
import styles from './HomePage.scss';
import CurrencyInfoListContainer from '../components/CurrencyInfoListContainer';

class Home extends PureComponent {
    render() {
        return (
            <div className="container">
                <h1 className={ styles.heading }>Cryptocurrency Realtime Price</h1>
                <CurrencyInfoListContainer />
            </div>
        );
    }
}

export default Home;