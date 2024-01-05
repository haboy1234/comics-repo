SELECT
	P.ID as id,
	P.post_title as title, 
	P.post_name as url, 
    T.name as serie,
	PM.meta_value as embed,
    (SELECT post_title FROM leercomicsonline_db.wp_posts as pf WHERE pf.ID = PM2.meta_value) as image,
	PM3.meta_value as 'prev',
	PM4.meta_value as 'next'
FROM leercomicsonline_db.wp_posts as P
LEFT JOIN leercomicsonline_db.wp_term_relationships as TR ON P.ID = TR.object_id  
LEFT JOIN leercomicsonline_db.wp_terms as T ON TR.term_taxonomy_id = T.term_id
RIGHT JOIN leercomicsonline_db.wp_postmeta as PM ON P.ID = PM.post_id
RIGHT JOIN leercomicsonline_db.wp_postmeta as PM2 ON P.ID = PM2.post_id
RIGHT JOIN leercomicsonline_db.wp_postmeta as PM3 ON P.ID = PM3.post_id
RIGHT JOIN leercomicsonline_db.wp_postmeta as PM4 ON P.ID = PM4.post_id

WHERE 
PM.meta_key = "embed" AND PM2.meta_key = "_thumbnail_id" AND PM3.meta_key = "prev" AND  PM4.meta_key = "next" AND post_type="lens_portfolio"
GROUP BY P.post_title
ORDER BY P.post_date