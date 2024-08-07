<?php

$settings = [
	'settings' => [
		'displayErrorDetails' => true,
		'renderer' => [
			'template_path' => ROOT . '/views/',
		],
		'site' => [
			'name' => 'DHTSearch',
			'short' => 'DS',
			'lead' => 'A BitTorrent DHT Search Engine',
			'domain' => 'dhtsearch.daveking.com',
			'url' => 'https://dhtsearch.daveking.com',
			'version' => '0.0.8',
			'contact' => 'dhtsearch.0@gmail.com'
		],
		'elasticsearch' => [
			'hosts' => ['127.0.0.1:9200']
		]
	]
];

return $settings;

?>
