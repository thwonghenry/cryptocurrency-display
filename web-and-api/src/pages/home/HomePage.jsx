import React, { PureComponent } from 'react';
import ComponentInfoContainer from '../../components/ComponentInfo.jsx';

class Home extends PureComponent {
    componentDidMount() {
        this.props.fetchData();
    }

    render() {
        const { availableCurrencies } = this.props;
        return (
            <div className="container">
                <h1>Cryptocurrency Realtime Price</h1>
                {
                    availableCurrencies.map((pair) => <ComponentInfoContainer pair={ pair } key={ pair } />)
                }
            </div>
        );
    }
}

export default Home;