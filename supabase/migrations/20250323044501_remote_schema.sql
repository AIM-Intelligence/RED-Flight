alter table "public"."first-red" drop column "similarity";

alter table "public"."first-red" add column "pixel_similarity" real;

alter table "public"."first-red" add column "vector_similarity" real;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.calculate_similarity_and_add_to_score(query_embedding text, target_id uuid, user_wallet text, inserteddata_id uuid)
 RETURNS TABLE(similarity_percentage numeric, updated_score integer)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  similarity_value double precision;
  percentage numeric;
  score_to_add integer;
  current_score integer;
  new_total_score integer;
  target_exists boolean;
BEGIN
  -- Check if target exists
  SELECT EXISTS(SELECT 1 FROM "red-criteria" WHERE id = target_id) INTO target_exists;
  
  IF NOT target_exists THEN
    RAISE EXCEPTION 'Target with ID % not found', target_id;
  END IF;

  -- Calculate similarity with the target image
  SELECT (rc.embedding::vector <=> query_embedding::vector) 
  INTO similarity_value
  FROM "red-criteria" rc
  WHERE rc.id = target_id
  LIMIT 1;
  
  -- Handle null similarity value
  IF similarity_value IS NULL THEN
    RAISE EXCEPTION 'Could not calculate vector similarity';
  END IF;
  
  -- Convert similarity to percentage (cosine distance to similarity percentage)
  percentage := ROUND(((1 - similarity_value) * 100)::numeric, 2);
  
  -- Convert to integer for score
  score_to_add := ROUND(percentage);
  
  -- Get current user score (handle new users)
  SELECT COALESCE(score, 0) INTO current_score
  FROM "user"
  WHERE wallet_address = user_wallet;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'User with wallet address % not found', user_wallet;
  END IF;
  
  -- Calculate new total score
  new_total_score := current_score + score_to_add;
  
  -- Update user's score by adding the new score (use locking to prevent race conditions)
  UPDATE "user"
  SET score = new_total_score
  WHERE wallet_address = user_wallet;
  
  -- Update the similarity column in first-red table
  UPDATE "first-red"
  SET vector_similarity = percentage
  WHERE id = inserteddata_id;
  
  -- Return results
  RETURN QUERY SELECT 
    percentage AS similarity_percentage,
    new_total_score AS updated_score;

EXCEPTION
  WHEN OTHERS THEN
    -- Log error and re-raise
    RAISE;
END;
$function$
;


