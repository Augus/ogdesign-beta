var keystone = require(__base + 'keystone_custom');
var Types = keystone.Field.Types;

/**
 * Request Model
 * ==========
 */

var Request = new keystone.List('Request', {
	map: { name: 'name' },
	label: '新客戶需求',
	sortable: true,
});

Request.add({
	name: { type: String, required: true, label: '聯絡人', initial: true },
	eamil: { type: String, required: true, label: '電子郵件', initial: true },
	createAt: { type: Types.Date, index: true, label: '建立日期', initial: true, format: 'YYYY-MM-DD LT' },
	content: {type: Types.Textarea, wysiwyg: false, height: 300, label: '需求說明', initial: true},
	requestTypes: { type: Types.Relationship, ref: 'RequestType', many: true, label: '需求項目類型', initial: true },
	referralTypes: { type: Types.Relationship, ref: 'ReferralType', many: true, label: '如何得知奧革設計', initial: true },
});

Request.defaultColumns = 'name, eamil, content, requestTypes, createAt|20%';
Request.register();
