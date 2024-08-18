const TransportStream = require("winston-transport");
const { Log } = require("../models/Log");
const winston = require("winston");
const stripAnsi = require("strip-ansi");

class SequelizeTransport extends TransportStream {
    constructor(options) {
        super(options);
        this.model = options.model;
    }

    async log(info, callback) {
        setImmediate(() => {
            this.emit("logged", info);
        });

        const cleanLevel = stripAnsi(info.level);
        const cleanMessage = stripAnsi(info.message);

        this.model
            .create({
                level: cleanLevel,
                message: cleanMessage,
                meta: info.meta || {},
                label: info.label,
            })
            .then(() => callback())
            .catch((err) => console.error("Error saving the log:", err));
    }
}

const getLogger = (prefix) =>
    winston.createLogger({
        format: winston.format.combine(
            winston.format.label({ label: prefix }),
            winston.format.timestamp(),
            winston.format.colorize({
                all: true,
            }),
            winston.format.printf(
                ({ level, message, label, timestamp, metadata = {} }) => {
                    let metaInfo = "";
                    if (Object.keys(metadata).length > 0) {
                        metaInfo = JSON.stringify(metadata);
                    }

                    const log = `\n> ${level} | [${timestamp}] ${label}: ${message}\n`;
                    if (metaInfo) log += `Meta: ${metaInfo}\n`;
                    return log;
                }
            )
        ),
        transports: [
            new SequelizeTransport({ model: Log }),
            new winston.transports.Console(),
        ],
    });

module.exports = { getLogger };
