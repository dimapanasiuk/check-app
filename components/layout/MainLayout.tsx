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
  title: string[];
  children: React.ReactNode;
  role: string;
  isAuth?: boolean;
  onLogOutButtonClick: () => void;
}

const MainLayout: React.FC<IMainLayout> = ({
  children,
  title,
  role,
  isAuth,
  onLogOutButtonClick,
}: IMainLayout) => {
  return (
    <>
      <Head>
        <title> {title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout style={{ minHeight: "100vh" }}>
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
            selectedKeys={title}
            className={styles.links}
          >
            {(() => {
              if (role === "admin" || role === "student") {
                return (
                  <Menu.Item key="cabinet">
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
                  <Menu.Item key="create task">
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
                  <Menu.Item key="tasks">
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
                  <Menu.Item key="review">
                    <Link href="/review">
                      <a>review</a>
                    </Link>
                  </Menu.Item>
                );
              }
            })()}
            {(() => {
              if (role === "mentor" || role === "student" || role === "admin") {
                return (
                  <Menu.Item key="score">
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
              {!isAuth ? (
                <a>
                  <Button type="primary" icon={<LoginOutlined />} size="large">
                    Log in
                  </Button>
                </a>
              ) : (
                <a>
                  <Button
                    onClick={onLogOutButtonClick}
                    type="primary"
                    icon={<LoginOutlined />}
                    size="large"
                  >
                    Log out
                  </Button>
                </a>
              )}
            </Link>
          </div>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <div className={styles.siteLayoutContent}>{children}</div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
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
