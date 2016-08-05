var keystone = require(__base + 'keystone_custom');
var Types = keystone.Field.Types;


/**
 * PromotePost Model
 * ==========
 */

var PromotePost = new keystone.List('PromotePost', {
	label: '首頁推薦',
    sortable: true,
    map: { name: 'post' } // 在後台列表上呈現名稱不呈現 id
});

PromotePost.add(
	'基本資訊', {
        post: { type: Types.Relationship, ref: 'Post', many: false, label: '專案', initial: true, index: true, unique: true }
	}
);

PromotePost.defaultColumns = "post";
PromotePost.register();
