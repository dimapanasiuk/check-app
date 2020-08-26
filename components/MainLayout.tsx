import React from "react";
import Link from "next/link";
import Head from "next/head";

import styles from "../styles/MainLayout.module.scss";

import { LoginOutlined } from "@ant-design/icons";
import { Layout, Menu, Typography, Button } from "antd";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

interface IMainLayout {
  title: string;
  children: React.ReactNode;
}

const MainLayout: React.FC<IMainLayout> = ({
  children,
  title,
}: IMainLayout) => {
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

          <Menu
            theme="dark"
            mode="horizontal"
            // defaultSelectedKeys={["1","2","3"]}
            className={styles.links}
          >
            <Menu.Item key="1">
              <Link href="/">
                <a>cabinet</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link href="/create">
                <a>Create task</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link href="/tasks">
                <a>Tasks</a>
              </Link>
            </Menu.Item>
          </Menu>

          <div className={styles.oauth}>
            <Link href="/login">
              <a>
                <Button type="primary" icon={<LoginOutlined />} size="large">
                  Login
                </Button>
              </a>
            </Link>
          </div>
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
};

export default MainLayout;
