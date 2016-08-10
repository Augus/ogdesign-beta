var keystone = require(__base + 'keystone_custom');

/**
 * RequestType Model
 * ==================
 */

var RequestType = new keystone.List('RequestType', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: '需求項目類型',
	sortable: true,
});

RequestType.add({
	name: { type: String, required: true, label: '需求項目名稱', initial: true },
});

RequestType.relationship({ ref: 'Request', path: 'requests', refPath: 'referralTypes'});
RequestType.register();
