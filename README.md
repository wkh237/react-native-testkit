# react-native-testkit

<img src="img/preview.gif" width="306" style="display : block; text-align : center"/>

Toolkit for making react native test app. This project is in a very early stage, it could be just a concept of React Native test framework, or merely a toolkit that helps developers build sample app and tests in the same time. If you're getting interested in this module, you may keep reading the following content.

## The Concept

I've made this module when I was developing [react-native-fetch-blob](https://github.com/wkh237/react-native-fetch-blob), a file system and network related React Native module. The module depends heavily on native code, and I was finding a way to test it, but it seems the most practical way to test native modules is run test cases inside a real RN app. Therefore I started to work on this project, something that can build sample app and run test cases at the same time.

Finally I made some components and APIs that make the test cases code could be written in this way

```js
describe('1 + 1 should be 2', (report, done) => {

  let expect = 2
  let actual = 1 + 1
  report(
    <Assert key="1 is a number" expect={'number'} actual={typeof 1} />,
    <Assert key="1 is not greater than 1"
            expect={1}
            comparer={Comparer.notGreater}
            actual={1} />,
    <Assert key="1 + 1 = 2" expect={expect} actual={1 + 1} />,
    <Info>
      <Text>log information on test report</Text>
    </Info>
  )
  done()

})
```

The whole app will be wrapped into a component called `Reporter`, as the test executes, the test report will be displayed.

```js
class SampleTestApp extends Component {

  componentDidMount() {
    // execute tests
    RNTestKit.run(this)
  }

  render() {
    return <RNTest.Reporter />
  }

}
```

## Install

```sh
$ npm install --save react-native-testkit
```

## Example

Check tests in [react-native-fetch-blob](https://github.com/wkh237/react-native-fetch-blob/tree/master/test).

## API

### run(`ctx`)

Run test cases.

#### ctx:ReactNativeElementContext
The container of `Reporter` component.

### describe(`name`, (`report`, `done`) => void)

Define a test case named `name`, and a test body in 2nd argument.

### config(options)

Returns a `describe` function that overrides default options, here's an example

```js
let describeForFoo = TestKit.config({
  // timeout of test case
  timeout : 9000,
  // run test case automatically or not
  run : false,
  // test case group name, default to `common`
  group : 'Foo',
  // expand report only when test case failed, by default it always expands
  expand : 'onFail'
})

describeForFoo('Foo test 1', (report, done) => {

  ...
  done()
})

```

### prop(`name`, `val`)

Set a global test property, useful when test case are separated in different files.

### prop()

Get all test properties.


## Components

### `<Assert expect={any} comparer={(val1, val2) => bool} actual={any} >`

Add an assertion to test case, property `comparer` is optional, by default it compares value in `expect` and `actual` property by using `===` operator.

### `<Info>{...any}</Info>`

A component to log anything in test report.

## TODO

More components and reporters.
