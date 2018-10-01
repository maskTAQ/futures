import { Component, Children } from "react";
import PropTypes from "prop-types";

export function createProvider() {
    class Provider extends Component {
        static propTypes = {
            theme: PropTypes.object,
            children: PropTypes.element.isRequired
        };
        static childContextTypes = {
            theme: PropTypes.object
        };
        getChildContext() {
            return { theme: this.props.theme };
        }

        render() {
            return Children.only(this.props.children);
        }
    }

    return Provider;
}

export default createProvider();
