import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./ShadowScrollbars.scss";

class ShadowScrollbars extends Component {

    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {
            shadowTopOpacity: 0,
            shadowBottomOpacity: 0
        };
        this.scrollRef = React.createRef();
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        this.updateShadowOpacity();
    }

    handleScroll() {
        this.updateShadowOpacity();
    }

    updateShadowOpacity() {
        const node = this.scrollRef.current;
        if (!node) {
            return;
        }

        const { scrollTop, scrollHeight, clientHeight } = node;
        const shadowTopOpacity = 1 / 20 * Math.min(scrollTop, 20);
        const bottomScrollTop = scrollHeight - clientHeight;
        const shadowBottomOpacity = 1 / 20 * (bottomScrollTop - Math.max(scrollTop, bottomScrollTop - 20));

        this.setState({
            shadowTopOpacity,
            shadowBottomOpacity
        });
    }

    render() {
        const { style, autoHeight, autoHeightMin, autoHeightMax, children, className } = this.props;
        const scrollStyle = {
            ...style,
            overflowY: 'auto',
            overflowX: 'hidden'
        };

        if (autoHeight) {
            if (typeof autoHeightMin !== 'undefined') {
                scrollStyle.minHeight = autoHeightMin;
            }
            if (typeof autoHeightMax !== 'undefined') {
                scrollStyle.maxHeight = 'auto';
            }
        }
       
        return (
            <div className="ShadowScrollbars">
                <div
                    ref={this.scrollRef}
                    onScroll={this.handleScroll}
                    style={scrollStyle}
                    className={["shadow-scroll-body", className].filter(Boolean).join(" ")}
                >
                    {children}
                </div>
                <div className={this.props.isBlack ? "shadow-top black" : "shadow-top white" }
                    style={{ opacity: this.state.shadowTopOpacity }} />
                <div className={this.props.isBlack ? "shadow-bottom black" : "shadow-bottom white" }
                    style={{ opacity: this.state.shadowBottomOpacity }} />
            </div>
        );
    }
}

ShadowScrollbars.propTypes = {
    style: PropTypes.object
};

export default ShadowScrollbars;