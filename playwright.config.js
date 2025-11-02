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
        screenshot: 'on',
        trace: 'on',
    },
};

export default config;
