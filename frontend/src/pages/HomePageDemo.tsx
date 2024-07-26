import GridBackground from "@/components/GridBackground";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomePageDemo = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();

  const handleApiRequest = async () => {
    const formData = new FormData();
    formData.append("file", file as Blob);
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
      console.log(res.data.predicted_image);
      const src = "data:image/jpeg;base64," + res.data.predicted_image;
      navigator(
        "/results", 
        { state: { imgSrc: src, imgClasses: res.data.classes } }
      );
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
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
      { loading ? 
          <p className="z-50 flex flex-col items-center justify-center w-1/3 h-64 border-2 border-gray-300 border-dashed rounded-2xl cursor-pointer bg-gray-200">Loading...</p>
        :
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
      }
      <div className="absolute pt-16 pointer-events-none">
        <GridBackground />
      </div>
    </div>
  );
};

export default HomePageDemo;
