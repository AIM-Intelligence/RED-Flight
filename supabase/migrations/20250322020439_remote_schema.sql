drop policy "Restrict all operations to service_role" on "public"."first red";

revoke delete on table "public"."first red" from "anon";

revoke insert on table "public"."first red" from "anon";

revoke references on table "public"."first red" from "anon";

revoke select on table "public"."first red" from "anon";

revoke trigger on table "public"."first red" from "anon";

revoke truncate on table "public"."first red" from "anon";

revoke update on table "public"."first red" from "anon";

revoke delete on table "public"."first red" from "authenticated";

revoke insert on table "public"."first red" from "authenticated";

revoke references on table "public"."first red" from "authenticated";

revoke select on table "public"."first red" from "authenticated";

revoke trigger on table "public"."first red" from "authenticated";

revoke truncate on table "public"."first red" from "authenticated";

revoke update on table "public"."first red" from "authenticated";

revoke delete on table "public"."first red" from "service_role";

revoke insert on table "public"."first red" from "service_role";

revoke references on table "public"."first red" from "service_role";

revoke select on table "public"."first red" from "service_role";

revoke trigger on table "public"."first red" from "service_role";

revoke truncate on table "public"."first red" from "service_role";

revoke update on table "public"."first red" from "service_role";

alter table "public"."first red" drop constraint "first red_creator_fkey";

alter table "public"."first red" drop constraint "first red_pkey";

drop index if exists "public"."first red_pkey";

drop index if exists "public"."idx_first_red_embedding";

drop table "public"."first red";

create table "public"."first-red" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "image_url" text not null,
    "result" boolean not null,
    "creator" text,
    "conversation" jsonb[] not null,
    "embedding" vector(768) not null,
    "response" text not null,
    "similarity" real
);


alter table "public"."first-red" enable row level security;

create table "public"."red-criteria" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "image_url" text not null,
    "result" boolean not null,
    "creator" text,
    "conversation" jsonb[] not null,
    "embedding" vector(768) not null,
    "response" text not null
);


alter table "public"."red-criteria" enable row level security;

CREATE INDEX "red-criteria_embedding_idx" ON public."red-criteria" USING ivfflat (embedding vector_cosine_ops) WITH (lists='300');

CREATE UNIQUE INDEX "red-criteria_pkey" ON public."red-criteria" USING btree (id);

CREATE UNIQUE INDEX "first red_pkey" ON public."first-red" USING btree (id);

CREATE INDEX idx_first_red_embedding ON public."first-red" USING ivfflat (embedding vector_cosine_ops) WITH (lists='300');

alter table "public"."first-red" add constraint "first red_pkey" PRIMARY KEY using index "first red_pkey";

alter table "public"."red-criteria" add constraint "red-criteria_pkey" PRIMARY KEY using index "red-criteria_pkey";

alter table "public"."first-red" add constraint "first red_creator_fkey" FOREIGN KEY (creator) REFERENCES "user"(wallet_address) ON UPDATE RESTRICT ON DELETE RESTRICT not valid;

alter table "public"."first-red" validate constraint "first red_creator_fkey";

alter table "public"."red-criteria" add constraint "red-criteria_creator_fkey" FOREIGN KEY (creator) REFERENCES "user"(wallet_address) ON UPDATE RESTRICT ON DELETE RESTRICT not valid;

alter table "public"."red-criteria" validate constraint "red-criteria_creator_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.calculate_similarity_and_add_to_score(query_embedding text, target_id uuid, user_wallet text)
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
BEGIN
  -- Calculate similarity with the target image
  SELECT (rc.embedding::vector <=> query_embedding::vector) 
  INTO similarity_value
  FROM "red-criteria" rc
  WHERE rc.id = target_id
  LIMIT 1;
  
  -- Convert similarity to percentage (cosine distance to similarity percentage)
  percentage := ROUND(((1 - similarity_value) * 100)::numeric, 2);
  
  -- Convert to integer for score
  score_to_add := ROUND(percentage);
  
  -- Get current user score
  SELECT score INTO current_score
  FROM "user"
  WHERE wallet_address = user_wallet;
  
  -- Calculate new total score
  new_total_score := current_score + score_to_add;
  
  -- Update user's score by adding the new score
  UPDATE "user"
  SET score = new_total_score
  WHERE wallet_address = user_wallet;
  
  -- Return results
  RETURN QUERY SELECT 
    percentage AS similarity_percentage,
    new_total_score AS updated_score;
END;
$function$
;

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
BEGIN
  -- Calculate similarity with the target image
  SELECT (rc.embedding::vector <=> query_embedding::vector) 
  INTO similarity_value
  FROM "red-criteria" rc
  WHERE rc.id = target_id
  LIMIT 1;
  
  -- Convert similarity to percentage (cosine distance to similarity percentage)
  percentage := ROUND(((1 - similarity_value) * 100)::numeric, 2);
  
  -- Convert to integer for score
  score_to_add := ROUND(percentage);
  
  -- Get current user score
  SELECT score INTO current_score
  FROM "user"
  WHERE wallet_address = user_wallet;
  
  -- Calculate new total score
  new_total_score := current_score + score_to_add;
  
  -- Update user's score by adding the new score
  UPDATE "user"
  SET score = new_total_score
  WHERE wallet_address = user_wallet;
  
  -- Update the similarity column in first-red table
  UPDATE "first-red"
  SET similarity = percentage
  WHERE id = inserteddata_id;
  
  -- Return results
  RETURN QUERY SELECT 
    percentage AS similarity_percentage,
    new_total_score AS updated_score;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.match_images(query_embedding text, similarity_threshold double precision, match_count integer)
 RETURNS TABLE(id uuid, image_url text, creator text, created_at timestamp with time zone, similarity double precision)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Add statistics hint to use the index effectively
  -- Use an approximate distance comparison first
  RETURN QUERY
  SELECT 
    fr.id,
    fr.image_url,
    fr.creator,
    fr.created_at,
    (fr.embedding::vector <=> query_embedding::vector) AS similarity
  FROM 
    "first-red" fr
  WHERE 
    -- Add a pre-filter if possible to reduce candidates
    (fr.embedding::vector <=> query_embedding::vector) <= (1 - similarity_threshold)
  ORDER BY 
    similarity
  LIMIT 
    match_count;
END;
$function$
;

grant delete on table "public"."first-red" to "anon";

grant insert on table "public"."first-red" to "anon";

grant references on table "public"."first-red" to "anon";

grant select on table "public"."first-red" to "anon";

grant trigger on table "public"."first-red" to "anon";

grant truncate on table "public"."first-red" to "anon";

grant update on table "public"."first-red" to "anon";

grant delete on table "public"."first-red" to "authenticated";

grant insert on table "public"."first-red" to "authenticated";

grant references on table "public"."first-red" to "authenticated";

grant select on table "public"."first-red" to "authenticated";

grant trigger on table "public"."first-red" to "authenticated";

grant truncate on table "public"."first-red" to "authenticated";

grant update on table "public"."first-red" to "authenticated";

grant delete on table "public"."first-red" to "service_role";

grant insert on table "public"."first-red" to "service_role";

grant references on table "public"."first-red" to "service_role";

grant select on table "public"."first-red" to "service_role";

grant trigger on table "public"."first-red" to "service_role";

grant truncate on table "public"."first-red" to "service_role";

grant update on table "public"."first-red" to "service_role";

grant delete on table "public"."red-criteria" to "anon";

grant insert on table "public"."red-criteria" to "anon";

grant references on table "public"."red-criteria" to "anon";

grant select on table "public"."red-criteria" to "anon";

grant trigger on table "public"."red-criteria" to "anon";

grant truncate on table "public"."red-criteria" to "anon";

grant update on table "public"."red-criteria" to "anon";

grant delete on table "public"."red-criteria" to "authenticated";

grant insert on table "public"."red-criteria" to "authenticated";

grant references on table "public"."red-criteria" to "authenticated";

grant select on table "public"."red-criteria" to "authenticated";

grant trigger on table "public"."red-criteria" to "authenticated";

grant truncate on table "public"."red-criteria" to "authenticated";

grant update on table "public"."red-criteria" to "authenticated";

grant delete on table "public"."red-criteria" to "service_role";

grant insert on table "public"."red-criteria" to "service_role";

grant references on table "public"."red-criteria" to "service_role";

grant select on table "public"."red-criteria" to "service_role";

grant trigger on table "public"."red-criteria" to "service_role";

grant truncate on table "public"."red-criteria" to "service_role";

grant update on table "public"."red-criteria" to "service_role";

create policy "Restrict all operations to service_role"
on "public"."first-red"
as restrictive
for all
to public
using ((auth.role() = 'service_role'::text));



