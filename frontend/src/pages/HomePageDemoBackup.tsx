import GridBackground from "@/components/GridBackground";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Dialog } from "@/components/ui/dialog";
import UploadDialog from "@/components/UploadDialog";
import { Button } from "@/components/ui/button";

const HomePageDemo = () => {
  const [file, setFile] = useState<File | null>(null);
  const [base64, setBase64] = useState<string>("");
  const [imgClasses, setImgClasses] = useState<string[]>([])
  const [cameraDialogOpen, setCameraDialogOpen] = useState(false)

  const handleApiRequest = async () => {
    const formData = new FormData();
    formData.append("file", file as Blob);
    try {
      const res = await axios.post("http://localhost:5000/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
      setBase64(res.data.predicted_image);
      console.log(res.data.predicted_image);
      setImgClasses(res.data.classes);
      setCameraDialogOpen(true);
    } catch (error) {
      console.log(error);
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFile(file);
    if (file) {
      console.log(file);
    }
  }

  useEffect(() => {
    if (file) {
      handleApiRequest();
    }
  }
  , [file])


  return (
    <div className="w-full h-full flex flex-col items-center justify-center overflow-hidden pt-52">
      {/* { base64 && <img src={"data:image/jpeg;base64," + base64} alt="base64" /> } */}
      <Dialog open={cameraDialogOpen} onOpenChange={setCameraDialogOpen}>
        <UploadDialog imgSrc={"data:image/jpeg;base64," + base64} imgClasses={imgClasses} />
      </Dialog>
      <div className="flex items-center justify-center z-10">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-2xl cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center gap-4 pt-5 pb-6">
            <Upload className="w-8 text-gray-500" />
            <div className="flex flex-col items-center">
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 px-64">
                <span className="font-semibold">Click to upload</span> or drag and
                drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                JPG or JPEG (MAX. 800x400px)
              </p>
            </div>
          </div>
          <Input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
        </label>
      </div>
      <div className="absolute pt-16 pointer-events-none">
        <GridBackground />
      </div>
    </div>
  );
};

export default HomePageDemo;
