import { FileEdit } from "lucide-react";
import { Button } from "./ui/button";

interface Defect {
  defectName: string;
  occurrence: number;
}

interface RTProps {
  imgSrc?: string;
  defects?: Defect[];
}

const classIdToName = {
  "0": "Cutter marks and fish marks",
  "1": "Scratches and Black spots",
  "2": "Fingerprints and stains",
  "3": "Ink marks",
  "4": "Jig Marks",
  "5": "Machining Marks",
  "6": "Overcut",
  "7": "Pocket"
};


const DefectListItem = ({ defectName, occurrence }: Defect) => {
  return (
    <div className="flex w-full justify-between items-center text-slate-800 text-lg font-medium px-2 py-1">
      {defectName}
      <div className="flex p-1 w-8 items-center justify-center rounded-xl bg-destructive text-white">
        {occurrence}
      </div>
    </div>
  );
};

const ResultsTable = ({ imgSrc, defects }: RTProps) => {
  return (
    <div className="w-full h-full flex flex-col gap-0">
      {/* table header */}
      <div className="flex flex-row w-full h-fit p-4 justify-between align-middle border-[1px] border-surface rounded-t-xl">
        <h3 className="text-slate-800 text-2xl font-bold">Model Results</h3>
      </div>
      <div className="flex flex-row w-full flex-1 p-2 gap-2 align-middle border-[1px] border-surface rounded-b-xl overflow-hidden">
        <div className="w-3/4 h-full flex items-center justify-center">
          <img src={imgSrc} className="w-full h-auto max-h-full rounded-xl object-cover" />
        </div>
        <div className="flex flex-col w-1/4 h-[90%] gap-2">
          <div className="flex flex-col flex-1">
            <div className="flex py-1 align-middle justify-center self-stretch rounded-t-xl bg-surface text-xl text-slate-800 font-bold">
              Defects
            </div>
            <div className="flex flex-1 flex-col items-start py-1 rounded-b-xl bg-background overflow-y-auto">
              {defects && defects.map((defect, index) => (
                <DefectListItem key={index} defectName={classIdToName[defect.defectName as keyof typeof classIdToName]} occurrence={defect.occurrence} />
              ))}
            </div>
          </div>
          <Button className="flex py-2 gap-2 rounded-lg text-xl font-bold">
            <FileEdit className="w-6 h-6" />
            Generate Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultsTable;