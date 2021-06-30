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

	
def gb_crawl(titles, spage, epage):
    ids=[]
    start = spage
    end = epage
    for i in range(start, end):
        ids.append(str(i))

    db = {}

    if not os.path.exists('covers'):
            os.makedirs('covers')
    if not os.path.exists('epubs'):
            os.makedirs('epubs')
    if not os.path.exists('epubsimages'):
            os.makedirs('epubsimages')

    def find_title(id):
        r = requests.get("http://gutenberg.org/ebooks/%s"%id)
        soup = bs4.BeautifulSoup(r.content, features="html.parser")
        descriptions = soup.findAll("tr")
        adiv=''
        for d in descriptions:
            if "<th>Title</th>" in str(d):
                adiv = str(d)[25:]
                adiv = adiv[adiv.index('>')+2:adiv.index('<')-1]
        return str(adiv)

    def find_desc(id):
        r = requests.get("http://gutenberg.org/ebooks/%s"%id)
        soup = bs4.BeautifulSoup(r.content, features="html.parser")
        descriptions = soup.findAll("tr")
        desc = {}
        gb_id = '02_'+'%06d'%int(id)
        desc['id']=gb_id
        for d in descriptions:
            if "<th>Title</th>" in str(d):
                adiv = str(d)[25:]
                adiv = adiv[adiv.index('>')+2:adiv.index('<')-1]
                desc['title'] = adiv
            elif "<th>Author</th>" in str(d):
                adiv = str(d)[30:]
                adiv = adiv[adiv.index('>')+1:adiv.index('<')]
                desc['author'] = adiv
            elif "<th>Language</th>" in str(d):
                try:
                    adiv = str(d)
                    adiv = adiv[adiv.index('href'):]
                    adiv = adiv[adiv.index('>')+1:adiv.index('<')]
                    desc['language'] = adiv
                except:
                    adiv = str(d)
                    adiv = adiv[adiv.index('td>')+3:adiv.index('</td')]
                    desc['language'] = adiv
            elif "<th>Subject</th>" in str(d):
                adiv = str(d)
                adiv = adiv[adiv.index('href'):]
                adiv = adiv[adiv.index('>')+2:adiv.index('<')-1]
                if 'tags' not in desc:
                    desc['tags'] = [adiv]
                else:
                    desc['tags'].append(adiv)
            elif "<th>Illustrator</th>" in str(d):
                adiv = str(d)[35:]
                adiv = adiv[adiv.index('>')+1:adiv.index('<')]
                desc['illustrator'] = adiv
        # print(desc)
        db[gb_id] = desc
    for id in ids:
        if find_title(id) not in titles:
            gb_id = '02_'+'%06d'%int(id)
            new_url = "http://gutenberg.org/ebooks/%s.epub.noimages"%id
            try:
                print(new_url)
                web_file=urllib.request.urlopen(new_url)
                local_file=open('epubs/%s.epub' %gb_id, 'wb')
                local_file.write(web_file.read())
                web_file.close()
                local_file.close()
            except:
                print ('skip ', new_url)
            new_url="http://gutenberg.org/ebooks/%s.epub.images"%id
            try:
                print(new_url)
                web_file=urllib.request.urlopen(new_url)
                local_file=open('epubsimages/%s.epub' %gb_id, 'wb')
                local_file.write(web_file.read())
                web_file.close()
                local_file.close()
            except:
                print ('skip ', new_url)
            new_url="https://www.gutenberg.org/cache/epub/" + id +"/pg" + id + ".cover.medium.jpg"
            try:
                print(new_url)
                web_file=urllib.request.urlopen(new_url)
                local_file=open('covers/%s.jpg' %gb_id, 'wb')
                local_file.write(web_file.read())
                web_file.close()
                local_file.close()
            except:
                print ('skip ', new_url)
            find_desc(id)
            titles.append (find_title(id))
        else:
            print ('skip ' + find_title(id))
    return db

# db=dict(sorted(db.items()))
# with open("gutenberg_db.json", "w") as outfile:
# 	json.dump(db, outfile, indent=2, separators=(',', ':'))