import { useState, useEffect } from 'react';

interface CaseRating {
  rating: number;
  timestamp: string;
  userId?: string;
}

interface CaseRatingStats {
  averageRating: number;
  totalRatings: number;
  userRating?: number;
}

export const useCaseRating = (caseId: string, userId?: string) => {
  const [ratings, setRatings] = useState<Record<string, CaseRating>>({});

  // Load ratings from localStorage on mount
  useEffect(() => {
    const loadRatings = () => {
      try {
        const storedRatings = localStorage.getItem('case_ratings');
        if (storedRatings) {
          setRatings(JSON.parse(storedRatings));
        }
      } catch (error) {
        console.error('Error loading ratings from localStorage:', error);
      }
    };

    loadRatings();
  }, []);

  // Save rating for a specific case
  const setRating = (rating: number) => {
    const ratingKey = `${caseId}_${userId || 'anonymous'}`;
    const newRating: CaseRating = {
      rating,
      timestamp: new Date().toISOString(),
      userId
    };

    const updatedRatings = {
      ...ratings,
      [ratingKey]: newRating
    };

    setRatings(updatedRatings);
    
    try {
      localStorage.setItem('case_ratings', JSON.stringify(updatedRatings));
    } catch (error) {
      console.error('Error saving rating to localStorage:', error);
    }
  };

  // Get rating for current user
  const getUserRating = (): number => {
    const ratingKey = `${caseId}_${userId || 'anonymous'}`;
    return ratings[ratingKey]?.rating || 0;
  };

  // Calculate statistics for a case
  const getCaseStats = (targetCaseId: string): CaseRatingStats => {
    const caseRatings = Object.entries(ratings)
      .filter(([key]) => key.startsWith(`${targetCaseId}_`))
      .map(([, rating]) => rating);

    const totalRatings = caseRatings.length;
    const averageRating = totalRatings > 0 
      ? caseRatings.reduce((sum, rating) => sum + rating.rating, 0) / totalRatings 
      : 0;

    const userRating = getUserRating();

    return {
      averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
      totalRatings,
      userRating: userRating > 0 ? userRating : undefined
    };
  };

  // Get ratings for multiple cases (for case lists)
  const getMultipleCaseStats = (caseIds: string[]): Record<string, CaseRatingStats> => {
    const stats: Record<string, CaseRatingStats> = {};
    
    caseIds.forEach(id => {
      stats[id] = getCaseStats(id);
    });

    return stats;
  };

  return {
    setRating,
    getUserRating,
    getCaseStats,
    getMultipleCaseStats
  };
};