
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
    <Card className="bg-zinc-900 border border-zinc-600 text-zinc-200 hover:border-red-600 hover:shadow-lg hover:shadow-red-600/20 transition-all">
      <CardHeader className="p-0">
        <div className={`h-48 ${imageColor} rounded-t-lg flex items-center justify-center`}>
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
            <div className="w-8 h-8 bg-white bg-opacity-40 rounded"></div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="text-xl mb-3 text-zinc-200">{title}</CardTitle>
        <CardDescription className="text-zinc-300 mb-4">
          {description}
        </CardDescription>
        <div className="space-y-2 text-sm">
          <div className="text-zinc-400">
            <span className="font-semibold text-zinc-200">Location:</span> {location}
          </div>
          <div className="text-zinc-400">
            <span className="font-semibold text-zinc-200">Analysis:</span> {analysisResult}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EvidenceCard;
