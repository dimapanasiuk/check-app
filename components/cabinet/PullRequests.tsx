import React from "react";
import { useQuery } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";

import { useDispatch } from "react-redux";

import { GET_ALL_PR } from "./graphs/pullRequests";

import { Select } from "antd";
import { Typography } from "antd";
import { WarningTwoTone } from "@ant-design/icons";

import LoadingComponent from "./LoadingComponent";
import { changePullRequest } from "../../redux/actions/CabinetActions/pullRequestAction";
import ErrorComponent from "./ErrorComponent";

const { Title } = Typography;
const { Option } = Select;

interface IChoosePR {
  title: string;
  login: string;
  selectedRepo: string | null;
  selectedPR: string | null;
  onHandlePRUrlChange: (value: string) => void;
  onHandlePRSelect: (value: string) => void;
  setFailed: () => void;
}

const PullRequests: React.FC<IChoosePR> = ({
  title,
  login,
  selectedRepo,
  selectedPR,
  setFailed,
  onHandlePRUrlChange,
  onHandlePRSelect
}: IChoosePR) => {
  const dispatch = useDispatch();

  const pr = useQuery(GET_ALL_PR, {
    variables: {
      repo_name: selectedRepo,
      login,
    },
  });

  if (pr.loading) return <LoadingComponent />;
  if (pr.error) {
    setFailed();
    return <ErrorComponent />;
  }

  const pullRequests = pr.data.repository.pullRequests.nodes;
  dispatch(changePullRequest(pullRequests));
  const pullReqUrl =
    selectedPR &&
    pullRequests.map((item) => {
      if (item.title === selectedPR.slice(0, -1)) return item.url;
    });
  const pullReqNumber = selectedPR && parseInt(selectedPR.slice(-1));
  selectedPR && onHandlePRUrlChange(pullReqUrl[pullReqNumber - 1]);

  return (
    <>
      <Title style={{ marginTop: "20px" }} level={2}>
        {title}
      </Title>
      {pullRequests.length === 0 ? (
        <h1 style={{ margin: "20px 0 20px" }}>No Pull Requests</h1>
      ) : (
        <React.Fragment>
          <Select
            value={selectedPR}
            showSearch
            style={{ width: 200 }}
            onChange={onHandlePRSelect}
            placeholder={"Select pull request"}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {pullRequests.map((item) => {
              const pullReqNumber = item.url.slice(-1);
              const value = item.title + pullReqNumber;
              return (
                <Option key={uuidv4()} value={value}>
                  {item.title} #{pullReqNumber}
                </Option>
              );
            })}
          </Select>
          {selectedPR && (
            <React.Fragment>
              <div style={{ marginTop: "20px" }}>
                <WarningTwoTone twoToneColor="#fcdd76" /> Please check your pull
                request!
              </div>
              <div style={{ marginTop: "15px" }}>
                <a href={pullReqUrl[pullReqNumber - 1]}>
                  {pullReqUrl[pullReqNumber - 1]}
                </a>
              </div>
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </>
  );
};
export default PullRequests;
