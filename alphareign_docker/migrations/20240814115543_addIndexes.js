exports.up = async (knex) => {
	await knex.raw('ALTER TABLE `torrents` ADD INDEX IF NOT EXISTS `searchUpdate` (`searchUpdate`)');
	await knex.raw('ALTER TABLE `torrents` ADD INDEX IF NOT EXISTS `searchUpdated` (`searchUpdated`)');
	await knex.raw('ALTER TABLE `torrents` ADD INDEX IF NOT EXISTS `trackerUpdated` (`trackerUpdated`)');
	await knex.raw('ALTER TABLE `torrents` ADD INDEX IF NOT EXISTS `updated` (`updated`)');
};

exports.down = async (knex) => {
	await knex.raw('ALTER TABLE `torrents` DROP INDEX IF EXISTS `updated`');
	await knex.raw('ALTER TABLE `torrents` DROP INDEX IF EXISTS `trackerUpdated`');
	await knex.raw('ALTER TABLE `torrents` DROP INDEX IF EXISTS `searchUpdated`');
	await knex.raw('ALTER TABLE `torrents` DROP INDEX IF EXISTS `searchUpdate`');
};
