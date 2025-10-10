export const updateSchemaRating = (averageRating: number, totalRatings: number) => {
  const schemaElement = document.getElementById('site-rating-schema');
  if (!schemaElement) return;

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "DetectivesGame",
    "url": "https://detectivesgame.com",
    "description": "Interactive AI-powered detective game where you solve criminal cases",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": averageRating > 0 ? averageRating.toFixed(1) : "0",
      "reviewCount": totalRatings.toString(),
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  schemaElement.textContent = JSON.stringify(schema, null, 2);
};
