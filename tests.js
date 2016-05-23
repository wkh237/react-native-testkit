import RNTest from 'react-native-module-testor'

const {Assert, Info, TestContext} = RNTest
const ctx = new TestContext()

ctx.describe('Typeof Array is Array', async function(status) {

  status({
    result : [
      <Assert expect={true} actual={Array.isArray([])}/>
    ]
  })

})

export default ctx
