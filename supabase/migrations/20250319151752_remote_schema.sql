drop function if exists "public"."update_vector_statistics"();

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.match_images(query_embedding text, similarity_threshold double precision, match_count integer)
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
    "first red" fr
  WHERE 
    (fr.embedding::vector <=> query_embedding::vector) <= (1 - similarity_threshold)
  ORDER BY 
    (fr.embedding::vector <=> query_embedding::vector)
  LIMIT 
    match_count;
END;
$function$
;

create policy "Restrict all operations to service_role"
on "public"."first red"
as restrictive
for all
to public
using ((auth.role() = 'service_role'::text));


create policy "Restrict all operations to service_role"
on "public"."user"
as restrictive
for all
to public
using ((auth.role() = 'service_role'::text));



