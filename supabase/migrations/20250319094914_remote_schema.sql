drop policy "Anyone Disable Update" on "public"."blue prompt nft";

drop policy "Restrict all operations for non-service roles" on "public"."blue prompt nft";

drop policy "Anyone Disable Update" on "public"."red prompt nft";

drop policy "Restrict all operations for non-service roles" on "public"."red prompt nft";

drop policy "Restrict all operations for non-service roles" on "public"."user_p";

revoke delete on table "public"."blue prompt nft" from "anon";

revoke insert on table "public"."blue prompt nft" from "anon";

revoke references on table "public"."blue prompt nft" from "anon";

revoke select on table "public"."blue prompt nft" from "anon";

revoke trigger on table "public"."blue prompt nft" from "anon";

revoke truncate on table "public"."blue prompt nft" from "anon";

revoke update on table "public"."blue prompt nft" from "anon";

revoke delete on table "public"."blue prompt nft" from "authenticated";

revoke insert on table "public"."blue prompt nft" from "authenticated";

revoke references on table "public"."blue prompt nft" from "authenticated";

revoke select on table "public"."blue prompt nft" from "authenticated";

revoke trigger on table "public"."blue prompt nft" from "authenticated";

revoke truncate on table "public"."blue prompt nft" from "authenticated";

revoke update on table "public"."blue prompt nft" from "authenticated";

revoke delete on table "public"."blue prompt nft" from "service_role";

revoke insert on table "public"."blue prompt nft" from "service_role";

revoke references on table "public"."blue prompt nft" from "service_role";

revoke select on table "public"."blue prompt nft" from "service_role";

revoke trigger on table "public"."blue prompt nft" from "service_role";

revoke truncate on table "public"."blue prompt nft" from "service_role";

revoke update on table "public"."blue prompt nft" from "service_role";

revoke delete on table "public"."red prompt nft" from "anon";

revoke insert on table "public"."red prompt nft" from "anon";

revoke references on table "public"."red prompt nft" from "anon";

revoke select on table "public"."red prompt nft" from "anon";

revoke trigger on table "public"."red prompt nft" from "anon";

revoke truncate on table "public"."red prompt nft" from "anon";

revoke update on table "public"."red prompt nft" from "anon";

revoke delete on table "public"."red prompt nft" from "authenticated";

revoke insert on table "public"."red prompt nft" from "authenticated";

revoke references on table "public"."red prompt nft" from "authenticated";

revoke select on table "public"."red prompt nft" from "authenticated";

revoke trigger on table "public"."red prompt nft" from "authenticated";

revoke truncate on table "public"."red prompt nft" from "authenticated";

revoke update on table "public"."red prompt nft" from "authenticated";

revoke delete on table "public"."red prompt nft" from "service_role";

revoke insert on table "public"."red prompt nft" from "service_role";

revoke references on table "public"."red prompt nft" from "service_role";

revoke select on table "public"."red prompt nft" from "service_role";

revoke trigger on table "public"."red prompt nft" from "service_role";

revoke truncate on table "public"."red prompt nft" from "service_role";

revoke update on table "public"."red prompt nft" from "service_role";

revoke delete on table "public"."user_p" from "anon";

revoke insert on table "public"."user_p" from "anon";

revoke references on table "public"."user_p" from "anon";

revoke select on table "public"."user_p" from "anon";

revoke trigger on table "public"."user_p" from "anon";

revoke truncate on table "public"."user_p" from "anon";

revoke update on table "public"."user_p" from "anon";

revoke delete on table "public"."user_p" from "authenticated";

revoke insert on table "public"."user_p" from "authenticated";

revoke references on table "public"."user_p" from "authenticated";

revoke select on table "public"."user_p" from "authenticated";

revoke trigger on table "public"."user_p" from "authenticated";

revoke truncate on table "public"."user_p" from "authenticated";

revoke update on table "public"."user_p" from "authenticated";

revoke delete on table "public"."user_p" from "service_role";

revoke insert on table "public"."user_p" from "service_role";

revoke references on table "public"."user_p" from "service_role";

revoke select on table "public"."user_p" from "service_role";

revoke trigger on table "public"."user_p" from "service_role";

revoke truncate on table "public"."user_p" from "service_role";

revoke update on table "public"."user_p" from "service_role";

alter table "public"."blue prompt nft" drop constraint "blue prompt nft_code_check";

alter table "public"."blue prompt nft" drop constraint "blue prompt nft_code_key";

alter table "public"."blue prompt nft" drop constraint "blue prompt nft_creator_fkey";

alter table "public"."blue prompt nft" drop constraint "blue prompt nft_image_url_key";

alter table "public"."blue prompt nft" drop constraint "blue prompt nft_name_key";

alter table "public"."blue prompt nft" drop constraint "blue prompt nft_token_id_key";

alter table "public"."red prompt nft" drop constraint "prompt nft_creator_fkey";

alter table "public"."red prompt nft" drop constraint "prompt nft_image_url_key";

alter table "public"."red prompt nft" drop constraint "prompt nft_owner_fkey";

alter table "public"."red prompt nft" drop constraint "red prompt nft_token_id_key";

alter table "public"."red prompt nft" drop constraint "red prompt nft_transaction_hash_key";

alter table "public"."user_p" drop constraint "user_name_key";

alter table "public"."user_p" drop constraint "user_wallet_address_key";

alter table "public"."blue prompt nft" drop constraint "blue prompt nft_pkey";

alter table "public"."red prompt nft" drop constraint "prompt nft_pkey";

alter table "public"."user_p" drop constraint "user_pkey";

drop index if exists "public"."blue prompt nft_code_key";

drop index if exists "public"."blue prompt nft_image_url_key";

drop index if exists "public"."blue prompt nft_name_key";

drop index if exists "public"."blue prompt nft_pkey";

drop index if exists "public"."blue prompt nft_token_id_key";

drop index if exists "public"."prompt nft_image_url_key";

drop index if exists "public"."prompt nft_pkey";

drop index if exists "public"."red prompt nft_token_id_key";

drop index if exists "public"."red prompt nft_transaction_hash_key";

drop index if exists "public"."user_name_key";

drop index if exists "public"."user_pkey";

drop index if exists "public"."user_wallet_address_key";

drop table "public"."blue prompt nft";

drop table "public"."red prompt nft";

drop table "public"."user_p";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.match_images_backup(query_embedding text, similarity_threshold double precision, match_count integer)
 RETURNS TABLE(id uuid, image_url text, creator text, created_at timestamp with time zone, similarity double precision)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  RETURN QUERY
  SELECT 
    fr.id,
    fr.image_url,
    fr.creator,
    fr.created_at,
    (fr.embedding::vector <=> query_embedding::vector) AS similarity
  FROM 
    "public"."first red" fr
  WHERE 
    (fr.embedding::vector <=> query_embedding::vector) <= (1 - similarity_threshold)
  ORDER BY 
    (fr.embedding::vector <=> query_embedding::vector)
  LIMIT 
    match_count;
END;
$function$
;


