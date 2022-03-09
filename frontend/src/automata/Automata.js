import './Automata.css';
import { Layout, Menu } from 'antd';
import { Outlet, Link } from 'react-router-dom';
import { BuildOutlined, FolderViewOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;


export function Automata () {
  return(
    <div>
      <Header>
        <h1>Elementary Cellular Automata</h1>
      </Header>
      <Content>
        <Menu
          style={{ width: 200, height: '100%'}}
          mode='inline'
        >
          <Menu.Item key='1' icon={<BuildOutlined />}>
            <Link to='generate'>Generate</Link>
          </Menu.Item>
          <Menu.Item key='2' icon={<FolderViewOutlined />}>
            <Link to='view'>My Automata</Link>
          </Menu.Item>
        </Menu>
        <Content className='outlet-content'>
          <Outlet />
        </Content>
      </Content>
    </div>
  );
  
}