/*
  # Create assessments table for AI assessment results

  1. New Tables
    - `assessments`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key references auth.users)
      - `skill_assessed` (text, the skill that was assessed)
      - `score` (numeric, assessment score out of 100)
      - `feedback_text` (text, detailed feedback from AI)
      - `created_at` (timestamp with timezone)

  2. Security
    - Enable RLS on `assessments` table
    - Add policy for users to insert their own assessments
    - Add policy for users to view their own assessments

  3. Notes
    - The `user_id` field references `auth.users` and cascades on delete
    - Score is stored as a numeric value (0-100)
    - Feedback text stores the detailed AI assessment feedback
*/

-- Create the assessments table
CREATE TABLE IF NOT EXISTS public.assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  skill_assessed text NOT NULL,
  score numeric(5,2) NOT NULL CHECK (score >= 0 AND score <= 100),
  feedback_text text NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can insert their own assessments"
  ON public.assessments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own assessments"
  ON public.assessments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS assessments_user_id_idx ON public.assessments(user_id);
CREATE INDEX IF NOT EXISTS assessments_created_at_idx ON public.assessments(created_at DESC);