var keystone = require(__base + 'keystone_custom');

/**
 * PostCategory Model
 * ==================
 */

var PostCategory = new keystone.List('PostCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: '文章分類',
	sortable: true,
});

PostCategory.add({
	name: { type: String, required: true, label: '分類名稱', initial: true },
	color: { type: String, label: '分類顏色', initial: true }
});

PostCategory.relationship({ ref: 'Post', path: 'posts', refPath: 'categories'});
PostCategory.register();
