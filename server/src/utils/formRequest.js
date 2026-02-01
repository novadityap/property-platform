import formidable from "formidable";
import ResponseError from './responseError.js';
import fs from "fs";

export const formRequest = ({ schema, validateFiles }) => {
  return (req, res, next) => {
    const form = formidable({
      multiples: false,
      maxFileSize: 2 * 1024 * 1024,
      allowEmptyFiles: false,
    });

    form.parse(req, async (e, fields, files) => {
      if (e) {
        return next(
          new ResponseError(400, "validation errors", [
            { field: "file", message: e.message },
          ])
        );
      }

      const collectedErrors = [];

      if (schema) {
        try {
          const value = await schema.validateAsync(fields, {
            abortEarly: false,
          });
          req.body = value;
        } catch (err) {
          if (err.details) {
            err.details.forEach(e => {
              collectedErrors.push({
                field: e.path.join("."),
                message: e.message,
              });
            });
          }
        }
      } else {
        req.body = fields;
      }

      // --- validasi file custom (kalau ada)
      if (validateFiles && files) {
        const fileErrors = validateFiles(files);
        if (fileErrors.length > 0) {
          collectedErrors.push(...fileErrors);

          // hapus file temp biar ga numpuk
          Object.values(files).forEach(file => {
            if (file.filepath) fs.unlink(file.filepath, () => {});
          });
        }
      }

      if (collectedErrors.length > 0) {
        return next(new ResponseError(400, "validation errors", collectedErrors));
      }

      req.files = files;
      next();
    });
  };
};
