import React, { PureComponent } from 'react';
import CurrencyInfoListContainer from '../components/CurrencyInfoListContainer';

class Home extends PureComponent {
    render() {
        return (
            <div className="container">
                <h1>Cryptocurrency Realtime Price</h1>
                <CurrencyInfoListContainer />
            </div>
        );
    }
}

export default Home;