import React from "react";
import Link from "next/link";
import Head from "next/head";
import { connect } from "react-redux";

import styles from "../../styles/MainLayout.module.scss";

import { LoginOutlined } from "@ant-design/icons";
import { Layout, Menu, Typography, Button } from "antd";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

interface IMainLayout {
  title: string;
  children: React.ReactNode;
  role: string;
}

const MainLayout: React.FC<IMainLayout> = ({
  children,
  title,
  role,
}: IMainLayout) => {
  return (
    <>
      <Head>
        <title> {title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout style={{ minHeight: "100vh" }}>
        <Header >
          <div className={`${styles.container} ${styles.header}`}>
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
              {(() => {
                if (role === "admin" || role === "student") {
                  return (
                    <Menu.Item key="1">
                      <Link href="/">
                        <a>cabinet</a>
                      </Link>
                    </Menu.Item>
                  );
                }
              })()}
              {(() => {
                if (role === "mentor" || role === "admin") {
                  return (
                    <Menu.Item key="2">
                      <Link href="/create">
                        <a>create task</a>
                      </Link>
                    </Menu.Item>
                  );
                }
              })()}
              {(() => {
                if (role === "admin" || role === "mentor" || role === "student") {
                  return (
                    <Menu.Item key="3">
                      <Link href="/tasks">
                        <a>tasks</a>
                      </Link>
                    </Menu.Item>
                  );
                }
              })()}
              {(() => {
                if (role === "admin" || role === "mentor" || role === "student") {
                  return (
                    <Menu.Item key="4">
                      <Link href="/review">
                        <a>review</a>
                      </Link>
                    </Menu.Item>
                  );
                }
              })()}
              {(() => {
                if (role === "admin" || role === "student") {
                  return (
                    <Menu.Item key="5">
                      <Link href="/dashboard">
                        <a>dashboard</a>
                      </Link>
                    </Menu.Item>
                  );
                }
              })()}
              {(() => {
                if (role === "mentor" || role === "student" || role === "admin") {
                  return (
                    <Menu.Item key="6">
                      <Link href="/score">
                        <a>score</a>
                      </Link>
                    </Menu.Item>
                  );
                }
              })()}
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
          </div>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <div className={`site-layout-content ${styles.container}`} >{children}</div>
        </Content>
        <Footer style={{ textAlign: "center" }} className={styles.container}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </>
  );
};

const mapStateToProps = (state) => {
  return { role: state.chooseRole.role };
};

export default connect(mapStateToProps)(MainLayout);
