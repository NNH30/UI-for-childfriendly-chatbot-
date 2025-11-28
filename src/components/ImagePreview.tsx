import React, { useEffect, useState } from "react";

interface ImagePreviewProps {
  file: File;
  onRemove: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ file, onRemove }) => {
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <div className="image-preview">
      <div className="image-thumb" aria-label="Selected picture preview">
        {previewUrl && <img src={previewUrl} alt="Selected preview" />}
      </div>
      <div className="image-info">
        <p className="image-name" title={file.name}>
          {file.name}
        </p>
        <button type="button" className="remove-image" onClick={onRemove} aria-label="Remove picture preview">
          ✕ Remove
        </button>
      </div>
    </div>
  );
};

export default ImagePreview;
