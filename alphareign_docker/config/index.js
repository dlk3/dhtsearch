const filters = require('./filters');
const formats = require('./formats');
const tags = require('./tags');

const config = {
	bootstrapNodes: [
		{ address: 'router.bittorrent.com', port: 6881 },
		{ address: 'dht.transmissionbt.com', port: 6881 },
	],
	crawler: {
		address: '0.0.0.0',
		port: 6881,
	},
	db: {
		/*
		 * SQLITE DB
		 * 	client: 'sqlite3',
		 * 	connection: {
		 * 		filename: './db.sqlite3',
		 * 	},
		 * 	useNullAsDefault: true,
		 */
		client: 'mysql',
		connection: {
			database: 'alphareign',
			host: 'mariadb',
			password: 'passw0rd',
			user: 'root',
		},
		// dlk added to debug connection exception
		/*
		pool: {
			min: 1,
			max: 20,
			acquireTimeoutMillis: 60000
		}
		asyncStackTraces: true
		*/
	},
	debug: false,
	elasticsearch: {
		host: 'elasticsearch',
		port: 9200,
	},
	filters,
	formats,
	search: {
		// Seconds between every bulk insert
		frequency: 10,
		// Amount of torrents to update in elasticsearch at once
		limit: 1000,
	},
	stale: {
		// Delete outdated torrents after this many days
		days: 60,
		limit: 100,
	},
	tags,
	tracker: {
		// Minutes before we should try and update a torrent again
		age: 360,
		// Seconds between every scrape
		frequency: 10,
		// Max number of torrents to query
		limit: 50,
		// host: 'udp://tr4ck3r.duckdns.org:6969/announce',
		host: 'udp://tracker.opentrackr.org:1337/announce',
		// host: 'udp://open.stealth.si:80/announce',
	},
};

module.exports = config;
