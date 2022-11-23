import React from "react";
import debounce from "lodash.debounce"; // 4.0.8
import { PropTypes } from "prop-types";

export const withPreventDoubleClick = (WrappedComponent) => {
  class PreventDoubleClick extends React.PureComponent {

    debouncedOnPress = () => {
      this.props.onPress && this.props.onPress();
    };

    onPress = debounce(this.debouncedOnPress, 500, { leading: true, trailing: false });

    render() {
      return <WrappedComponent {...this.props} onPress={this.onPress} />;
    }
  }

  PreventDoubleClick.propTypes = PropTypes.any;

  PreventDoubleClick.displayName = `withPreventDoubleClick(${WrappedComponent.displayName || WrappedComponent.name})`;
  return PreventDoubleClick;
};
