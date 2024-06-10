"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileHandler = void 0;
const fileHandler = (req, _, next) => {
    const { files } = req;
    const mappedFiles = (files || []).map((file) => ({
        name: file.originalname,
        type: file.mimetype,
        content: file.buffer,
        size: file.size,
        extension: `${file.originalname.split(".").pop()}`,
    }));
    Object.assign(req.body, { files: mppedFiles });
    return next();
};
exports.fileHandler = fileHandler;
