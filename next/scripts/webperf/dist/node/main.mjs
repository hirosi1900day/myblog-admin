// ```sh
//  $ cd scripts/webperf
//  $ npx tsc -p tsconfig.node.script.json ; cp dist/node/main.js dist/node/main.mjs // トランスパイル
//  $ node dist/node/main.mjs // 実行
// ```
import { writeFileSync } from 'fs';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { ReportGenerator } from 'lighthouse/report/generator/report-generator.js';
import * as puppeteer from 'puppeteer';
// const
// FIXME: constants.ts に移動させたい
const CHROME_OPTIONS = {
    logLevel: 'info',
    chromeFlags: [
        '--headless',
        '--no-sandbox',
        '--disable-setuid-sandbox', // 追加
        '--disable-dev-shm-usage', // Linux環境でメモリ問題を避けるために追加
        '--disable-gpu', // GPUを無効化（一部の環境で必要）
    ],
};
const BASE_URL = 'http://localhost:3001'; // テスト対象のURL。一旦本番影響与えないため、ステージング環境を指定
const TARGET_URLS = [`${BASE_URL}/conferences`]; // テスト対象のURL。複数指定可能
const TARGET_METRICS = [
    'first-contentful-paint',
    'interactive',
    'largest-contentful-paint',
    'speed-index',
    'total-blocking-time',
    'max-potential-fid',
];
// TODO: 後ほど、モバイル端末で動くように調整
const LIGHTHOUSE_OPTIONS = {
    extends: 'lighthouse:default',
    settings: {
        formFactor: 'desktop',
        throttling: {
            rttMs: 40,
            throughputKbps: 10 * 1024,
            cpuSlowdownMultiplier: 1,
            requestLatencyMs: 0,
            downloadThroughputKbps: 0,
            uploadThroughputKbps: 0,
        },
        onlyAudits: TARGET_METRICS,
        screenEmulation: {
            mobile: false,
            width: 1350,
            height: 940,
            deviceScaleFactor: 1,
            disabled: false,
        },
        headless: true,
    },
};
const fetchChromeVersion = async (chrome) => {
    try {
        // fetch 関数がうまくいかないので、IPv4アドレスを直接指定
        const res = await fetch(`http://127.0.0.1:${chrome.port}/json/version`, {
            method: 'GET',
        });
        const data = await res.json();
        console.log(data);
        return { data, res };
    }
    catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
};
const main = async () => {
    // puppeteer を chrome-launcher に接続
    const chrome = await chromeLauncher.launch(CHROME_OPTIONS);
    const result = await fetchChromeVersion(chrome);
    if (!result) {
        console.error('Failed to fetch Chrome version');
        return;
    }
    const { webSocketDebuggerUrl } = await result.data;
    const browser = await puppeteer.connect({
        browserWSEndpoint: webSocketDebuggerUrl,
    });
    // Puppeteer から WebSocket URL を取得
    const browserWSEndpoint = browser.wsEndpoint();
    const page = await browser.newPage();
    const navigationPromise = page.waitForNavigation({ timeout: 60000, waitUntil: 'networkidle0' }); // ネットワークが完全にアイドル状態になるのを待つ
    try {
        await navigationPromise;
    }
    catch (error) {
        console.error('Navigation failed:', error);
    }
    // TODO: ログインの実行
    const port = new URL(browserWSEndpoint).port; // Lighthouse のオプションを設定（Puppeteer のブラウザインスタンスを使用）
    for (const url of TARGET_URLS) {
        // lighthouseの実行
        const runnerResult = await lighthouse(url, { ...CHROME_OPTIONS, port: Number(port) }, LIGHTHOUSE_OPTIONS);
        if (!runnerResult) {
            console.error('Lighthouse returned no result for', url);
            continue;
        }
        const { lhr } = runnerResult;
        if (!lhr) {
            console.error('Lighthouse returned no result for', url);
        }
        const reportJson = ReportGenerator.generateReport(lhr, 'json');
        const reportHtml = ReportGenerator.generateReportHtml(lhr);
        // scripts/webperf/lhreport.html に保存
        writeFileSync('./lhreport.html', reportHtml);
        const audits = JSON.parse(reportJson).audits;
        console.log({ audits });
    }
    await browser.disconnect();
    await chrome.kill();
};
main();
