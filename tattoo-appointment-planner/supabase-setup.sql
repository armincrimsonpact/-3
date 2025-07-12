-- ================================================================
-- SUPABASE SETUP SQL FOR INKCIRCLE
-- Run these commands in your Supabase SQL Editor after Prisma db push
-- ================================================================

-- Enable Row Level Security on all tables
ALTER TABLE "UserProfile" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Artist" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Client" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Studio" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Admin" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Appointment" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Availability" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Review" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Favorite" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Message" ENABLE ROW LEVEL SECURITY;

-- ================================================================
-- USER PROFILE POLICIES
-- ================================================================

-- Users can read their own profile
CREATE POLICY "Users can read own profile" ON "UserProfile"
    FOR SELECT USING (auth.uid()::text = "authId");

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON "UserProfile"
    FOR UPDATE USING (auth.uid()::text = "authId");

-- Users can view other users' basic info (for public profiles)
CREATE POLICY "Users can view public profiles" ON "UserProfile"
    FOR SELECT USING (true);

-- ================================================================
-- ARTIST POLICIES
-- ================================================================

-- Artists can read their own data
CREATE POLICY "Artists can read own data" ON "Artist"
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM "UserProfile" 
            WHERE "UserProfile"."id" = "Artist"."userId" 
            AND "UserProfile"."authId" = auth.uid()::text
        )
    );

-- Artists can update their own data
CREATE POLICY "Artists can update own data" ON "Artist"
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM "UserProfile" 
            WHERE "UserProfile"."id" = "Artist"."userId" 
            AND "UserProfile"."authId" = auth.uid()::text
        )
    );

-- Anyone can view active artists (for public listing)
CREATE POLICY "Anyone can view active artists" ON "Artist"
    FOR SELECT USING ("isActive" = true);

-- ================================================================
-- CLIENT POLICIES
-- ================================================================

-- Clients can read their own data
CREATE POLICY "Clients can read own data" ON "Client"
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM "UserProfile" 
            WHERE "UserProfile"."id" = "Client"."userId" 
            AND "UserProfile"."authId" = auth.uid()::text
        )
    );

-- Clients can update their own data
CREATE POLICY "Clients can update own data" ON "Client"
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM "UserProfile" 
            WHERE "UserProfile"."id" = "Client"."userId" 
            AND "UserProfile"."authId" = auth.uid()::text
        )
    );

-- ================================================================
-- STUDIO POLICIES
-- ================================================================

-- Studios can read their own data
CREATE POLICY "Studios can read own data" ON "Studio"
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM "UserProfile" 
            WHERE "UserProfile"."id" = "Studio"."userId" 
            AND "UserProfile"."authId" = auth.uid()::text
        )
    );

-- Studios can update their own data
CREATE POLICY "Studios can update own data" ON "Studio"
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM "UserProfile" 
            WHERE "UserProfile"."id" = "Studio"."userId" 
            AND "UserProfile"."authId" = auth.uid()::text
        )
    );

-- Anyone can view active studios
CREATE POLICY "Anyone can view active studios" ON "Studio"
    FOR SELECT USING ("isActive" = true);

-- ================================================================
-- APPOINTMENT POLICIES
-- ================================================================

-- Clients can read their own appointments
CREATE POLICY "Clients can read own appointments" ON "Appointment"
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM "Client" 
            JOIN "UserProfile" ON "UserProfile"."id" = "Client"."userId"
            WHERE "Client"."id" = "Appointment"."clientId" 
            AND "UserProfile"."authId" = auth.uid()::text
        )
    );

-- Artists can read their appointments
CREATE POLICY "Artists can read own appointments" ON "Appointment"
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM "Artist" 
            JOIN "UserProfile" ON "UserProfile"."id" = "Artist"."userId"
            WHERE "Artist"."id" = "Appointment"."artistId" 
            AND "UserProfile"."authId" = auth.uid()::text
        )
    );

-- Clients can create appointments
CREATE POLICY "Clients can create appointments" ON "Appointment"
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM "Client" 
            JOIN "UserProfile" ON "UserProfile"."id" = "Client"."userId"
            WHERE "Client"."id" = "Appointment"."clientId" 
            AND "UserProfile"."authId" = auth.uid()::text
        )
    );

-- Clients and Artists can update appointments
CREATE POLICY "Users can update relevant appointments" ON "Appointment"
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM "Client" 
            JOIN "UserProfile" ON "UserProfile"."id" = "Client"."userId"
            WHERE "Client"."id" = "Appointment"."clientId" 
            AND "UserProfile"."authId" = auth.uid()::text
        ) OR EXISTS (
            SELECT 1 FROM "Artist" 
            JOIN "UserProfile" ON "UserProfile"."id" = "Artist"."userId"
            WHERE "Artist"."id" = "Appointment"."artistId" 
            AND "UserProfile"."authId" = auth.uid()::text
        )
    );

-- ================================================================
-- REVIEW POLICIES
-- ================================================================

-- Anyone can read reviews
CREATE POLICY "Anyone can read reviews" ON "Review"
    FOR SELECT USING (true);

-- Clients can create reviews for their completed appointments
CREATE POLICY "Clients can create reviews" ON "Review"
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM "Client" 
            JOIN "UserProfile" ON "UserProfile"."id" = "Client"."userId"
            WHERE "Client"."id" = "Review"."clientId" 
            AND "UserProfile"."authId" = auth.uid()::text
        )
    );

-- ================================================================
-- ADMIN POLICIES
-- ================================================================

-- Admins can read all data (handled in application layer with service key)
CREATE POLICY "Admins can read own data" ON "Admin"
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM "UserProfile" 
            WHERE "UserProfile"."id" = "Admin"."userId" 
            AND "UserProfile"."authId" = auth.uid()::text
        )
    );

-- ================================================================
-- FUNCTIONS AND TRIGGERS
-- ================================================================

-- Function to handle user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public."UserProfile" (id, "authId", email, name, role)
  VALUES (gen_random_uuid(), new.id, new.email, new.raw_user_meta_data->>'name', 'CLIENT');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Function to update user profile on auth changes
CREATE OR REPLACE FUNCTION public.handle_user_update()
RETURNS trigger AS $$
BEGIN
  UPDATE public."UserProfile"
  SET 
    email = new.email,
    name = COALESCE(new.raw_user_meta_data->>'name', old.raw_user_meta_data->>'name'),
    "emailVerified" = CASE WHEN new.email_confirmed_at IS NOT NULL THEN new.email_confirmed_at ELSE NULL END,
    "updatedAt" = now()
  WHERE "authId" = new.id;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update user profile on auth changes
DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;
CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_user_update();

-- ================================================================
-- STORAGE POLICIES (for file uploads)
-- ================================================================

-- Create storage bucket for portfolio images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolios', 'portfolios', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload portfolio images
CREATE POLICY "Authenticated users can upload portfolio images" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'portfolios' AND
        auth.role() = 'authenticated'
    );

-- Allow public access to portfolio images
CREATE POLICY "Public can view portfolio images" ON storage.objects
    FOR SELECT USING (bucket_id = 'portfolios');

-- Allow users to update their own portfolio images
CREATE POLICY "Users can update own portfolio images" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'portfolios' AND
        auth.role() = 'authenticated'
    );

-- Allow users to delete their own portfolio images
CREATE POLICY "Users can delete own portfolio images" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'portfolios' AND
        auth.role() = 'authenticated'
    ); 