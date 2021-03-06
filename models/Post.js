var keystone = require(__base + 'keystone_custom');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
	map: { name: 'title' },
	// autokey: { path: 'slug', from: 'title', unique: true },
	label: '文章',
	defaultSort: '-publishedDate',
});

Post.add({
	slug: { type: String, label: '自定義網址' },
	title: { type: String, required: true, label: '文章標題' },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true, label: '發佈狀態' },
	author: { type: Types.Relationship, ref: 'User', index: true, label: '作者' },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' }, label: '發佈日期' },
	image: { 
		label: '封面',
		type: Types.S3File,
		filename: function(item, filename){
			// 用object id作為文件名的前綴
			return item._id + '-' + filename;
		}
	},
	banner: { 
		label: 'Banner',
		type: Types.S3File,
		filename: function(item, filename){
			// 用object id作為文件名的前綴
			return item._id + '-' + filename;
		}
	},
	content: {
		brief: { type: Types.Textarea, wysiwyg: false, height: 150, label: '文章摘要' },
		extended: { type: Types.Html, wysiwyg: true, height: 400, label: '文章內文' }
	},
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true, label: '分類' },
	isRecommend: { type: Boolean, default: false, label: '首頁推薦' },
	viewCount: { type: Number, default: 0, label: '觀看次數', noedit: false  },
});

Post.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
