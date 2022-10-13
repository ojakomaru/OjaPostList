import {	__experimentalNumberControl as NumberControl} from "@wordpress/components";
import React from "react";

const PostNumber = React.memo((props) => {
	const { showPostNumber, setAttributes } = props;
	return (
    <div className="postsNumber">
      <NumberControl
        label="表示数"
        isShiftStepEnabled="true"
        shiftStep="2"
        min="2"
        max="8"
        value={showPostNumber}
        onChange={(value) => setAttributes({ showPostNumber: parseInt(value) })}
      />
    </div>
	);
});
export default PostNumber;
