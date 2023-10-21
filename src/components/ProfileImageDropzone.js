import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const ProfileImageDropzone = ({ onImageUpload }) => {
    const maxSize = 5 * 1024 * 1024;  // 5MB

    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles.length) {
            onImageUpload(acceptedFiles[0]);
        }
    }, [onImageUpload]);

    const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
        onDrop,
        accept: '.jpg,.jpeg,.png',
        maxSize
    });

    const fileRejectionItems = fileRejections.map(({ file, errors }) => (
        <li key={file.path}>
            {file.path} - {errors.map(e => e.message).join(', ')}
        </li>
    ));

    return (
        <div {...getRootProps()} style={{border: '1px dashed gray', padding: '20px', cursor: 'pointer'}}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the image here...</p> :
                    <p>Drag & drop profile image here, or click to select one.</p>
            }
            {fileRejections.length > 0 && (
                <ul>
                    {fileRejectionItems}
                </ul>
            )}
        </div>
    );
}

export default ProfileImageDropzone;
