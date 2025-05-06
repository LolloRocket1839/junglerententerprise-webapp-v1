-- Create quiz content table
CREATE TABLE quiz_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    difficulty_vector FLOAT[] NOT NULL,
    knowledge_domains JSONB NOT NULL,
    question_types TEXT[] NOT NULL,
    estimated_completion_time INTEGER NOT NULL,
    pedagogical_attributes FLOAT[] NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create student quiz profiles table
CREATE TABLE student_quiz_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES student_profiles(id) ON DELETE CASCADE,
    knowledge_state FLOAT[] NOT NULL,
    learning_patterns JSONB NOT NULL,
    learning_preferences FLOAT[] NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create quiz assignments table
CREATE TABLE quiz_assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES student_profiles(id) ON DELETE CASCADE,
    quiz_id UUID REFERENCES quiz_content(id) ON DELETE CASCADE,
    affinity_score FLOAT NOT NULL,
    assignment_token TEXT NOT NULL UNIQUE,
    status TEXT CHECK (status IN ('pending', 'completed', 'expired')) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create preference questions table
CREATE TABLE preference_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_text TEXT NOT NULL,
    response_type TEXT CHECK (response_type IN ('binary', 'scale', 'multi_option', 'open_ended')) NOT NULL,
    response_options JSONB,
    cognitive_dimensions JSONB NOT NULL,
    learning_style_correlations JSONB NOT NULL,
    metacognitive_indicators TEXT[] NOT NULL,
    response_time_significance FLOAT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create student preference responses table
CREATE TABLE student_preference_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES student_profiles(id) ON DELETE CASCADE,
    question_id UUID REFERENCES preference_questions(id) ON DELETE CASCADE,
    response_value TEXT NOT NULL,
    response_time INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE quiz_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_quiz_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE preference_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_preference_responses ENABLE ROW LEVEL SECURITY;

-- Quiz content policies
CREATE POLICY "Anyone can view quiz content"
    ON quiz_content FOR SELECT
    USING (true);

CREATE POLICY "Only admins can modify quiz content"
    ON quiz_content FOR ALL
    USING (auth.uid() IN (SELECT user_id FROM admin_users));

-- Student quiz profiles policies
CREATE POLICY "Users can view their own quiz profile"
    ON student_quiz_profiles FOR SELECT
    USING (auth.uid() = (SELECT user_id FROM student_profiles WHERE id = student_id));

CREATE POLICY "Users can update their own quiz profile"
    ON student_quiz_profiles FOR UPDATE
    USING (auth.uid() = (SELECT user_id FROM student_profiles WHERE id = student_id));

-- Quiz assignments policies
CREATE POLICY "Users can view their own assignments"
    ON quiz_assignments FOR SELECT
    USING (auth.uid() = (SELECT user_id FROM student_profiles WHERE id = student_id));

-- Preference questions policies
CREATE POLICY "Anyone can view preference questions"
    ON preference_questions FOR SELECT
    USING (true);

CREATE POLICY "Only admins can modify preference questions"
    ON preference_questions FOR ALL
    USING (auth.uid() IN (SELECT user_id FROM admin_users));

-- Student preference responses policies
CREATE POLICY "Users can view their own responses"
    ON student_preference_responses FOR SELECT
    USING (auth.uid() = (SELECT user_id FROM student_profiles WHERE id = student_id));

CREATE POLICY "Users can insert their own responses"
    ON student_preference_responses FOR INSERT
    WITH CHECK (auth.uid() = (SELECT user_id FROM student_profiles WHERE id = student_id));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_quiz_content_updated_at
    BEFORE UPDATE ON quiz_content
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_student_quiz_profiles_updated_at
    BEFORE UPDATE ON student_quiz_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quiz_assignments_updated_at
    BEFORE UPDATE ON quiz_assignments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_preference_questions_updated_at
    BEFORE UPDATE ON preference_questions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 