import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';

registerBlockType("oja/post-list", {
	title: "Oja Post List Block",
	description: "記事リストをブロックとして表示します",
	category: "common",
	icon: "smiley",
	keywords: ["post", "oja", "list"],
	supports: {
		customClassName: false,
		anchor: false,
		html: false,
	},
	attributes: {
		postListType: {
			type: "string",
			default: "post",
		},
		isTimeStamp: {
			type: "boolean",
			default: true,
		},
		isPostLabel: {
			type: "boolean",
			default: true,
		},
		showPostNumber: {
			type: "number",
			default: 6,
		},
		postDesign: {
			type: "string",
			default: "cade",
		},
    postOrder: {
      type: 'string',
      default: 'DESC'
    },
    postOrderBy: {
      type: 'string',
      default: 'date'
    },
		termId: {
			type: "number",
			default: -1,
		},
	},
	edit: Edit,
	save: () => {
		return null;
	},
});
