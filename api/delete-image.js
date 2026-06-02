// signature generator (IMPORTANT FIX)
import crypto from "crypto";
export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { publicId } = req.body;

    if (!publicId) {
        return res.status(400).json({ error: "publicId missing" });
    }

    const timestamp = Math.floor(Date.now() / 1000);

    const signature = await generateSignature(publicId, timestamp);

    const formData = new URLSearchParams();
    formData.append("public_id", publicId);
    formData.append("api_key", process.env.CLOUDINARY_API_KEY);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);

    const response = await fetch(
        "https://api.cloudinary.com/v1_1/duyytg5os/image/destroy",
        {
            method: "POST",
            body: formData
        }
    );

    const data = await response.json();

    console.log("Cloudinary delete response:", data);

    return res.status(200).json(data);
}



function generateSignature(publicId, timestamp) {
    const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`;

    return crypto
        .createHash("sha1")
        .update(stringToSign)
        .digest("hex");
}