import { Camera, Check } from "lucide-react"
import { Button } from "./ui/button"
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"

interface imageData {
  imgSrc: string
  imgClasses: string[]
}

const UploadDialog = ({imgSrc, imgClasses} : imageData) => {
  return (
    <DialogContent className="min-w-[70vw] h-fit border-2 border-background rounded-2xl">
      <DialogHeader>
        <DialogTitle className="flex items-center justify-center text-3xl font-bold text-slate-800">Uploaded Image</DialogTitle>
        <DialogDescription>
          <div className="flex flex-col pt-8 gap-4">
            { imgSrc && <img src={imgSrc} alt="imgSrc" className="w-full h-full border-8 border-surface rounded-xl" /> }
            { imgClasses && <div className="flex flex-col gap-2">
              <p className="text-xl font-semibold text-slate-800">Predicted Classes:</p>
              <ul className="flex flex-col gap-0">
                { imgClasses.map((imgClass, index) => (
                  <li key={index} className="text-lg font-semibold text-slate-800">{imgClass}</li>
                ))}
              </ul>
            </div> }
            <div className="w-full flex items-center justify-center gap-4">
              <Button variant='default' size='default' className="flex gap-2  text-white font-semibold">
                <Camera className="w-5" />
                Take Photo
              </Button>
              <Button variant='default' size='default' className="flex gap-2 bg-secondary hover:bg-secondary-foreground text-white font-semibold">
                <Check className="w-5" />
                Submit Photo
              </Button>
            </div>
          </div>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  )
}

export default UploadDialog