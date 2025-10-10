import { useState, useEffect } from 'react';

interface SiteRating {
  rating: number;
  timestamp: string;
  userId?: string;
}

interface SiteRatingStats {
  averageRating: number;
  totalRatings: number;
  userRating?: number;
}

const STORAGE_KEY = 'site_ratings';

export const useSiteRating = (userId?: string) => {
  const [ratings, setRatings] = useState<SiteRating[]>([]);

  // Load ratings from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setRatings(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading site ratings:', error);
    }
  }, []);

  const setRating = (rating: number) => {
    const newRating: SiteRating = {
      rating,
      timestamp: new Date().toISOString(),
      userId,
    };

    const updatedRatings = [...ratings, newRating];

    setRatings(updatedRatings);
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRatings));
    } catch (error) {
      console.error('Error saving site rating:', error);
    }
  };

  const getSiteStats = (): SiteRatingStats => {
    const totalRatings = ratings.length;
    
    if (totalRatings === 0) {
      return {
        averageRating: 0,
        totalRatings: 0,
      };
    }

    const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
    const averageRating = sum / totalRatings;

    return {
      averageRating,
      totalRatings,
    };
  };

  return {
    setRating,
    getSiteStats,
  };
};
