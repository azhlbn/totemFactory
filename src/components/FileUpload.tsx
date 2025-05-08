import React, { useState, useRef } from 'react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  label: string;
  error?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ 
  onFileSelect, 
  accept = 'image/*', 
  label,
  error
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
      
      // Создаем превью для изображений
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      onFileSelect(file);
      
      // Создаем превью для изображений
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-400 mb-2">{label}</label>
      <div
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-white/5 transition-colors ${
          error ? 'border-red-500' : 'border-white/10'
        }`}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {preview ? (
          <div className="flex flex-col items-center">
            <img src={preview} alt="Preview" className="max-h-40 max-w-full mb-2 rounded" />
            <p className="text-sm text-gray-400">Click to change</p>
          </div>
        ) : (
          <div className="py-8">
            <p className="text-gray-400">Drag and drop a file here or click to select</p>
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={accept}
          className="hidden"
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FileUpload;
