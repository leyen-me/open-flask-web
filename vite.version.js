const fs = require('fs');
const dotenv = require('dotenv');

// 读取.env文件内容
const envFilePath = '.env';
const envConfig = dotenv.parse(fs.readFileSync(envFilePath));

function updateVersion() {
    // 解析版本号并增加
    let [major, minor, patch] = envConfig.VITE_APP_VERSION.split('.').map(num => parseInt(num, 10));
    patch++; // 只增加patch版本号
    return `${major}.${minor}.${patch}`;
}

function updateVersionDate() {
    return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
}

// 更新版本号
envConfig.VITE_APP_VERSION = updateVersion(envConfig)
envConfig.VITE_APP_VERSION_DATE = updateVersionDate(envConfig)

// 将更新后的配置写回.env文件
// 遍历envConfig对象并重建文件内容
const newEnvContent = Object.keys(envConfig)
    .map(key => `${key}=${envConfig[key]}`)
    .join('\n\n');

fs.writeFileSync(envFilePath, newEnvContent)