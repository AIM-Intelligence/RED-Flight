import React, { useState, useCallback } from "react";
import { useModal } from "@/store/use-modal-store";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/Dialog";
import { useDropzone } from "react-dropzone";
import { createClient } from "@supabase/supabase-js";
import { ImagePlus, Upload } from "lucide-react";

// Supabase client initialization
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

const UserInfoEditCopy = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { userInfo } = data;
  const isModalOpen = isOpen && type === "showUserInfoEditcopy";

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  }, []);

  const maxSize = 8388608;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const handleUpload = async () => {
    if (!image) return;

    const fileExt = image.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    try {
      const { data, error } = await supabase.storage.from("images").upload(filePath, image);

      if (error) throw error;

      console.log("File uploaded successfully:", data);
      // 여기에 업로드 후 처리 로직을 추가하세요 (예: 사용자 정보 업데이트)
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  if (!userInfo) {
    return <div>Loading user info...</div>;
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle>User Info Edit</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <div
            {...getRootProps()}
            className={`p-6 border-2 border-dashed rounded-md text-center cursor-pointer transition-colors duration-300 ${
              isDragActive
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
                : "border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500"
            }`}
          >
            <input {...getInputProps()} />
            {preview ? (
              <div className="relative">
                <img src={preview} alt="Preview" className="mx-auto max-h-48 object-contain rounded-md" />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-md">
                  <p className="text-white">Click or drag to replace</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-2">
                <ImagePlus className="w-12 h-12 text-gray-400" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {isDragActive ? "Drop the image here" : "Drag & drop an image here, or click to select one"}
                </p>
              </div>
            )}
          </div>
          <button
            onClick={handleUpload}
            className={`mt-4 w-full font-bold py-2 px-4 rounded flex items-center justify-center space-x-2 transition-colors duration-300 ${
              image ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!image}
          >
            <Upload className="w-5 h-5" />
            <span>Upload Image</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserInfoEditCopy;
