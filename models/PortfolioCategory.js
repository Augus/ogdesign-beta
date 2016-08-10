var keystone = require(__base + 'keystone_custom');

/**
 * PortfolioCategory Model
 * ==================
 */

var PortfolioCategory = new keystone.List('PortfolioCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: '作品分類',
	sortable: true,
});

PortfolioCategory.add({
	slug: { type: String, label: '自定義網址名稱' },
	name: { type: String, required: true, label: '分類名稱', initial: true },
});

PortfolioCategory.relationship({ ref: 'Portfolio', path: 'portfolios', refPath: 'categories'});
PortfolioCategory.register();
