import Status from '../js/status'

const test_element_factory = () => ({
  textContent: ''
})

describe('Status', () => {
  test('notifyUpdate method shows a notification', () => {
    const test_element = test_element_factory()
    const status = Status(test_element)

    status.notifyUpdate()

    expect(test_element.textContent).toBe('Options saved...')
  })

  test('notifyUpdate method hides notification after 750ms', () => {
    const test_element = test_element_factory()
    const status = Status(test_element)

    jest.useFakeTimers()
    status.notifyUpdate()
    jest.runAllTimers()

    expect(setTimeout.mock.calls.length).toBe(1)
    expect(setTimeout.mock.calls[0][1]).toBe(750)
    expect(test_element.textContent).toBe('')
  })
})
