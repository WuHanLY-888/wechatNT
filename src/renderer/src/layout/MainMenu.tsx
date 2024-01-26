import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import React, { useState } from 'react'
import './index.less'
import { useNavigate, useLocation } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number]
function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
): MenuItem {
    return {
        key,
        icon,
        children,
        label
    } as MenuItem
}
const items: MenuItem[] = [
    getItem('ipc通信', '/ipcCommunication', <PieChartOutlined />),
    getItem('Antv Larkmap', '/map', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('page2', '/page2'),
        getItem('Bill', '4'),
        getItem('Alex', '5', <UserOutlined />, [getItem('Son', 'path')])
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />)
]

const App: React.FC = () => {
    const navigateTo = useNavigate()
    const menuClick = (e: { key: string }) => {
        //   console.log(e.key);
        // 编程式导航跳转
        navigateTo(e.key)
    }

    const currentRoute = useLocation()

    const [openKeys, setOpenkeys] = useState([''])
    const handleOpenChange = (key: Array<string>) => {
        setOpenkeys([key[key.length - 1]])
    }
    return (
        <Menu
            theme="dark"
            defaultSelectedKeys={[currentRoute.pathname]}
            mode="inline"
            items={items}
            onClick={menuClick}
            onOpenChange={handleOpenChange}
            openKeys={openKeys}
        />
    )
}

export default App
