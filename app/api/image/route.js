import {
    deleteFileFromImageKitHandler,
    uploadFileToImageKitHandler,
} from "@/lib/fileHandler";

export async function POST(request) {
    const formData = await request.formData();
    return uploadFileToImageKitHandler(formData)
}

export async function DELETE(req) {
    const { fileId } = await req.json();
    return deleteFileFromImageKitHandler(fileId)
}