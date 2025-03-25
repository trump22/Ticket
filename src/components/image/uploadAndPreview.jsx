import React from 'react';

const ImageUploadPreview = ({
                                previewUrl,
                                onDrop,
                                onDragOver,
                                onChange,
                                placeholderText,
                                sizeClass = 'w-[300px] h-[300px]',
                            }) => {
    return (
        <div
            className={`${sizeClass} bg-gray-200 rounded-md flex flex-col items-center justify-center relative p-4 sm:p-6`}
            onDragOver={onDragOver}
            onDrop={onDrop}
        >
            {previewUrl ? (
                <img
                    src={previewUrl}
                    alt="Preview"
                    className="object-cover w-full h-full rounded-md max-h-[300px] sm:max-h-[400px]"
                />
            ) : (
                <div className="flex flex-col items-center justify-center text-center text-gray-600">
                    <p className="text-sm sm:text-base mb-2">{placeholderText}</p>
                </div>
            )}

            {/* Input file được mở rộng vùng bấm trên mobile */}
            <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                onChange={onChange}
            />
        </div>

    );
};

export default ImageUploadPreview;
