const
    fs = require('fs'),
    colors = require('ansi-colors'),
    iconv = require('iconv-lite')

/**
 * 将日志文件逐行染色并打印到控制台
 *
 * @param {string[]} filePaths 日志文件集合
 * @param {string[]} encodings 日志文件编码集合
 */
module.exports = (filePaths, encodings) => {
    return (callback) => {
        for (let i = 0; i < filePaths.length; i++) {
            let file = filePaths[i],
                fileBak = file + '.bak',
                buffer = Buffer.from(fs.readFileSync(file, 'binary'), 'binary'),
                logText = iconv.decode(buffer, encodings[i] || 'utf-8');

            console.log(render(logText));
            fs.appendFileSync(fileBak, logText, 'utf-8');
            fs.unlinkSync(file);
        }
        callback();
    }
}

function render(text) {
    // TODO: fix 空格无下划线
    return text.replace(/(?:\w+?:(?=\/{0,3}))?(?:(?:\/|\\){1,2}(?:(?!\r?\n)[^/\\*?:"<>|]| )+)+/gi, ($0) => colors.underline($0))
        .replace(/\b(?:(?:\w+?)?error|exception|failure|fail(?:ed)?|fatal|false)\b/gi, ($0) => colors.red($0))
        .replace(/\b(?:warn(?:ing)?|debug|test|undefined|null|NaN)\b/gi, ($0) => colors.yellow($0))
        .replace(/\b(?:info(?:mation)?|console|log|true)\b/gi, ($0) => colors.cyan($0))
        .replace(/(?:^[^[]+?: |^\[.+?:|:.+?(?=\(\d+?\)\])|\(\d+?\)\])/gm, ($0) => colors.grey($0))
}
