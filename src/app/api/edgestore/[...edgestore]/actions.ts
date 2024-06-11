"use server";

import { db } from "@/db";
import sharp from "sharp";

/**
 * Handles action when file upload is done
 *
 * @param url Uploaded File URL
 * @param configId Configuration ID (if exists handles cropped image, otherwise, creates a new configuration)
 * @returns Updated or New configuration id
 */
export async function uploadDone(
  url: string,
  configId: string | undefined,
): Promise<string> {
  // Download the image here (on the server)
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();

  // Get image info using 'sharp'
  const imgMetadata = await sharp(buffer).metadata();
  const { width, height } = imgMetadata;

  // There's no configId, meaning that this is the first upload, so create a new one
  if (!configId) {
    const configuration = await db.configuration.create({
      data: {
        imageUrl: url,
        height: height || 500,
        width: width || 500,
      },
    });

    return configuration.id;
  } else {
    // There's a configId, so update the existing one
    const updatedConfiguration = await db.configuration.update({
      where: {
        id: configId,
      },
      data: {
        croppedImageUrl: url,
      },
    });

    return updatedConfiguration.id;
  }
}
