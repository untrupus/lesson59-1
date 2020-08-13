import React, {Component} from 'react';
import './AddField.css'

class AddField extends Component {

    render() {
        return (
            <div>
                <input
                    type="text"
                    placeholder="Add new movie"
                    onChange={this.props.onChange}
                    value={this.props.value}
                />
                <button type="button" onClick={this.props.click}>Add</button>
            </div>
        );
    }
}

export default AddField;