var keystone = require(__base + 'keystone_custom');
var Types = keystone.Field.Types;

/**
 * Portfolio Model
 * ==========
 */

var Portfolio = new keystone.List('Portfolio', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
	label: '成功案例',
	sortable: true,
});

Portfolio.add({
	slug: { type: String, required: true, label: '路徑（實際網站上的路徑，ex:/cupoy-app ）', initial: true, },
	title: { type: String, required: true, label: '名稱', initial: true, },
	description: { type: String, required: true, label: '描述', initial: true, },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' }, label: '發佈日期' },
	cover: {
		label: '封面',
		type: Types.S3File,
		filename: function(item, filename){
			// 用object id作為文件名的前綴
			return 'portfolio-' + item._id + '-' + filename;
		}
	},
	categories: { type: Types.Relationship, ref: 'PortfolioCategory', many: true, label: '分類' },
	
	// full: { 
	// 	label: '內容',
	// 	type: Types.S3File,
	// 	filename: function(item, filename){
	// 		// 用object id作為文件名的前綴
	// 		return item._id + '-' + filename;
	// 	}
	// }
});

Portfolio.defaultColumns = 'title, description, slug, publishedDate|20%';
Portfolio.register();
