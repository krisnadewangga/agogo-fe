import css from 'dom-css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import "./ShadowScrollbars.scss";

class ShadowScrollbars extends Component {

    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {
            top: 0,
            scrollTop: 0,
            scrollHeight: 0,
            clientHeight: 0
        };
        this.handleUpdate = this.handleUpdate.bind(this);
        this.renderThumb = this.renderThumb.bind(this);
    }

    handleUpdate(values) {
        const { top } = values;
        this.setState({ top });
        const { shadowTop, shadowBottom } = this.refs;
        const { scrollTop, scrollHeight, clientHeight } = values;
        const shadowTopOpacity = 1 / 20 * Math.min(scrollTop, 20);
        const bottomScrollTop = scrollHeight - clientHeight;
        const shadowBottomOpacity = 1 / 20 * (bottomScrollTop - Math.max(scrollTop, bottomScrollTop - 20));
        css(shadowTop, { opacity: shadowTopOpacity });
        css(shadowBottom, { opacity: shadowBottomOpacity });
    }

    renderThumb({ style, ...props }) {
        const { top } = this.state;
        const thumbStyle = {
            right: '3px',
            backgroundColor: 'rgba(0,0,0,.15)',
            // backgroundColor: 'rgba(152,48,37,.15)',
            borderRadius: '3px'
        };
        return (
            <div
                style={{ ...style, ...thumbStyle }}
                {...props}/>
        );
    }

    render() {
        const { style, ...props } = this.props;
        const containerStyle = {
            ...style,
            position: 'relative'
        };
       
        return (
            <div className="ShadowScrollbars">
                <Scrollbars
                    renderThumbHorizontal={this.renderThumb}
                    renderThumbVertical={this.renderThumb}
                    ref="scrollbars"
                    onUpdate={this.handleUpdate}
                    {...props}/>
                <div className={this.props.isBlack ? "shadow-top black" : "shadow-top white" }
                    ref="shadowTop" />
                <div className={this.props.isBlack ? "shadow-bottom black" : "shadow-bottom white" }
                    ref="shadowBottom" />
            </div>
        );
    }
}

ShadowScrollbars.propTypes = {
    style: PropTypes.object
};

export default ShadowScrollbars;