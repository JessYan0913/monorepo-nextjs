'use client';

import { useCallback, useState } from 'react';

import { FileText, Upload, File, Video } from 'lucide-react';

export interface FileUploaderProps {
  onFileChange: (file: File | null) => void;
  inputId?: string;
  disabled?: boolean;
  status?: 'idle' | 'loading' | 'error' | 'success';
  className?: string;
  acceptedFileTypes?: string;
}

// Helper function to get appropriate icon based on file type
function getFileIcon(fileType: string | undefined) {
  if (!fileType) return <File />;
  
  if (fileType.includes('pdf')) {
    return <FileText />;
  } else if (fileType.includes('word') || fileType.includes('doc')) {
    return <FileText />;
  } else if (fileType.includes('sheet') || fileType.includes('excel') || fileType.includes('xls')) {
    return <FileText />;
  } else if (fileType.includes('video')) {
    return <Video className="h-4 w-4" />;
  } else {
    return <File />;
  }
}

// Helper function to map file extensions to display names
const getFileTypeDisplayName = (ext: string): string => {
  const typeMap: Record<string, string> = {
    '.pdf': 'PDF',
    '.doc': 'Word',
    '.docx': 'Word',
    '.xls': 'Excel',
    '.xlsx': 'Excel',
    '.ppt': 'PowerPoint',
    '.pptx': 'PowerPoint',
    '.mp4': 'MP4',
    '.webm': 'WebM',
    '.mov': 'MOV',
    '.avi': 'AVI',
    '.mkv': 'MKV',
  };
  return typeMap[ext.toLowerCase()] || ext.toUpperCase().replace('.', '');
};

// Generate user-friendly supported file types text
const getSupportedFileTypesText = (acceptedTypes: string): string => {
  // Group similar file types
  const typeGroups: Record<string, string[]> = {
    '文档': ['.pdf'],
    'Word': ['.doc', '.docx'],
    'Excel': ['.xls', '.xlsx'],
    'PowerPoint': ['.ppt', '.pptx'],
    '视频': ['.mp4', '.webm', '.mov', '.avi', '.mkv'],
  };

  // Extract extensions from acceptedTypes
  const extensions = acceptedTypes
    .split(',')
    .map(ext => ext.trim().toLowerCase())
    .filter(ext => ext.startsWith('.'));

  // Find which groups are fully included in accepted types
  const includedGroups = Object.entries(typeGroups)
    .filter(([, groupExts]) => 
      groupExts.every(ext => extensions.includes(ext))
    )
    .map(([name]) => name);

  // Find individual extensions not in any group
  const individualExts = extensions.filter(ext => 
    !Object.values(typeGroups).flat().includes(ext)
  );

  // Build the result string
  const parts = [
    ...includedGroups,
    ...individualExts.map(ext => getFileTypeDisplayName(ext))
  ];

  // Format the result with Chinese commas and conjunctions
  if (parts.length <= 1) return parts[0] || '';
  if (parts.length === 2) return parts.join('、');
  
  const last = parts.pop();
  return `${parts.join('、')}(${acceptedTypes})、${last}`;
};

export function FileUploader({
  onFileChange,
  inputId = 'file-upload',
  className = '',
  disabled = false,
  status = 'idle',
  acceptedFileTypes = '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.mp4,.webm,.mov,.avi,.mkv'
}: FileUploaderProps) {
  const [localFile, setLocalFile] = useState<File | null>(null);
  const isDisabled = disabled || status === 'loading';
  
  // Check if file type is valid
  const isValidFileType = useCallback((file: File): boolean => {
    // Convert acceptedFileTypes to array of mime types for validation
    const acceptedTypes = acceptedFileTypes.split(',').map(type => {
      // Convert file extensions to mime types
      if (type.startsWith('.')) {
        const extension = type.substring(1).toLowerCase();
        switch (extension) {
          case 'pdf': return 'application/pdf';
          case 'doc': case 'docx': return 'application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document';
          case 'xls': case 'xlsx': return 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
          case 'ppt': case 'pptx': return 'application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation';
          case 'mp4': return 'video/mp4';
          case 'webm': return 'video/webm';
          case 'mov': return 'video/quicktime';
          case 'avi': return 'video/x-msvideo';
          case 'mkv': return 'video/x-matroska';
          default: return `application/${extension}`;
        }
      }
      return type;
    }).join(',').split(',');
    
    return acceptedTypes.some(type => {
      if (type.includes('*')) {
        const typePrefix = type.split('*')[0];
        return file.type.startsWith(typePrefix);
      }
      return file.type === type;
    });
  }, [acceptedFileTypes]);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (disabled || status === 'loading') return;

      const file = e.dataTransfer.files?.[0];
      if (!file) return;
      
      // Check if file type is accepted
      if (isValidFileType(file)) {
        setLocalFile(file);
        onFileChange(file);
      } else {
        // Could add error handling here
        console.warn('不支持的文件类型');
      }
    },
    [disabled, status, onFileChange, isValidFileType]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && isValidFileType(file)) {
        setLocalFile(file);
        onFileChange(file);
      }
    },
    [onFileChange, isValidFileType]
  );

  return (
    <div className={className}>
      <div
        className={`border-input group flex h-32 w-full overflow-hidden rounded-md border ${
          isDisabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'
        }`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => !isDisabled && document.getElementById(inputId)?.click()}
      >
        {/* Left Side - File Icon */}
        <div className="border-border/20 relative h-full w-32 shrink-0 border-r">
          {localFile ? (
            <div className="flex size-full flex-col items-center justify-center">
              <div className="bg-muted/20 flex size-16 items-center justify-center rounded-md">
                {getFileIcon(localFile.type)}
              </div>
              {!isDisabled && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 bg-black/30">
                  <div className="flex flex-col items-center gap-1 text-white">
                    <Upload className="size-3.5" />
                    <span className="text-[11px] font-medium">更换</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex size-full flex-col items-center justify-center">
              <div className="bg-muted/50 flex size-10 items-center justify-center rounded-full">
                <Upload className="text-muted-foreground size-4" />
              </div>
            </div>
          )}
        </div>

        {/* Right Side - Info/Actions */}
        <div className="flex flex-1 flex-col justify-center p-4">
          {localFile ? (
            <div className="space-y-1.5">
              <h4 className="text-sm font-medium">已选择文件</h4>
              <div className="flex items-start gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-muted-foreground line-clamp-1 break-all text-xs font-medium">
                    {localFile?.name || '未选择文件'}
                  </p>
                  <p className="text-muted-foreground/80 text-[11px]">
                    {localFile ? `${(localFile.size / 1024).toFixed(1)} KB` : ''}
                  </p>
                </div>
                <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-0.5 text-[11px] font-medium text-green-600 dark:text-green-400">
                  {localFile ? '准备上传' : '上传文件'}
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-1.5">
              <p className="text-muted-foreground text-sm">点击或拖拽文件到此处上传</p>
              <p className="text-muted-foreground/80 text-xs">支持 {getSupportedFileTypesText(acceptedFileTypes)}，最大 10MB</p>
            </div>
          )}
        </div>

        {/* Hidden File Input */}
        <input
          id={inputId}
          type="file"
          accept={acceptedFileTypes}
          className="hidden"
          onChange={handleFileChange}
          disabled={isDisabled}
        />

        {/* Loading State */}
        {status === 'loading' && (
          <div className="bg-background/80 absolute inset-0 z-30 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="border-primary/30 border-t-primary size-8 animate-spin rounded-full border-4" />
              <span className="text-muted-foreground text-sm">上传中...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
