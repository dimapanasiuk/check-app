import Link from "next/link";
import Head from "next/head";

//import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from "antd";

const { Header, Content, Footer } = Layout;

export function MainLayout({ children, title = "next app" }) {
  return (
    <>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <div className="site-layout-content">Content</div>
          <main>{children}</main>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </>
  );
}