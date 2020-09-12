import React from "react";
import { useQuery } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";

import { useDispatch } from "react-redux";

import { GET_ALL_PR } from "./graphs/pullRequests";

import { Select, Typography } from "antd";
import { WarningTwoTone, PullRequestOutlined } from "@ant-design/icons";

import { LoadingComponent, ErrorComponent } from "./index";

import { changePullRequest } from "../../redux/actions/CabinetActions/pullRequestAction";
import { IPullRequests } from "./interfaces/pullRequestsInterface";

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
  onHandlePRSelect,
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

  const pullRequests: IPullRequests[] = pr.data.repository.pullRequests.nodes;
  dispatch(changePullRequest(pullRequests));

  const pullReqUrl: string[] =
    selectedPR &&
    pullRequests.map((item) => {
      if (item.title === selectedPR.slice(0, -1)) return item.url;
    });

  const pullReqNumber: number = selectedPR && parseInt(selectedPR.slice(-1));
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
                  <PullRequestOutlined /> {item.title} #{pullReqNumber}
                </Option>
              );
            })}
          </Select>
          {selectedPR && (
            <React.Fragment>
              <h4
                style={{
                  marginTop: "20px",
                  background: "rgba(0, 0, 0, .1)",
                  width: "20%",
                  paddingLeft: "20px",
                }}
              >
                <WarningTwoTone twoToneColor="#fcdd76" /> Please check your pull
                request!
              </h4>
              <h4 style={{ marginTop: "15px" }}>
                <a href={pullReqUrl[pullReqNumber - 1]}>
                  {pullReqUrl[pullReqNumber - 1]}
                </a>
              </h4>
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </>
  );
};
export default PullRequests;
