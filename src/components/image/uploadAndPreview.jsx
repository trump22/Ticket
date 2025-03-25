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
            className={`${sizeClass} bg-gray-300 rounded-md flex flex-col items-center justify-center relative`}
            onDragOver={onDragOver}
            onDrop={onDrop}
        >
            {previewUrl ? (
                <img
                    src={previewUrl}
                    alt="Preview"
                    className="object-cover w-full h-full rounded-md"
                />
            ) : (
                <div className="flex flex-col items-center justify-center text-center text-gray-600">
                    <p className="text-sm mb-2">{placeholderText}</p>
                </div>
            )}
            <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={onChange}
            />
        </div>
    );
};

export default ImageUploadPreview;
