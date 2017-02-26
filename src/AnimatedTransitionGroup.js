// @flow

import React from 'react'
import ReactTransitionGroup from 'react-addons-transition-group'

import { setTimeoutAnimationFrame } from './dom-utils'

type Props = {
  children: any,
  onEmpty?: Function,
  onFull?: Function,
  zeroElements?: number,

  onlyEnter?: boolean,
  name?: string,
  timeout?: number,

  appearTimeout?: number,
  enterTimeout?: number,
  leaveTimeout?: number,

  appearDelay?: number,
  enterDelay?: number,
  leaveDelay?: number,

  onAppear?: Function,
  onEnter?: Function,
  onLeave?: Function,
}

export default class AnimatedTransitionGroup extends React.Component {
  props: Props

  static defaultProps = {
    zeroElements: 0,
    timeout: 0,
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.onEmpty
        && React.Children.count(nextProps.children) === this.props.zeroElements
        && React.Children.count(this.props.children) > this.props.zeroElements
    ) {
      setTimeoutAnimationFrame(this.props.onEmpty, this.props.timeout)
    }

    if (this.props.onFull
        && React.Children.count(nextProps.children) > this.props.zeroElements
        && React.Children.count(this.props.children) === this.props.zeroElements
    ) {
      setTimeoutAnimationFrame(this.props.onFull)
    }
  }

  render() {
    const {
      children,
      onEmpty,      // eslint-disable-line no-unused-vars
      onFull,       // eslint-disable-line no-unused-vars
      zeroElements, // eslint-disable-line no-unused-vars

      onlyEnter,
      name,
      timeout,

      enterTimeout,
      leaveTimeout,
      appearTimeout,

      enterDelay,
      leaveDelay,
      appearDelay,

      onAppear,
      onEnter,
      onLeave,

      ...props // remaining props will only have what can be passed to <ReactTransitionGroup />
    } = this.props

    return (
      <ReactTransitionGroup {...props}>
        {
          React.Children.map(children, (child) => {
            if (!child) return null // cloneElement won't work on a non-existent child (null will filter it out)

            return React.cloneElement(child, {
              onlyEnter,
              name,
              timeout,

              enterTimeout,
              leaveTimeout,
              appearTimeout,

              enterDelay,
              leaveDelay,
              appearDelay,

              onAppear,
              onEnter,
              onLeave,
              ...child.props,
            })
          }).filter(child => child)
        }
      </ReactTransitionGroup>
    )
  }
}
