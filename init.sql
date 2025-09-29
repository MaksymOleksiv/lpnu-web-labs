-- Initialization script for PostgreSQL
-- This file will be executed when the database container starts for the first time

-- Create the stadiums table if it doesn't exist
CREATE TABLE IF NOT EXISTS stadiums (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    capacity INTEGER NOT NULL,
    primary_sport VARCHAR(255) NOT NULL,
);

-- Insert some sample data
INSERT INTO stadiums (name, country, capacity, primary_sport) VALUES
('Wembley Stadium', 'England', 90000, 'Football'),
('Camp Nou', 'Spain', 99354, 'Football'),
('Melbourne Cricket Ground', 'Australia', 100024, 'Cricket'),
('Maracanã Stadium', 'Brazil', 78838, 'Football'),
('Yankee Stadium', 'USA', 47309, 'Baseball'),
('Tokyo Dome', 'Japan', 55000, 'Baseball'),
('Allianz Arena', 'Germany', 75000, 'Football'),
('Old Trafford', 'England', 74879, 'Football')
ON CONFLICT DO NOTHING;
