"use client";

import { useState, useTransition } from "react";
import { cn } from "@/lib/utils";
import Dropzone, { FileRejection } from "react-dropzone";
import {
  DoubleArrowUpIcon,
  ImageIcon,
  SymbolIcon,
  UploadIcon,
} from "@radix-ui/react-icons";
import { Progress } from "@/components/ui/progress";

const UploadPage = () => {
  // ---------------------------------------------------------------------------
  // Is user dragging a file over?
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  // ---------------------------------------------------------------------------
  // Represents the upload progress as a number between 0 and 100
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  // ---------------------------------------------------------------------------
  // If file is rejected
  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles;

    setIsDragOver(false);
  };
  // ---------------------------------------------------------------------------
  // If file is accepted
  const onDropAccepted = (acceptedFiles: File[]) => {
    // Start upload

    setIsDragOver(false);
  };
  // ---------------------------------------------------------------------------
  // Allows components to avoid undesirable loading states by waiting for content to load before transitioning to the next screen.
  const [isPending, startTransition] = useTransition();
  // ---------------------------------------------------------------------------
  // Upload logic
  const isUploading = true;
  // ---------------------------------------------------------------------------
  return (
    <div
      className={cn(
        "relative my-16 flex h-full w-full flex-1 flex-col items-center justify-center rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl",
        {
          "bg-blue-900/10 ring-blue-900/25": isDragOver, // True if user drags over
        },
      )}
    >
      <div className="relative flex w-full flex-1 flex-col items-center justify-center">
        <Dropzone
          onDropRejected={onDropRejected}
          onDropAccepted={onDropAccepted}
          onDragEnter={() => setIsDragOver(true)}
          onDragLeave={() => setIsDragOver(false)}
          accept={{
            "image/png": [".png"],
            "image/jpeg": [".jpeg"],
            "image/jpg": [".jpg"],
          }}
        >
          {/* DropZone Child------------------------------------------------ */}
          {
            // Anonymous Arrow Function as a child of Dropzone
            ({ getRootProps, getInputProps }) => (
              <div
                className="flex h-full w-full flex-1 flex-col items-center justify-center"
                {...getRootProps()}
              >
                {/* Upload Input */}
                <input {...getInputProps()} />
                {/* Icon---------------------------------------------------- */}
                {isDragOver ? (
                  // User drags file over
                  <UploadIcon className="mb-2 h-6 w-6 text-zinc-500" />
                ) : isUploading || isPending ? (
                  // File is being uploaded
                  <SymbolIcon className="mb-2 h-6 w-6 animate-spin text-zinc-500" />
                ) : (
                  // Is Default
                  <ImageIcon className="mb-2 h-6 w-6 text-zinc-500" />
                )}
                {/* Title--------------------------------------------------- */}
                <div className="mb-2 flex flex-col justify-center text-sm text-zinc-700">
                  {isUploading ? (
                    // File is being uploaded
                    <div className="flex flex-col items-center">
                      <p>Uploading...</p>
                      <Progress
                        value={uploadProgress}
                        className="mt-2 h-2 w-40 bg-gray-300"
                      />
                    </div>
                  ) : isPending ? (
                    // Is Pending state
                    <div className="flex flex-col items-center">
                      <p>Redirecting, please wait...</p>
                    </div>
                  ) : isDragOver ? (
                    // User is dragging a file over
                    <p>
                      <span className="font-semibold">Drop file</span> to upload
                    </p>
                  ) : (
                    // Is Default
                    <p>
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                  )}
                </div>
                {/* Subtitle------------------------------------------------ */}
                {isPending ? null : (
                  <p className="text-xs text-zinc-500">PNG, JPG, JPEG</p>
                )}
                {/* -------------------------------------------------------- */}
              </div>
            )
          }
          {/* /DropZone Child------------------------------------------------ */}
        </Dropzone>
      </div>
    </div>
  );
};

export default UploadPage;
