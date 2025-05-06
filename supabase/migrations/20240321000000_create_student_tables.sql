-- Create student profiles table
CREATE TABLE student_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    gender TEXT,
    nationality TEXT,
    university TEXT NOT NULL,
    field_of_study TEXT NOT NULL,
    year_of_study INTEGER NOT NULL,
    bio TEXT,
    profile_image TEXT,
    contact_email TEXT NOT NULL,
    phone_number TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create roommate preferences table
CREATE TABLE roommate_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES student_profiles(id) ON DELETE CASCADE,
    preferred_gender TEXT,
    preferred_age_range_min INTEGER,
    preferred_age_range_max INTEGER,
    preferred_field_of_study TEXT[],
    preferred_year_of_study INTEGER[],
    preferred_nationality TEXT[],
    smoking_preference BOOLEAN,
    pet_preference BOOLEAN,
    noise_preference TEXT CHECK (noise_preference IN ('quiet', 'moderate', 'lively')),
    study_habits TEXT CHECK (study_habits IN ('early_bird', 'night_owl', 'flexible')),
    cleanliness_level TEXT CHECK (cleanliness_level IN ('very_clean', 'moderate', 'relaxed')),
    social_preference TEXT CHECK (social_preference IN ('very_social', 'moderate', 'private')),
    additional_preferences TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create roommate matches table
CREATE TABLE roommate_matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student1_id UUID REFERENCES student_profiles(id) ON DELETE CASCADE,
    student2_id UUID REFERENCES student_profiles(id) ON DELETE CASCADE,
    match_score FLOAT NOT NULL,
    status TEXT CHECK (status IN ('pending', 'accepted', 'rejected')) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(student1_id, student2_id)
);

-- Create RLS policies
ALTER TABLE student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE roommate_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE roommate_matches ENABLE ROW LEVEL SECURITY;

-- Student profiles policies
CREATE POLICY "Users can view their own profile"
    ON student_profiles FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
    ON student_profiles FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
    ON student_profiles FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Roommate preferences policies
CREATE POLICY "Users can view their own preferences"
    ON roommate_preferences FOR SELECT
    USING (auth.uid() = (SELECT user_id FROM student_profiles WHERE id = student_id));

CREATE POLICY "Users can update their own preferences"
    ON roommate_preferences FOR UPDATE
    USING (auth.uid() = (SELECT user_id FROM student_profiles WHERE id = student_id));

CREATE POLICY "Users can insert their own preferences"
    ON roommate_preferences FOR INSERT
    WITH CHECK (auth.uid() = (SELECT user_id FROM student_profiles WHERE id = student_id));

-- Roommate matches policies
CREATE POLICY "Users can view their own matches"
    ON roommate_matches FOR SELECT
    USING (
        auth.uid() IN (
            (SELECT user_id FROM student_profiles WHERE id = student1_id),
            (SELECT user_id FROM student_profiles WHERE id = student2_id)
        )
    );

CREATE POLICY "Users can update their own matches"
    ON roommate_matches FOR UPDATE
    USING (
        auth.uid() IN (
            (SELECT user_id FROM student_profiles WHERE id = student1_id),
            (SELECT user_id FROM student_profiles WHERE id = student2_id)
        )
    );

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_student_profiles_updated_at
    BEFORE UPDATE ON student_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_roommate_preferences_updated_at
    BEFORE UPDATE ON roommate_preferences
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_roommate_matches_updated_at
    BEFORE UPDATE ON roommate_matches
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 