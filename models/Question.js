var keystone = require(__base + 'keystone_custom');
var Types = keystone.Field.Types;

/**
 * Question Model
 * ==========
 */

var Question = new keystone.List('Question', {
	map: { name: 'title' },
	label: '常見問題',
	sortable: true,
});

Question.add({
	title: { type: String, required: true, label: '問題名稱', initial: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' }, label: '發佈日期', initial: true },
	content: {type: Types.Html, wysiwyg: false, height: 300, label: '內文', initial: true},
});

Question.defaultColumns = 'title, publishedDate|20%';
Question.register();
