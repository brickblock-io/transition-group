// @flow

import ReactDOM from 'react-dom' // eslint-disable-line


export function addClass(component: React$Component<*, *, *>, className: string, name: ?string = '') {
  try {
    const element = ReactDOM.findDOMNode(component)

    className = name ? `${name}-${className}` : className
    element.className = `${element.className}  ${className}`
  }
  catch (e) {
    if (process.env.NODE_ENV !== 'production' && !process.env.STORYBOOK_GIT_BRANCH) {
      console.warn(`AnimatedChild had the following issue adding classes: ${e.toString()}`)
    }
  }
}

export function removeAnimationClasses(component: React$Component<*, *, *>, name: ?string = '') {
  try { // dom node may have been removed if wrapped by an outer animation with a shorter duration (no big deal)
    const element = ReactDOM.findDOMNode(component)
    const classNameReg = !name
      ? 'enter-active|appear-active|enter|appear'
      : `${name}-enter-active|${name}-appear-active|${name}-enter|${name}-appear`

    const re = new RegExp(classNameReg, 'g')
    element.className = element.className.replace(re, '')
  }
  catch (e) {
    if (process.env.NODE_ENV === 'production' && !process.env.STORYBOOK_GIT_BRANCH) {
      console.warn(`AnimatedChild had the following issue removing classes: ${e.toString()}`)
    }
  }
}

export function setTimeoutAnimationFrame(func?: Function, ms?: number = 0) {
  const callback = func
  if (typeof callback !== 'function') return

  setTimeout(() => {
    requestAnimationFrame(callback)
  }, ms)
}
