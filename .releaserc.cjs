module.exports = {
	branches: [ 'master' ],
	repositoryUrl: 'https://github.com/MartinKolarik/globalping-probe.git',
	plugins: [
		'@semantic-release/commit-analyzer',
		'@semantic-release/release-notes-generator',
		[ '@semantic-release/github', {
			assets: [
				{ path: 'globalping-probe.bundle.tar.gz', label: 'globalping-probe.bundle.tar.gz' },
			],
		}],
		[ '@semantic-release/npm', {
			npmPublish: false,
		}],
		[ '@semantic-release/exec', {
			prepareCmd: `mkdir -p node_modules/nvm/versions/node/v18.19.1/bin; echo -e 'export NVM_DIR=/app-nvm\nmkdir -p $NVM_DIR\ncp -r /app/node_modules/nvm/* $NVM_DIR\nrm -rf $NVM_DIR/versions/node/\n\\. $NVM_DIR/nvm.sh; nvm install v18.19.1\nln -sf $(nvm which v18.19.1) /usr/local/bin/node && exit' > node_modules/nvm/versions/node/v18.19.1/bin/node; chmod +x node_modules/nvm/versions/node/v18.19.1/bin/node; tar -czf globalping-probe.bundle.tar.gz bin/ dist/ config/ node_modules/ package.json`,
		}],
		[ '@semantic-release/git', {
			assets: [ 'package.json', 'package-lock.json' ],
			message: 'chore(release): [skip ci] bump version to ${nextRelease.version}',
		}],
	],
};
