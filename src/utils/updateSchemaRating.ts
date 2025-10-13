export const updateSchemaRating = (averageRating: number, totalRatings: number) => {
  const schemaElement = document.getElementById('site-rating-schema');
  if (!schemaElement) return;

  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Game",
    "name": "DetectivesGame",
    "url": "https://detectivesgame.com",
    "description": "Interactive AI-powered detective game where you solve criminal cases",
    "genre": ["Mystery", "Detective", "Puzzle"],
    "gamePlatform": "Web Browser",
    "applicationCategory": "Game"
  };

  // Only add aggregateRating if there are actual ratings
  if (totalRatings > 0 && averageRating >= 1) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": averageRating.toFixed(1),
      "reviewCount": totalRatings.toString(),
      "bestRating": "5",
      "worstRating": "1"
    };
  }

  schemaElement.textContent = JSON.stringify(schema, null, 2);
};
