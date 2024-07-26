import { Camera, Import, LayoutGrid, LayoutList } from "lucide-react"
import { Button } from "./ui/button"
import { Dialog, DialogTrigger } from "./ui/dialog"
import CameraDialog from "./CameraDialog"
import { useEffect, useState } from "react"

interface SocketData {
  img: string
  id: number
  name: string
}

const BladeTable = () => {
  const [cameraDialogOpen, setCameraDialogOpen] = useState(false)
  const [socketData, setSocketData] = useState<SocketData>({} as SocketData)
  useEffect(() => {
    console.log(cameraDialogOpen)
    setSocketData({img: 'https://via.placeholder.com/150', id: 1, name: 'test'})
  }
  , [cameraDialogOpen])

  return (
    <div className="w-full h-full flex flex-col gap-0 p-8 bg-white">
    {/* table header */}
    <div className="flex flex-row w-full h-fit p-6 justify-between align-middle border-[1px] border-surface rounded-t-xl">
      <h3 className="text-slate-800 text-2xl font-bold">Blade Images</h3>
      <div className="flex h-full items-center gap-6">
        <div className="flex h-full items-center justify-center gap-2">
          <Button variant='outline' size='icon' className="border-primary">
            <LayoutList className="w-5 text-primary" />
          </Button>
          <Button variant='default' size='icon' className="bg-[#FB0]">
            <LayoutGrid className="w-5 text-white" />
          </Button>
        </div>
        <div className="flex h-full items-center justify-center gap-2">
          <Button variant='outline' size='default' className="flex gap-2 border-primary text-primary font-semibold">
            <Import className="w-5" />
            Import Photo
          </Button>
          <Dialog open={cameraDialogOpen} onOpenChange={setCameraDialogOpen}>
            <DialogTrigger asChild>
              <Button variant='default' size='default' className="flex gap-2  text-white font-semibold">
                <Camera className="w-5" />
                Take Photo
              </Button>
            </DialogTrigger>
            <CameraDialog socketData={socketData} />
          </Dialog>
        </div>
      </div>
    </div>
    <div className="flex flex-row w-full flex-1 p-6 justify-center align-middle border-[1px] border-surface rounded-b-xl">
      <div className="flex flex-col items-center justify-center gap-4 py-40">
        <div className="w-32 h-32 border-2 border-slate-800/25 rounded-2xl border-dashed" />
        <p className="text-3xl font-bold text-slate-800">No Images</p>
        <div className="flex h-fit items-center justify-center gap-2">
          <Button variant='outline' size='default' className="flex gap-2 border-primary text-primary font-semibold">
            <Import className="w-5" />
            Import Photo
          </Button>
          <Button variant='default' size='default' className="flex gap-2  text-white font-semibold">
            <Camera className="w-5" />
            Take Photo
          </Button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default BladeTable