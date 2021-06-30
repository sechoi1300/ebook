#https://github.com/p45/gutenberg-epub-downloader
import requests
import bs4
import urllib.request
import os
import re
import urllib
from gutenberg.query import get_etexts
from gutenberg.query import get_metadata
from gutenberg.acquire import get_metadata_cache
from gutenberg.query.api import MetadataExtractor
import json
import mechanize
from bs4 import BeautifulSoup
import http.cookiejar
import robobrowser

def mb_crawl(titles, start, end):
	db = {}

	url = "https://manybooks.net/mnybks-login-form"
	browser = robobrowser.RoboBrowser()
	browser.open(url)

	form = browser.get_form('mb-user-login-form')
	form['email'] = 'manycrawl@protonmail.com'
	form['pass'] = 'ftnpass1'
	browser.submit_form(form)
	#browser.open("https://manybooks.net/titles/brontechetext98janey11.html")
	#print(browser.parsed)

	
	ids=[]
	startpage = start
	endpage = end
	for n in range(startpage, endpage+1):
		f=urllib.request.urlopen("https://manybooks.net/search-book?search=&ga_submit=bsf%3As8tLH1FxbtBJjXx&language=All&sticky=All&created_op=%3C&created%5Bvalue%5D=0&created%5Bmin%5D=&created%5Bmax%5D=&author_uid_op=%3E%3D&author_uid%5Bvalue%5D=0&author_uid%5Bmin%5D=&author_uid%5Bmax%5D=&sort_by=field_downloads&page=" + str(n))
		for line in f:
			li = str(line)
			if "href=\"/titles" in li:
				l = li[li.index("/titles"):li.index(".html")+5]
				if l not in ids:
					ids.append(l)

		f.close()
	# print (ids)
	if not os.path.exists('epubs'):
			os.makedirs('epubs')
	if not os.path.exists('covers'):
			os.makedirs('covers')
	for id in ids:
		browser.open("https://manybooks.net" + id)
		b = str(browser.parsed)
		desc = {}
		bl_id = ''
		if "/books/get/" in b:
			bl = b[b.index("/books/get/")+11:]
			bl_id = bl[:bl.index("name=")-4]
			print (id, bl_id)
			browser.open ("https://manybooks.net/books/get/" + bl_id + "/2")
			with open("epubs/01_" + bl_id + ".epub", "wb") as output:
				output.write(browser.response.content)
			bl_id = '01_' + bl_id
			desc['id'] = bl_id
		elif "/book-files/" in b:
			bl = b[b.index("/book-files/")+12:]
			bl_id = bl[:bl.index("name=")-2]
			print (id, bl_id)
			browser.open ("https://manybooks.net/books/get/" + bl_id + "/2")
			with open("epubs/01_" + bl_id + ".epub", "wb") as output:
				output.write(browser.response.content)
			bl_id = '01_' + bl_id
			desc['id'] = bl_id
		if "itemprop=\"name\"" in b:
			bl = b[b.index("itemprop=\"name\"")+16:]
			bl = bl[:bl.index("</div>")]
			desc['title'] = bl
			titles.append(bl)
		if "itemprop=\"author\"" in b:
			bl = b[b.index("itemprop=\"author\"")+18:]
			bl = bl[:bl.index("</div>")-4]
			desc['author'] = bl
		if "itemprop=\"image\"" in b:
			bl = b[b.index("itemprop=\"image\"")+22:]
			bl = bl[:bl.index("itok")-1]
			browser.open ("https://manybooks.net" + bl)
			with open("covers/" + bl_id + ".jpg", "wb") as output:
				output.write(browser.response.content)
			desc['image'] = bl_id + ".jpg"
		if "field field--name-field-published-year field--type-integer field--label-hidden field--item" in b:
			bl = b[b.index("field field--name-field-published-year field--type-integer field--label-hidden field--item")+92:]
			bl = bl[:bl.index("</div>")]
			desc['year'] = bl
		if "field field--name-field-pages field--type-integer field--label-hidden field--item" in b:
			bl = b[b.index("field field--name-field-pages field--type-integer field--label-hidden field--item")+83:]
			bl = bl[:bl.index("</div>")]
			desc['pages'] = bl
		if "field field--name-field-downloads field--type-integer field--label-hidden field--item" in b:
			bl = b[b.index("field field--name-field-downloads field--type-integer field--label-hidden field--item")+87:]
			bl = bl[:bl.index("</div>")]
			desc['downloads'] = bl
		if "field field--name-field-description field--type-string-long field--label-hidden field--item" in b:
			bl = b[b.index("field field--name-field-description field--type-string-long field--label-hidden field--item")+93:]
			bl = bl[:bl.index("</div>")]
			desc['synopsis'] = bl
			#print (bl)
		if "field field--name-field-isbn field--type-string field--label-hidden field--item" in b:
			bl = b[b.index("field field--name-field-isbn field--type-string field--label-hidden field--item")+81:]
			bl = bl[:bl.index("</div>")]
			desc['ISBN'] = bl
		if "field field--name-field-genre field--type-entity-reference field--label-hidden field--items" in b:
			bl = b[b.index("field field--name-field-genre field--type-entity-reference field--label-hidden field--items")+93:]
			bl = bl[:bl.index("</section>")]
			genres = []
			while ("field--item") in bl:
				bl = bl[bl.index("field--item")+13:]
				blf = bl[bl.index(">")+1:]
				blf = blf[:blf.index("<")]
				genres.append(blf)
			desc['tags'] = genres
		db[bl_id] = desc

	# db=dict(sorted(db.items()))
	# with open("db.json", "w") as outfile:
	# 	json.dump(db, outfile, indent=2, separators=(',', ':'))

	return db