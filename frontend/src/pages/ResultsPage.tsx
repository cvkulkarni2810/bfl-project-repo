import ResultsTable from "@/components/ResultsTable";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
interface LocationState {
  imgSrc: string;
  imgClasses: string[];
}

interface Defect {
  defectName: string;
  occurrence: number;
}

const ResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    // Disable scrolling on mount
    document.body.style.overflow = "hidden";

    // Enable scrolling on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const state = location.state as LocationState;
  const imgSrc = state.imgSrc;
  const imgClasses = state.imgClasses;

  const uniqs = imgClasses.reduce<Record<string, number>>((acc, val) => {
    acc[val] = acc[val] === undefined ? 1 : acc[val] + 1;
    return acc;
  }, {});

  const imgDefects: Defect[] = Object.keys(uniqs).map(key => ({
    defectName: key,
    occurrence: uniqs[key],
  }));

  return (
    <div className="w-full h-screen flex flex-col p-4 gap-4 bg-white overflow-hidden">
      <Button variant="ghost" className="w-fit flex gap-2 text-base font-semibold hover:bg-primary hover:text-white" onClick={goBack}>
        <ChevronLeft className="w-4 h-4" />
        Back
      </Button>
      <div className="w-full flex flex-1 overflow-hidden ">
        <ResultsTable imgSrc={imgSrc} defects={imgDefects} />
      </div>
    </div>
  );
};

export default ResultsPage;