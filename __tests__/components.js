import createApp from '../__test-helpers__/createApp'
import allProps from '../__test-helpers__/allProps'


jest.mock('../src/dom-utils', () => ({
  addClass: (component, className, name) => {
    const log = { method: 'addClass', className, name }
    console.log(log)
    expect(log).toMatchSnapshot()
  },
  removeAnimationClasses: (component, name) => {
    const log = { method: 'removeAnimationClasses', name }
    console.log(log)
    expect(log).toMatchSnapshot()
  },
  setTimeoutAnimationFrame: (func, ms, className) => {
    const log = { method: 'setTimeoutAnimationFrame', ms, className }
    console.log(log)
    expect(log).toMatchSnapshot()

    func()
  },
}))


describe('<TransitionGroup /> + <Transition /> -- no props', () => {
  it('appear', () => {
    const app = createApp()

    console.log(app.tree())
    console.log(app.tree().children[0])

    app.snap()

    return app.story()
  })

  it('enter + leave', () => {
    const app = createApp()

    app.snap({ type: 'SWITCH' })

    console.log(app.tree())
    console.log(app.tree().children[0])

    return app.story()
  })

  it('enter + leave -- simple duration (debounced)', () => {
    const app = createApp({ duration: 500 })

    app.snap({ type: 'SWITCH' })

    console.log(app.tree())
    console.log(app.tree().children[0])

    return app.story()
  })
})


describe('<TransitionGroup /> -- all props filled', () => {
  it('appear', () => {
    const onAppear = jest.fn()
    const app = createApp(allProps({ onAppear }))

    console.log(app.tree())
    console.log(app.tree().children[0])

    expect(onAppear).toBeCalled()

    app.snap()

    return app.story()
  })

  it('beforeAppear', () => {
    const onBeforeAppear = jest.fn()
    const app = createApp(allProps({ onBeforeAppear }))

    console.log(app.tree())
    console.log(app.tree().children[0])

    expect(onBeforeAppear).toBeCalled()

    app.snap()

    return app.story()
  })

  it('enter', () => {
    const onEnter = jest.fn()
    const app = createApp(allProps({ onEnter }), null, { type: 'EMPTY' })

    app.snap({ type: 'FULL' })

    console.log(app.tree())
    console.log(app.tree().children[0])
    expect(onEnter).toBeCalled()

    return app.story()
  })

  it('beforeEnter', () => {
    const onBeforeEnter = jest.fn()
    const app = createApp(allProps({ onBeforeEnter }), null, { type: 'EMPTY' })

    app.snap({ type: 'FULL' })

    console.log(app.tree())
    console.log(app.tree().children[0])
    expect(onBeforeEnter).toBeCalled()

    return app.story()
  })

  it('leave', () => {
    const onLeave = jest.fn()
    const app = createApp(allProps({ onLeave }))

    app.snap({ type: 'EMPTY' })

    console.log(app.tree())
    expect(onLeave).toBeCalled()

    return app.story()
  })

  it('beforeLeave', () => {
    const onBeforeLeave = jest.fn()
    const app = createApp(allProps({ onBeforeLeave }))

    app.snap({ type: 'EMPTY' })

    console.log(app.tree())
    expect(onBeforeLeave).toBeCalled()

    return app.story()
  })

  it('onFull callback', () => {
    const onFull = jest.fn()
    const app = createApp({ onFull }, null, { type: 'EMPTY' })

    console.log(app.tree())
    app.snap({ type: 'FULL' })

    console.log(app.tree())
    expect(onFull).toBeCalled()

    return app.story()
  })

  it('onEmpty callback', () => {
    const onEmpty = jest.fn()
    const app = createApp({ onEmpty })

    console.log(app.tree())
    app.snap({ type: 'EMPTY' })

    console.log(app.tree())
    expect(onEmpty).toBeCalled()

    return app.story()
  })
})


describe('<Transition /> -- all props filled', () => {
  it('appear', () => {
    const onAppear = jest.fn()
    const app = createApp({}, allProps({ onAppear }))

    console.log(app.tree())
    console.log(app.tree().children[0])

    expect(onAppear).toBeCalled()

    app.snap()

    return app.story()
  })

  it('beforeAppear', () => {
    const onBeforeAppear = jest.fn()
    const app = createApp({}, allProps({ onBeforeAppear }))

    console.log(app.tree())
    console.log(app.tree().children[0])

    expect(onBeforeAppear).toBeCalled()

    app.snap()

    return app.story()
  })

  it('enter', () => {
    const onEnter = jest.fn()
    const app = createApp({}, allProps({ onEnter }), { type: 'EMPTY' })

    app.snap({ type: 'FULL' })

    console.log(app.tree())
    console.log(app.tree().children[0])
    expect(onEnter).toBeCalled()

    return app.story()
  })

  it('beforeEnter', () => {
    const onBeforeEnter = jest.fn()
    const app = createApp({}, allProps({ onBeforeEnter }), { type: 'EMPTY' })

    app.snap({ type: 'FULL' })

    console.log(app.tree())
    console.log(app.tree().children[0])
    expect(onBeforeEnter).toBeCalled()

    return app.story()
  })

  it('leave', () => {
    const onLeave = jest.fn()
    const app = createApp({}, allProps({ onLeave }))

    app.snap({ type: 'EMPTY' })

    console.log(app.tree())
    expect(onLeave).toBeCalled()

    return app.story()
  })

  it('beforeLeave', () => {
    const onBeforeLeave = jest.fn()
    const app = createApp({}, allProps({ onBeforeLeave }))

    app.snap({ type: 'EMPTY' })

    console.log(app.tree())
    expect(onBeforeLeave).toBeCalled()

    return app.story()
  })
})
