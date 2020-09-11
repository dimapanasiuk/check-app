import React from "react";

import { Button, message } from "antd";

interface ISteps {
  title: string;
  content: JSX.Element;
}

interface ICabinetButtons {
  currentPage: number;
  checkSelects: (pageID: number) => void;
  next: () => void;
  checkIsFailedForPrev: () => void;
  addCompletedTaskToDB?: () => void;
  steps: ISteps[];
}

const CabinetButtons: React.FC<ICabinetButtons> = ({
  checkIsFailedForPrev,
  currentPage,
  checkSelects,
  next,
  steps,
  addCompletedTaskToDB,
}: ICabinetButtons) => {
  return (
    <div>
      <div className="steps-action" style={{ marginTop: "20px" }}>
        {currentPage < steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => {
              currentPage === 0 && checkSelects(currentPage);
              currentPage === 1 && checkSelects(currentPage);
              currentPage === 2 && next();
              currentPage === 3 && checkSelects(currentPage);
            }}
          >
            Next
          </Button>
        )}
        {currentPage === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => {
              message.success("Processing complete!");
              addCompletedTaskToDB();
            }}
          >
            Done
          </Button>
        )}
        {currentPage > 0 && (
          <Button
            style={{ margin: "0 8px" }}
            onClick={() => checkIsFailedForPrev()}
          >
            Previous
          </Button>
        )}
      </div>
    </div>
  );
};

export default CabinetButtons;
