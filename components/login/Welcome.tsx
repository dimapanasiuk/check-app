import React from "react";
import { Typography } from "antd";
import { connect } from "react-redux";

const { Text } = Typography;

import styles from "../../styles/Welcom.module.scss";

const { Title } = Typography;

interface IWelcome {
  imgSrc: string;
  login: string;
  isAuth: boolean;
}

const Welcome: React.FC<IWelcome> = ({ imgSrc, login, isAuth }: IWelcome) => {
  if (imgSrc && isAuth) {
    return (
      <div className={styles.text}>
        <Title level={2}> Hello {login}</Title>
        <img className={styles.images} src={imgSrc} />
      </div>
    );
  }
  return (
    <div className={styles.text}>
      <Title level={2}> Welcome to our app</Title>
      <Title level={3}>
        {" "}
        Please enter the app using your <Text mark>github id</Text>
      </Title>
    </div>
  );
};

const mapStateToProps = (state) => ({ login: state.chooseRole.login });

export default connect(mapStateToProps)(Welcome);
