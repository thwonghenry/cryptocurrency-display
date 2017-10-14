import React, { PureComponent } from 'react';
import styles from './CurrencyInfo.scss';
import cn from 'classnames';

const sliceNumber = (number, length) => {
    let string = number.toString().slice(0, length);
    if (string[string.length - 1] === '.') {
        string = number.toString(0, -1);
    }
    return string;
};

class CurrencyInfo extends PureComponent {
    render () {
        let {
            currencyInfo: { base,
                price,
                volume,
                change
            }
        } = this.props;
        let changeClassName = '';
        if (change > 0) {
            changeClassName = styles.positive;
        } else if (change < 0) {
            changeClassName = styles.negative;
        }

        change = sliceNumber(change, 13);
        volume = sliceNumber(volume, 13);
        return <li className={ styles.container }>
            <h2 className={ styles.base }>{ base }</h2>
            <p className={ styles.price }>{ price }</p>
            { volume && <div className={ styles['sub-container'] }>
                <h4 className={ styles['sub-title'] }>Volume:</h4>
                <p className={ styles.volume }>{ volume }</p>
            </div> }
            <div className={ styles['sub-container'] }>
                <h4 className={ styles['sub-title'] }>Change:</h4>
                <p className={ cn(styles.change, changeClassName) }>{ change }</p>
            </div>
        </li>;
    }
}

export default CurrencyInfo;
