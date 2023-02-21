import React from "react";
import styled from "styled-components";

import Split from "react-split";

/**
 * @title 编辑
 */
const Demo = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #1d2532;
`;

const Split2 = styled(Split)`
  display: flex;
  flex-direction: row;
  flex: 1 0 auto;
  height: 100%;

  .gutter {
    background-color: #eee;
    background-repeat: no-repeat;
    background-position: 50%;
  }

  .gutter.gutter-horizontal {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==");
    cursor: col-resize;
  }
`;

const Editor: React.FC = () => {
  return (
    <Demo>
      <Split2>
        <div>this is demo.</div>
        <div>this is demo.</div>
      </Split2>
    </Demo>
  );
};

export default Editor;
