import React from "react";
import debounce from "lodash.debounce"; // 4.0.8

export const withPreventDoubleClick = (WrappedComponent) => {
  class PreventDoubleClick extends React.PureComponent {
    debouncedOnPress = () => {
      this.props.onPress && this.props.onPress();
    };

    onPress = debounce(
      this.debouncedOnPress,
      500,
      { leading: true, trailing: false },
    );

    render() {
      return <WrappedComponent {...this.props} onPress={this.onPress} />;
    }
  }

  const displayName = WrappedComponent.displayName || WrappedComponent.name;
  PreventDoubleClick.displayName = `withPreventDoubleClick(${displayName})`;

  return PreventDoubleClick;
};
