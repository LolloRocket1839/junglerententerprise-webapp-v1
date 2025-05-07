-- Create roommate_preferences table
CREATE TABLE IF NOT EXISTS "roommate_preferences" (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  preferences JSONB NOT NULL DEFAULT '{}',
  compatibility_score INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_roommate_preferences_user_id ON "roommate_preferences" (user_id);
CREATE INDEX IF NOT EXISTS idx_roommate_preferences_compatibility_score ON "roommate_preferences" (compatibility_score);
CREATE INDEX IF NOT EXISTS idx_roommate_preferences_created_at ON "roommate_preferences" (created_at);

-- Enable Row Level Security
ALTER TABLE "roommate_preferences" ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own preferences"
  ON "roommate_preferences"
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own preferences"
  ON "roommate_preferences"
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own preferences"
  ON "roommate_preferences"
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own preferences"
  ON "roommate_preferences"
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_roommate_preferences_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER update_roommate_preferences_updated_at
  BEFORE UPDATE ON "roommate_preferences"
  FOR EACH ROW
  EXECUTE FUNCTION update_roommate_preferences_updated_at();

-- Create function to calculate compatibility between users
CREATE OR REPLACE FUNCTION calculate_roommate_compatibility(
  user1_preferences JSONB,
  user2_preferences JSONB
) RETURNS INTEGER AS $$
DECLARE
  total_score INTEGER := 0;
  question_id TEXT;
  user1_answer TEXT;
  user2_answer TEXT;
BEGIN
  -- Loop through each question in user1's preferences
  FOR question_id, user1_answer IN SELECT * FROM jsonb_each_text(user1_preferences)
  LOOP
    -- Get user2's answer for the same question
    user2_answer := user2_preferences->>question_id;
    
    -- If both users answered the question, calculate score
    IF user2_answer IS NOT NULL THEN
      -- Add points based on matching answers
      IF user1_answer = user2_answer THEN
        total_score := total_score + 3;
      ELSE
        -- Add partial points for similar answers
        total_score := total_score + 1;
      END IF;
    END IF;
  END LOOP;
  
  RETURN total_score;
END;
$$ LANGUAGE plpgsql; 