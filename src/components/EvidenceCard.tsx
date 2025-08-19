
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
    <Card className="bg-dark border-secondary text-light card-hover">
      <CardHeader className="p-0">
        <div className={`${imageColor} d-flex align-items-center justify-content-center`} style={{ height: '12rem' }}>
          <div className="bg-light bg-opacity-25 rounded d-flex align-items-center justify-content-center" style={{ width: '4rem', height: '4rem' }}>
            <div className="bg-light bg-opacity-50 rounded" style={{ width: '2rem', height: '2rem' }}></div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="h5 mb-3 text-light">{title}</CardTitle>
        <CardDescription className="text-muted mb-4">
          {description}
        </CardDescription>
        <div className="small">
          <div className="text-muted mb-2">
            <span className="fw-semibold text-light">Location:</span> {location}
          </div>
          <div className="text-muted">
            <span className="fw-semibold text-light">Analysis:</span> {analysisResult}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EvidenceCard;
