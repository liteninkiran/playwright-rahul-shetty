const config = {
    testDir: './tests',
    timeout: 30 * 1000,
    expect: {
        timeout: 5 * 1000,
    },
    reporter: 'html',
    use: {
        headless: false,
        browserName: 'chromium',
        // browserName: 'firefox',
        // browserName: 'webkit',
    },
};

export default config;
