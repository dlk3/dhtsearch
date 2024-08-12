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
		limit: 100,
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
		// host: 'udp://p4p.arenabg.com:1337/announce',
		// host: 'udp://explodie.org:6969/announce',
		// host: 'udp://open.stealth.si:80/announce',
		// host: 'udp://tracker.moeking.me:6969/announce',
		// host: 'udp://retracker01-msk-virt.corbina.net:80/announce',
		// host: 'udp://tracker.leech.ie:1337/announce',
		// host: 'udp://tracker.ccp.ovh:6969/announce',
		// host: 'udp://tracker.bitsearch.to:1337/announce',
		// host: 'udp://thouvenin.cloud:6969/announce',
		// host: 'udp://aarsen.me:6969/announce',
		// host: 'udp://epider.me:6969/announce',
		// host: 'udp://sanincode.com:6969/announce',
		// host: 'udp://htz3.noho.st:6969/announce',
		// host: 'udp://uploads.gamecoast.net:6969/announce',
		// host: 'udp://v1046920.hosted-by-vdsina.ru:6969/announce',
		// host: 'udp://acxx.de:6969/announce',
		// host: 'udp://private.anonseed.com:6969/announce',
		// host: 'udp://opentracker.io:6969/announce',
	},
};

module.exports = config;
