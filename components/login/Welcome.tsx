import React from "react";
import { Typography } from "antd";

const { Text } = Typography;

import styles from "../../styles/Welcom.module.scss";

const { Title } = Typography;

interface IWelcome {
  imgSrc: string;
  name: string;
}

const Welcome: React.FC<IWelcome> = ({ imgSrc, name }: IWelcome) => {
  if (imgSrc) {
    return (
      <div className={styles.text}>
        <Title level={2}> Hello {name}</Title>
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

export default Welcome;
