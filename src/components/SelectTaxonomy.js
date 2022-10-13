import { SelectControl } from "@wordpress/components";
import apiFetch from "@wordpress/api-fetch";
import React from "react";

const categories = [{ label: "選択して下さい", value: -1 }];
apiFetch({ path: "/wp/v2/oja_cat?per_page=-1_fields=name,slug,id" }).then(
	(cates) => {
		cates.forEach((cate) => {
			categories.push({ label: cate["name"], value: cate["id"] });
		});
	}
);

const postTags = [{ label: "選択して下さい", value: -1 }];
apiFetch({ path: "/wp/v2/oja_tags?per_page=-1_fields=name,slug,id" }).then(
	(tags) => {
		tags.forEach((tag) => {
			postTags.push({ label: tag["name"], value: tag["id"] });
		});
	}
);

const SelectTaxonomy = React.memo((props) => {
	const { termId, postListType, setAttributes } = props;
	return (
		<SelectControl
			label={postListType === "category" ? "カテゴリーを選択" : "タグを選択"}
			value={termId}
			options={postListType === "category" ? categories : postTags}
			onChange={(val) => setAttributes({ termId: val })}
		/>
	);
});
export default SelectTaxonomy;
