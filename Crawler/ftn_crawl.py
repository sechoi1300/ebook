import json
import manybooks_crawl
import gutenberg_crawl
db = {}

titles = []
manybooks_db = manybooks_crawl.mb_crawl(titles, 0, 0) #startpage-endpage, 24 books per page, starting from most popular books
db.update (manybooks_db)
print (titles)
gutenberg_db = gutenberg_crawl.gb_crawl(titles, 17400, 17410) #startid-endid, 1 book per id, starting from first posted book
db.update (gutenberg_db)
print (titles)

with open("db.json", "w") as outfile:
	json.dump(db, outfile, indent=2, separators=(',', ':'))