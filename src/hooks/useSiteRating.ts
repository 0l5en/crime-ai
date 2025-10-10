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
  const [ratings, setRatings] = useState<Record<string, SiteRating>>({});

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
    const ratingKey = `site_${userId || 'anonymous'}`;
    const newRating: SiteRating = {
      rating,
      timestamp: new Date().toISOString(),
      userId,
    };

    const updatedRatings = {
      ...ratings,
      [ratingKey]: newRating,
    };

    setRatings(updatedRatings);
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRatings));
    } catch (error) {
      console.error('Error saving site rating:', error);
    }
  };

  const getUserRating = (): number => {
    const ratingKey = `site_${userId || 'anonymous'}`;
    return ratings[ratingKey]?.rating || 0;
  };

  const getSiteStats = (): SiteRatingStats => {
    const allRatings = Object.values(ratings);
    const totalRatings = allRatings.length;
    
    if (totalRatings === 0) {
      return {
        averageRating: 0,
        totalRatings: 0,
        userRating: 0,
      };
    }

    const sum = allRatings.reduce((acc, r) => acc + r.rating, 0);
    const averageRating = sum / totalRatings;

    return {
      averageRating,
      totalRatings,
      userRating: getUserRating(),
    };
  };

  return {
    setRating,
    getUserRating,
    getSiteStats,
  };
};
