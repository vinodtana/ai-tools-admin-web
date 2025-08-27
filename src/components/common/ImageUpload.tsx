import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, Image as ImageIcon, Link } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { S3_BUCKET, REGION } from "../../config";
import axios from "axios";
import moment from "moment";
import AWS from "aws-sdk";
import { useAppDispatch, useAppSelector } from '@/hooks/redux';

import { getPresignedURL } from '@/store/slices/toolsSlice';

interface ImageUploadProps {
  label: string;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  required?: boolean;
  error?: string;
}

const ImageUpload = ({ 
  label, 
  value, 
  onChange, 
  multiple = false, 
  required = false,
  error 
}: ImageUploadProps) => {
  const [uploadMode, setUploadMode] = useState<'upload' | 'link'>('upload');
  const [linkInput, setLinkInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const mille_sec = moment.now();
  const [isLoader, setIsLoader] = useState(false);
  const dispatch = useAppDispatch();

  const handleFileUpload = async (files: FileList) => {
    const uploadedUrls: string[] = [];
    console.log("files", files);
    if (multiple) {
      const currentUrls = Array.isArray(value) ? value : [];
      // Check if adding new files would exceed the limit of 10
      if (currentUrls.length + files.length > 10) {
        toast({
          title: 'Upload limit exceeded',
          description: `You can upload up to 10 images only. Currently have ${currentUrls.length}, trying to add ${files.length}`,
          variant: 'destructive',
        });
        return;
      }
    }
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
    console.log(`Uploading file: ${file.name}`, file);
      // Simulate file upload to S3 (replace with actual S3 upload logic)
      const mockUrl = await uploadFile(file) as any;
      uploadedUrls.push(mockUrl);
      
      // Show success toast
      toast({
        title: 'Image uploaded',
        description: `${file.name} uploaded successfully`,
      });
    }

    if (multiple) {
      const currentUrls = Array.isArray(value) ? value : [];
      onChange([...currentUrls, ...uploadedUrls]);
    } else {
      onChange(uploadedUrls[0]);
    }
  };
  const uploadFile = async (file: any) => {
    console.log("filefile", file);
    console.log("fileisCroppedImgfile");
    // AWS.config.update({
    //   accessKeyId: a_accessKeyId,
    //   secretAccessKey: a_secretAccessKey,
    // });
    // const s3 = new AWS.S3({
    //   params: { Bucket: S3_BUCKET },
    //   region: REGION,
    // });

    const dFile = `${mille_sec}_${file?.name.replace(/[^a-z0-9]/g, '')}`;
    // console.log("dFile", dFile);

    // const params = {
    //   Bucket: S3_BUCKET,
    //   Key: dFile,
    //   ContentType: "image/png",
    //   Body: file,
    // };
    
    const resp1 = await dispatch(getPresignedURL({ fileName: dFile, fileType: file.type }));  
    console.log("resp1", resp1);
    const presignedUrl = resp1.payload?.url;
    try{
      const result = await axios.put(presignedUrl, file, {
        headers: {
          'Content-Type': file.type,
        },
      });
  
      console.log("result", result);
      return "https://topaitools-images.s3.ap-south-1.amazonaws.com/"+dFile;
    }catch (err) {
      console.error('Error uploading file:', err);
      console.error('S3 error:', err?.response?.data);
      throw err;        
    }

// await axios.put(presignedUrl, file, {
//         headers: {
//           "Content-Type": file.type,
//         },
//       });
    
    // // Uploading file to s3
    // setIsLoader(true);
    // var upload = s3
    //   .putObject(params)
    //   .on("httpUploadProgress", (evt: any) => {
    //     // File uploading progress
    //     console.log("Uploading %");
    //   })
    //   .promise();

    // await upload.then((err: any) => {
    //   console.log("err", err);

    //   // console.log("data", data);
    //   setIsLoader(false);
    //   const imgUrl12 = `https://${S3_BUCKET}.s3.amazonaws.com/${dFile}`;
    //  return imgUrl12
    // });
  };
  const handleLinkAdd = () => {
    if (!linkInput.trim()) return;

    if (multiple) {
      const currentUrls = Array.isArray(value) ? value : [];
      // Limit to 10 images for multiple upload
      if (currentUrls.length >= 10) {
        toast({
          title: 'Upload limit reached',
          description: 'You can upload up to 10 images only',
          variant: 'destructive',
        });
        return;
      }
      onChange([...currentUrls, linkInput.trim()]);
    } else {
      onChange(linkInput.trim());
    }
    setLinkInput('');
  };

  const handleRemove = (indexOrUrl: number | string) => {
    if (multiple && Array.isArray(value)) {
      if (typeof indexOrUrl === 'number') {
        onChange(value.filter((_, i) => i !== indexOrUrl));
      } else {
        onChange(value.filter(url => url !== indexOrUrl));
      }
    } else {
      onChange('');
    }
  };

  const displayUrls = multiple ? (Array.isArray(value) ? value : []) : (value ? [value as string] : []);

  return (
    <div className="space-y-4">
      <Label>
        {label} {required && '*'}
      </Label>

      {/* Mode Toggle */}
      <div className="flex gap-2">
        <Button
          type="button"
          variant={uploadMode === 'upload' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setUploadMode('upload')}
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload
        </Button>
        <Button
          type="button"
          variant={uploadMode === 'link' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setUploadMode('link')}
        >
          <Link className="w-4 h-4 mr-2" />
          Add Link
        </Button>
      </div>

      {/* Upload Mode */}
      {uploadMode === 'upload' && (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple={multiple}
            onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="w-full"
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Choose {multiple ? 'Images' : 'Image'}
          </Button>
        </div>
      )}

      {/* Link Mode */}
      {uploadMode === 'link' && (
        <div className="flex gap-2">
          <Input
            value={linkInput}
            onChange={(e) => setLinkInput(e.target.value)}
            placeholder="Enter image URL..."
            onKeyPress={(e) => e.key === 'Enter' && handleLinkAdd()}
          />
          <Button type="button" onClick={handleLinkAdd}>
            Add
          </Button>
        </div>
      )}

      {/* Display Images */}
      {displayUrls.length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">
            Selected Images:
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {displayUrls.map((url, index) => (
              <div key={index} className="relative group">
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <img
                    src={url}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xMiA2VjE4TTYgMTJIMTgiIHN0cm9rZT0iIzk5OTk5OSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+';
                    }}
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemove(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};

export default ImageUpload;