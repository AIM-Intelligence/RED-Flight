alter table "public"."first-red" drop constraint "first red_creator_fkey";

alter table "public"."user" drop constraint "user_e_name_key";

drop function if exists "public"."calculate_similarity_and_add_to_score"(query_embedding text, target_id uuid, user_wallet text, pixel_similarity numeric, inserteddata_id uuid);

drop index if exists "public"."user_e_name_key";

CREATE UNIQUE INDEX user_name_key ON public."user" USING btree (name);

alter table "public"."first-red" add constraint "first-red_creator_fkey" FOREIGN KEY (creator) REFERENCES "user"(wallet_address) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."first-red" validate constraint "first-red_creator_fkey";

alter table "public"."user" add constraint "user_name_key" UNIQUE using index "user_name_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.calculate_similarity_and_add_to_score(query_embedding text, target_id uuid, user_wallet text, inserteddata_id uuid, pixel_similarity_percentage numeric)
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
  score_to_add := ROUND(pixel_similarity_percentage);
  
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
  
  -- Update the similarity columns in first-red table
  UPDATE "first-red"
  SET vector_similarity = percentage,
      pixel_similarity = pixel_similarity_percentage
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


