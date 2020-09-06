import React from "react";

import { Button, message } from "antd";

interface ICabinetButtons {
  currentPage: number;
  checkSelects: (pageID: string) => void;
  next: () => void;
  prev: () => void;
  steps: any;
}

const CabinetButtons: React.FC<ICabinetButtons> = ({
  prev,
  currentPage,
  checkSelects,
  next,
  steps,
}: ICabinetButtons) => {
  return (
    <div>
      <div className="steps-action" style={{ marginTop: "20px" }}>
        {currentPage < steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => {
              currentPage === 0 && checkSelects("tasks");
              currentPage === 1 && checkSelects("repos");
              currentPage === 2 && next();
              currentPage === 3 && checkSelects("PR");
            }}
          >
            Next
          </Button>
        )}
        {currentPage === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
        {currentPage > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </div>
  );
};

export default CabinetButtons;
