-- Create stays table
CREATE TABLE stays (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    location TEXT NOT NULL,
    price_per_night DECIMAL(10,2) NOT NULL,
    images TEXT[] NOT NULL,
    amenities TEXT[] NOT NULL,
    max_guests INTEGER NOT NULL,
    bedrooms INTEGER NOT NULL,
    beds INTEGER NOT NULL,
    bathrooms INTEGER NOT NULL,
    category TEXT NOT NULL,
    rating DECIMAL(3,2) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    host_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT price_per_night_positive CHECK (price_per_night > 0),
    CONSTRAINT max_guests_positive CHECK (max_guests > 0),
    CONSTRAINT bedrooms_positive CHECK (bedrooms > 0),
    CONSTRAINT beds_positive CHECK (beds > 0),
    CONSTRAINT bathrooms_positive CHECK (bathrooms > 0),
    CONSTRAINT rating_range CHECK (rating >= 0 AND rating <= 5)
);

-- Create indexes for better query performance
CREATE INDEX stays_location_idx ON stays USING GIN (to_tsvector('english', location));
CREATE INDEX stays_category_idx ON stays(category);
CREATE INDEX stays_price_idx ON stays(price_per_night);
CREATE INDEX stays_rating_idx ON stays(rating);
CREATE INDEX stays_host_id_idx ON stays(host_id);
CREATE INDEX stays_created_at_idx ON stays(created_at);

-- Enable Row Level Security
ALTER TABLE stays ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public stays are viewable by everyone"
    ON stays FOR SELECT
    USING (true);

CREATE POLICY "Hosts can insert their own stays"
    ON stays FOR INSERT
    WITH CHECK (auth.uid() = host_id);

CREATE POLICY "Hosts can update their own stays"
    ON stays FOR UPDATE
    USING (auth.uid() = host_id)
    WITH CHECK (auth.uid() = host_id);

CREATE POLICY "Hosts can delete their own stays"
    ON stays FOR DELETE
    USING (auth.uid() = host_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_stays_updated_at
    BEFORE UPDATE ON stays
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create function to validate stay data
CREATE OR REPLACE FUNCTION validate_stay_data()
RETURNS TRIGGER AS $$
BEGIN
    -- Validate images array
    IF array_length(NEW.images, 1) < 1 THEN
        RAISE EXCEPTION 'At least one image is required';
    END IF;

    -- Validate amenities array
    IF array_length(NEW.amenities, 1) < 1 THEN
        RAISE EXCEPTION 'At least one amenity is required';
    END IF;

    -- Validate category
    IF NEW.category NOT IN ('beach', 'mountain', 'city', 'countryside') THEN
        RAISE EXCEPTION 'Invalid category';
    END IF;

    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for stay data validation
CREATE TRIGGER validate_stay_data_trigger
    BEFORE INSERT OR UPDATE ON stays
    FOR EACH ROW
    EXECUTE FUNCTION validate_stay_data();

-- Create function to update rating and review count
CREATE OR REPLACE FUNCTION update_stay_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE stays
    SET 
        rating = (
            SELECT AVG(rating)
            FROM stay_reviews
            WHERE stay_id = NEW.stay_id
        ),
        review_count = (
            SELECT COUNT(*)
            FROM stay_reviews
            WHERE stay_id = NEW.stay_id
        )
    WHERE id = NEW.stay_id;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create stay_reviews table
CREATE TABLE stay_reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    stay_id UUID REFERENCES stays(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL,
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT rating_range CHECK (rating >= 1 AND rating <= 5)
);

-- Create indexes for stay_reviews
CREATE INDEX stay_reviews_stay_id_idx ON stay_reviews(stay_id);
CREATE INDEX stay_reviews_user_id_idx ON stay_reviews(user_id);
CREATE INDEX stay_reviews_rating_idx ON stay_reviews(rating);

-- Enable RLS for stay_reviews
ALTER TABLE stay_reviews ENABLE ROW LEVEL SECURITY;

-- Create policies for stay_reviews
CREATE POLICY "Reviews are viewable by everyone"
    ON stay_reviews FOR SELECT
    USING (true);

CREATE POLICY "Users can insert their own reviews"
    ON stay_reviews FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews"
    ON stay_reviews FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reviews"
    ON stay_reviews FOR DELETE
    USING (auth.uid() = user_id);

-- Create trigger for updated_at in stay_reviews
CREATE TRIGGER update_stay_reviews_updated_at
    BEFORE UPDATE ON stay_reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create trigger for updating stay rating
CREATE TRIGGER update_stay_rating_trigger
    AFTER INSERT OR UPDATE OR DELETE ON stay_reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_stay_rating(); 