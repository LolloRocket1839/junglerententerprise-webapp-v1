-- Insert roommate preference questions
INSERT INTO preference_questions (
    question_text,
    response_type,
    response_options,
    cognitive_dimensions,
    learning_style_correlations,
    metacognitive_indicators,
    response_time_significance
) VALUES
-- Living Habits
(
    'How do you prefer to organize your living space?',
    'multi_option',
    '["Very organized and minimal", "Organized but comfortable", "Relaxed and casual", "Creative and eclectic"]',
    '{"organization": 0.8, "adaptability": 0.6}',
    '{"visual": 0.7, "practical": 0.8}',
    '{"self-awareness", "adaptability"}',
    0.5
),
(
    'What is your ideal noise level in the apartment?',
    'scale',
    '["Very quiet", "Moderately quiet", "Balanced", "Moderately lively", "Very lively"]',
    '{"sensitivity": 0.9, "adaptability": 0.5}',
    '{"environmental": 0.8}',
    '{"self-awareness", "boundary-setting"}',
    0.6
),
(
    'How do you feel about having guests over?',
    'multi_option',
    '["Frequently welcome guests", "Occasional guests are fine", "Prefer minimal guests", "No guests please"]',
    '{"social": 0.9, "boundaries": 0.7}',
    '{"social": 0.8}',
    '{"boundary-setting", "communication"}',
    0.4
),
-- Study Habits
(
    'When do you prefer to study?',
    'multi_option',
    '["Early morning", "During the day", "Evening", "Late night", "Flexible"]',
    '{"time-management": 0.8, "adaptability": 0.6}',
    '{"temporal": 0.9}',
    '{"self-awareness", "planning"}',
    0.5
),
(
    'How do you prefer to study?',
    'multi_option',
    '["Complete silence", "Background music", "Group study", "Library", "Flexible"]',
    '{"focus": 0.8, "adaptability": 0.7}',
    '{"environmental": 0.9}',
    '{"self-awareness", "adaptability"}',
    0.6
),
-- Social Preferences
(
    'How social are you in the apartment?',
    'scale',
    '["Very social", "Moderately social", "Balanced", "Somewhat private", "Very private"]',
    '{"social": 0.9, "boundaries": 0.7}',
    '{"social": 0.8}',
    '{"self-awareness", "boundary-setting"}',
    0.5
),
(
    'How do you feel about sharing food and groceries?',
    'multi_option',
    '["Share everything", "Share some items", "Keep separate", "Flexible"]',
    '{"sharing": 0.8, "boundaries": 0.6}',
    '{"practical": 0.7}',
    '{"boundary-setting", "communication"}',
    0.4
),
-- Lifestyle
(
    'What is your sleep schedule like?',
    'multi_option',
    '["Early to bed, early to rise", "Regular schedule", "Flexible", "Night owl"]',
    '{"temporal": 0.9, "adaptability": 0.6}',
    '{"temporal": 0.8}',
    '{"self-awareness", "adaptability"}',
    0.7
),
(
    'How do you feel about pets?',
    'multi_option',
    '["Love pets", "Okay with pets", "No pets", "Allergic to pets"]',
    '{"adaptability": 0.7, "preferences": 0.8}',
    '{"environmental": 0.6}',
    '{"boundary-setting"}',
    0.3
),
(
    'How do you feel about smoking?',
    'multi_option',
    '["Smoker", "Okay with smoking", "No smoking", "Strongly against smoking"]',
    '{"health": 0.8, "boundaries": 0.7}',
    '{"environmental": 0.7}',
    '{"boundary-setting"}',
    0.4
),
-- Communication
(
    'How do you prefer to communicate with roommates?',
    'multi_option',
    '["In person", "Text messages", "Group chat", "Mix of methods"]',
    '{"communication": 0.9, "adaptability": 0.6}',
    '{"social": 0.7}',
    '{"communication", "adaptability"}',
    0.5
),
(
    'How do you handle conflicts?',
    'multi_option',
    '["Address immediately", "Discuss calmly", "Give space", "Avoid conflict"]',
    '{"conflict-resolution": 0.9, "communication": 0.8}',
    '{"social": 0.7}',
    '{"conflict-resolution", "communication"}',
    0.6
),
-- Cleaning
(
    'How often do you prefer to clean?',
    'multi_option',
    '["Daily", "2-3 times a week", "Weekly", "As needed"]',
    '{"organization": 0.8, "responsibility": 0.7}',
    '{"practical": 0.8}',
    '{"responsibility", "self-awareness"}',
    0.5
),
(
    'How do you feel about cleaning responsibilities?',
    'multi_option',
    '["Strict schedule", "Flexible schedule", "Clean as needed", "Hire cleaning service"]',
    '{"organization": 0.7, "adaptability": 0.8}',
    '{"practical": 0.8}',
    '{"responsibility", "communication"}',
    0.5
),
-- Additional Preferences
(
    'What is your ideal room temperature?',
    'scale',
    '["Very cool", "Cool", "Moderate", "Warm", "Very warm"]',
    '{"comfort": 0.8, "adaptability": 0.6}',
    '{"environmental": 0.7}',
    '{"self-awareness"}',
    0.4
),
(
    'How do you feel about sharing personal items?',
    'multi_option',
    '["Very sharing", "Selective sharing", "Minimal sharing", "No sharing"]',
    '{"boundaries": 0.8, "sharing": 0.7}',
    '{"practical": 0.6}',
    '{"boundary-setting"}',
    0.4
); 