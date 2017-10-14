import React, { PureComponent } from 'react';
import styles from './CurrencyInfo.scss';

class CurrencyInfo extends PureComponent {
    render () {
        return <div className={ styles.test }>
            { JSON.stringify(this.props) }
        </div>;
    }
}

export default CurrencyInfo;
