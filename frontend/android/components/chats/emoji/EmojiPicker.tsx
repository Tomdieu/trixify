import { useWindowDimensions } from 'react-native'
import React, { memo, useState } from 'react'
import categories from '@/constants/categories';
import EmojiCategory from './EmojiCategory';
import { TabView,TabBarProps } from 'react-native-tab-view';
import TabBar from './TabBar';

type Props = {
  onEmojiSelected?:(emoji:string)=>void

}

const EmojiPicker = ({onEmojiSelected}: Props) => {

    const layout = useWindowDimensions();


    const [index,setIndex] = useState(0)

    const [routes,setRoutes] = useState(categories.tabs.map(tab=>({key:tab.category,title:tab.tabLabel})))

    const renderScene = ({route}:{route:any}) => <EmojiCategory onEmojiSelected={onEmojiSelected} category={route.key}/>

  return (
    <TabView 
        renderScene={renderScene}
        renderTabBar={props=><TabBar setIndex={setIndex}  {...props}/>}
        navigationState={{index,routes}}
        initialLayout={{width:layout.width}}
        onIndexChange={setIndex}
        orientation='vertical'
    />
  )
}

export default memo(EmojiPicker)
