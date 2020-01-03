import React, { Component } from 'react';

import Hint from './Hint';

class HintSection extends Component {
    constructor() {
        super();
        this.state = {
            hintIDs: ['348E6VILsWPo8dO6aMJfqI', '5ccsEwASPP5PIR8IlAVgV6'],
            currentHint: null
        }

        this.expandHint = this.expandHint.bind(this);
        this.shrinkHint = this.shrinkHint.bind(this);
    }

    expandHint = (hintID) => {
        this.setState({
            currentHint: hintID
        });
    }

    shrinkHint = (hintID) => {
        this.setState({
            currentHint: null
        });
    }

    render() {
        const hints = this.state.hintIDs.map(hintID => {
            const currentHint = this.state.currentHint;
            const display = (!currentHint || hintID === currentHint) ? true : false;
            const renderedHint = (
                <Hint key={`hint-${hintID}`}
                    id={hintID}
                    display={display}
                    changeTotalGems={this.props.changeTotalGems}
                    expandHint={this.expandHint}
                    shrinkHint={this.shrinkHint} />)
            return renderedHint;
        })

        return (
            <div>
                {hints}
            </div >
        )
    }
}

export default HintSection;