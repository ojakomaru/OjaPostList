import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';

registerBlockType("oja/post-list", {
	title: "Oja Post List Block",
	description: "記事リストをブロックとして表示します",

	edit: Edit,
	save: () => {
		return null;
	},
});
