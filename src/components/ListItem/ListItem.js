import React, {Component} from 'react';
import './ListItem.css';

class ListItem extends Component {

    shouldComponentUpdate(nextProps) {
        return (this.props.value !== nextProps.value);
    }

    render() {
        return (
            <div>
                <input type="text" value={this.props.value} onChange={this.props.change}/>
                <button type="button" onClick={this.props.remove}>Del</button>
            </div>
        );
    }
}

export default ListItem;