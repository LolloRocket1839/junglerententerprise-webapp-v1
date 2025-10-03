-- Allow public read access to all main tables for demo mode

-- Profiles (allow read-only public access)
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Public can view profiles" ON profiles FOR SELECT USING (true);

-- Hubs/Properties
DROP POLICY IF EXISTS "Authenticated users can view hubs" ON hubs;
CREATE POLICY "Public can view hubs" ON hubs FOR SELECT USING (true);

-- Student Properties
DROP POLICY IF EXISTS "Authenticated users can view student properties" ON student_properties;
CREATE POLICY "Public can view student properties" ON student_properties FOR SELECT USING (true);

-- Investments
DROP POLICY IF EXISTS "Users can view their own investments" ON investments;
CREATE POLICY "Public can view investments" ON investments FOR SELECT USING (true);

-- Bookings
DROP POLICY IF EXISTS "Users can view their own bookings" ON bookings;
CREATE POLICY "Public can view bookings" ON bookings FOR SELECT USING (true);

-- Tourist Bookings
DROP POLICY IF EXISTS "Users can view and manage their own bookings" ON tourist_bookings;
CREATE POLICY "Public can view tourist bookings" ON tourist_bookings FOR SELECT USING (true);

-- Reviews
DROP POLICY IF EXISTS "Users can view all reviews" ON reviews;
CREATE POLICY "Public can view reviews" ON reviews FOR SELECT USING (true);

-- Tourist Reviews  
DROP POLICY IF EXISTS "Reviews are viewable by everyone" ON tourist_reviews;
CREATE POLICY "Public can view tourist reviews" ON tourist_reviews FOR SELECT USING (true);

-- Marketplace Items
DROP POLICY IF EXISTS "Everyone can view marketplace items" ON marketplace_items;
CREATE POLICY "Public can view marketplace items" ON marketplace_items FOR SELECT USING (true);

-- Marketplace Conversations
DROP POLICY IF EXISTS "Users can view their own conversations" ON marketplace_conversations;
CREATE POLICY "Public can view marketplace conversations" ON marketplace_conversations FOR SELECT USING (true);

-- Marketplace Messages
DROP POLICY IF EXISTS "Users can view messages in their conversations" ON marketplace_messages;
CREATE POLICY "Public can view marketplace messages" ON marketplace_messages FOR SELECT USING (true);

-- Roommate Answers
DROP POLICY IF EXISTS "Users can view their own answers" ON roommate_answers;
CREATE POLICY "Public can view roommate answers" ON roommate_answers FOR SELECT USING (true);

-- Roommate Matches
DROP POLICY IF EXISTS "Users can view matches they are part of" ON roommate_matches;
DROP POLICY IF EXISTS "Users can view their own matches" ON roommate_matches;
CREATE POLICY "Public can view roommate matches" ON roommate_matches FOR SELECT USING (true);

-- Chat Messages
DROP POLICY IF EXISTS "Users can view their own chat messages" ON chat_messages;
CREATE POLICY "Public can view chat messages" ON chat_messages FOR SELECT USING (true);

-- Student Applications (public read access)
CREATE POLICY "Public can view student applications" ON student_applications FOR SELECT USING (true);

-- Student Documents
DROP POLICY IF EXISTS "Users can view their own documents" ON student_documents;
CREATE POLICY "Public can view student documents" ON student_documents FOR SELECT USING (true);

-- Universities
CREATE POLICY "Public can view universities" ON universities FOR SELECT USING (true);

-- Platform Stats
DROP POLICY IF EXISTS "Platform stats viewable by authenticated users" ON platform_stats;
CREATE POLICY "Public can view platform stats" ON platform_stats FOR SELECT USING (true);

-- Jungle Wallet
DROP POLICY IF EXISTS "Users can view their own wallet" ON jungle_wallet;
CREATE POLICY "Public can view jungle wallets" ON jungle_wallet FOR SELECT USING (true);

-- Wallet Transactions
DROP POLICY IF EXISTS "Users can view their own transactions" ON wallet_transactions;
CREATE POLICY "Public can view wallet transactions" ON wallet_transactions FOR SELECT USING (true);

-- Rudolph Questions
CREATE POLICY "Public can view rudolph questions" ON rudolph_questions FOR SELECT USING (true);

-- Rudolph Personalities
CREATE POLICY "Public can view rudolph personalities" ON rudolph_personalities FOR SELECT USING (true);

-- Success Stories
DROP POLICY IF EXISTS "Success stories are public" ON roommate_success_stories;
CREATE POLICY "Public can view success stories" ON roommate_success_stories FOR SELECT USING (true);