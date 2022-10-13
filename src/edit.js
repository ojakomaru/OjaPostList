import { InspectorControls } from "@wordpress/block-editor";
import {
  PanelBody,
	PanelRow,
	RadioControl,
  SelectControl,
	ToggleControl,
} from "@wordpress/components";
import SelectTaxonomy from "./components/SelectTaxonomy";
import PostNumber from "./components/PostNumber";
import ServerSideRender from "@wordpress/server-side-render";
import { useBlockProps } from "@wordpress/block-editor";
import "./editor.scss";

// import apiFetch from "@wordpress/api-fetch";
// const newBlogs = [{ label: "すべて", value: -1 }];
// apiFetch({ path: "/wp/v2/blogs" }).then(
// 	(blogs) => {
// 		blogs.forEach((blog) => {
// 			newBlogs.push({ label: blog["title"]['rendered'], value: blog["id"] });
// 		});
// 	}
// );

export default function Edit(props) {
  const {
	attributes: {
		postListType,
		isTimeStamp,
		isPostLabel,
		showPostNumber,
		postDesign,
    postOrder,
    postOrderBy,
		termId,
	},
  className,
	setAttributes,
} = props;
	return [
		<InspectorControls>
			<PanelBody title="投稿リスト設定" initialOpen={true}>
				<PanelRow>
					<RadioControl
						className="ojaPostListType"
						label="投稿のタイプ"
						selected={postListType}
						options={[
							{ label: "最新の投稿", value: "post" },
							{ label: "カテゴリー", value: "category" },
							{ label: "タグ", value: "tag" },
						]}
						onChange={(val) => setAttributes({ postListType: val })}
					/>
				</PanelRow>
				{postListType !== "post" && (
					<PanelRow>
						<SelectTaxonomy
							postListType={postListType}
							termId={termId}
							setAttributes={setAttributes}
						/>
					</PanelRow>
				)}
			</PanelBody>
			<PanelBody title="表示設定" initialOpen={true}>
				<PanelRow>
					<PostNumber
						showPostNumber={showPostNumber}
						setAttributes={setAttributes}
					/>
				</PanelRow>
				<PanelRow>
					<ToggleControl
						label={isTimeStamp ? "日付を表示する" : "日付を表示しない"}
						checked={isTimeStamp}
						onChange={(val) => setAttributes({ isTimeStamp: val })}
					/>
				</PanelRow>
				<PanelRow>
					<ToggleControl
						label={
							isPostLabel ? "投稿にラベルを表示する" : "ラベルは表示しない"
						}
						checked={isPostLabel}
						onChange={(val) => setAttributes({ isPostLabel: val })}
					/>
				</PanelRow>
				<PanelRow>
					<RadioControl
						className="ojaPostListDesign"
						label="表示タイプ (デザイン)"
						selected={postDesign}
						options={[
							{ label: "カード", value: "cade" },
							{ label: "シンプル", value: "simple" },
							{ label: "テキスト", value: "text" },
						]}
						onChange={(val) => setAttributes({ postDesign: val })}
					/>
				</PanelRow>
				<PanelRow>
					<SelectControl
						label="表示基準"
						value={postOrderBy}
						options={[
							{ label: "日付順", value: "date" },
							{ label: "更新順", value: "modified" },
							{ label: "ランダム", value: "rand" },
							{ label: "タイトル順", value: "title" },
							{ label: "著者順", value: "author" },
						]}
						onChange={(val) => setAttributes({ postOrderBy: val })}
					/>
				</PanelRow>
				<PanelRow>
					<SelectControl
						label="表示順"
						value={postOrder}
						options={[
							{ label: "昇順", value: "ASC" },
							{ label: "降順", value: "DESC" },
						]}
						onChange={(val) => setAttributes({ postOrder: val })}
					/>
				</PanelRow>
			</PanelBody>
		</InspectorControls>,
		<div {...useBlockProps} className={className}>
			<ServerSideRender
				block={props.name}
				attributes={{
					postListType,
					isTimeStamp,
					isPostLabel,
					showPostNumber,
					postDesign,
					termId,
					postOrder,
					postOrderBy,
				}}
				className="oja-server-siderender"
			/>
		</div>,
	];
}
