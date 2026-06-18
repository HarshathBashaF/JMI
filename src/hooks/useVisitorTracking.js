import { useEffect, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';

const useVisitorTracking = () => {
  const tracked = useRef(false);

  useEffect(() => {
    // Only run once per component mount (strict mode will run twice but that's fine for testing)
    if (tracked.current) return;
    
    const trackVisitor = async () => {
      try {
        tracked.current = true;

        // Fetch location data from ipapi
        const res = await fetch('https://ipapi.co/json/');
        const locationData = await res.json();

        // Send data to Supabase
        const { error } = await supabase
          .from('website_visits')
          .insert([{
            ip_address: locationData.ip || 'Unknown',
            city: locationData.city || 'Unknown',
            country: locationData.country_name || 'Unknown',
            browser: navigator.userAgent
          }]);

        if (error) {
          console.error("Error saving visitor data:", error);
        } else {
          console.log("Visitor tracked successfully");
        }
      } catch (err) {
        console.error("Failed to track visitor:", err);
      }
    };

    trackVisitor();
  }, []);
};

export default useVisitorTracking;
