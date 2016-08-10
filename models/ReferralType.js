var keystone = require(__base + 'keystone_custom');

/**
 * ReferralType Model
 * ==================
 */

var ReferralType = new keystone.List('ReferralType', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: '如何得知奧革設計',
	sortable: true,
});

ReferralType.add({
	name: { type: String, required: true, label: '得知方式', initial: true },
});

ReferralType.relationship({ ref: 'Request', path: 'requests', refPath: 'requestTypes'});
ReferralType.register();
