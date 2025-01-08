
import { useLaunch } from '@tarojs/taro'
// import '@nutui/nutui-react-taro/dist/style.css'
import './app.scss'
import {useNavigation} from './hooks/useNavigation'
import { useSafeInfo } from './hooks/useSystemInfo'

function App({ children }) {
  useLaunch(() => {
    useSafeInfo().initInfo()
    useNavigation().initNavigationInfo()
  })

  // children 是将要会渲染的页面
  return children
}
  


export default App
