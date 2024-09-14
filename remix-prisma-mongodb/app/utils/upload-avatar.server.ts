import { unstable_createFileUploadHandler, unstable_parseMultipartFormData, UploadHandler } from "@remix-run/node";
import fs from "fs";
import path from "path";
import crypto from "crypto";

let fileName: string;

function generateRandomFileName(originalName: string) {
    const randomString = crypto.randomBytes(8).toString("hex");
    const extension = path.extname(originalName);
    return `${Date.now()}-${randomString}${extension}`;
}

export const standardFileUploadHandler = unstable_createFileUploadHandler({
    directory: "public/uploads",
    file: ({ filename }) => {
        fileName = generateRandomFileName(filename);
        return fileName;
    },
});

const uploadHandler: UploadHandler = async (args) => {
    if (args.name === "profile-pic" && args.filename) {
        return await standardFileUploadHandler(args);
    }
    return undefined;
};

export async function uploadAvatar(request: Request) {
    const formData = await unstable_parseMultipartFormData(request, uploadHandler);

    const filePath = formData.get("profile-pic")?.toString() || "";

    // console.log("Saved file name:", filePath);
    return fileName;
}
