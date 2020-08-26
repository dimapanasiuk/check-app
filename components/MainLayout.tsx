import Link from "next/link";
import Head from "next/head";

import styles from "../styles/BasicLayout.module.scss";

import { Layout, Menu, Typography } from "antd";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

export function MainLayout({ children, title = "next app" }) {
  return (
    <>
      <Layout style={{ height: "100vh" }}>
        <Header className={styles.header}>
          <Link href="/">
            <a>
              <Title mark level={2} className={styles.logo}>
                RS School
              </Title>
            </a>
          </Link>

          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <div className="site-layout-content">{children}</div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </>
  );
}
