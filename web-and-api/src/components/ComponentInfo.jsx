import React, { PureComponent } from 'react';

class ComponentInfo extends PureComponent {
    render () {
        return <div> { JSON.stringify(this.props.pair) }</div>;
    }
}

export default ComponentInfo;
