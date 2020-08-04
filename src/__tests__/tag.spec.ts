import Tag from '../js/tag'

const test_element_factory = (value = '') => ({
  value,
  addEventListener: () => ({})
})

describe('Tag', () => {
  test('Name property tells the component name', () => {
    const test_element = test_element_factory()
    const tag = Tag(test_element)

    expect(tag.name).toBe('tag')
  })

  test('value can be asked through getValue', () => {
    const test_element = test_element_factory('funny')
    const tag = Tag(test_element)

    expect(tag.getValue()).toBe('funny')
  })

  test('default value is empty string', () => {
    const test_element = test_element_factory()
    const tag = Tag(test_element)

    expect(tag.getValue()).toBe('')
  })

  test('can change the value through cahngeTo', () => {
    const test_element = test_element_factory()
    const tag = Tag(test_element)
    const newTag = 'newTag'

    tag.changeTo(newTag)

    expect(tag.getValue()).toBe(newTag)
    expect(test_element.value).toBe(newTag)
  })
})
