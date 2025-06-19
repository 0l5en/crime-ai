
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface EvidenceCardProps {
  title: string;
  description: string;
  location: string;
  analysisResult: string;
  imageColor: string;
}

const EvidenceCard = ({ title, description, location, analysisResult, imageColor }: EvidenceCardProps) => {
  return (
    <Card className="bg-slate-800 border-slate-700 text-white hover:bg-slate-750 transition-colors">
      <CardHeader className="p-0">
        <div className={`h-48 ${imageColor} rounded-t-lg flex items-center justify-center`}>
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
            <div className="w-8 h-8 bg-white bg-opacity-40 rounded"></div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="text-xl mb-3">{title}</CardTitle>
        <CardDescription className="text-gray-300 mb-4">
          {description}
        </CardDescription>
        <div className="space-y-2 text-sm">
          <div className="text-gray-400">
            <span className="font-semibold">Location:</span> {location}
          </div>
          <div className="text-gray-400">
            <span className="font-semibold">Analysis:</span> {analysisResult}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EvidenceCard;
