const REGEX = {
    url: /(https?:\/\/[^\s]+)/g,
    justUrl: /^(https?:\/\/[^\s]+)$/i,
    tweet: /^.*(twitter.com\/).*/i,
    image: /(https?:\/\/.*\.(?:png|jpg|gif|jpeg))*/i,
    imageExt: /(jpg|jpeg|png)$/i,
    lineBreak: /(?:\r\n|\r|\n)/g,
    strangeChars1: /(•+\s|·+\s)/gm,
    strangeChars2: /([^ -~’“”•\n—])/gm,
}

module.exports = REGEX;