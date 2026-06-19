-- Create the jobs table
CREATE TABLE jobs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  company text NOT NULL,
  date text,
  locations text,
  description text,
  url text,
  salary text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert some mock data so you can see it working immediately
INSERT INTO jobs (title, company, date, locations, description, url, salary) VALUES
('Senior Frontend Engineer', 'Tech Innovators Inc.', '2026-06-18', 'Remote / San Francisco', 'Looking for an experienced React developer to build stunning UI/UX experiences.', 'https://example.com/apply/1', '$140k - $180k'),
('Backend Developer (Node.js)', 'DataFlow Solutions', '2026-06-15', 'New York, NY', 'Join our backend team to build scalable microservices and APIs.', 'https://example.com/apply/2', '$130k - $160k'),
('Full Stack Web Developer', 'Creative Studio', '2026-06-10', 'London, UK', 'We need a versatile developer comfortable with React, Node.js, and Supabase.', 'https://example.com/apply/3', '£70k - £90k');

-- Create the job_clicks table to track apply clicks
CREATE TABLE job_clicks (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id uuid NOT NULL,
  job_title text NOT NULL,
  clicked_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create the website_visits table to track visitors
CREATE TABLE website_visits (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address text,
  city text,
  country text,
  browser text,
  visited_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);
