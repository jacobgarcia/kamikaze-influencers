#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
import requests
import time
import random

# Consts definitions
accept_language = 'ru-RU,ru;q=0.8,en-US;q=0.6,en;q=0.4'
url = 'https://www.instagram.com/'
url_login = 'https://www.instagram.com/accounts/login/ajax/'
user_agent = ("Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 "
              "(KHTML, like Gecko) Chrome/48.0.2564.103 Safari/537.36")
s = requests.Session()

# Login routine without definition
username = sys.argv[1].lower()
password = sys.argv[2]

log_string = 'Trying to login as %s...\n' % (username)
print log_string
s.cookies.update({'sessionid': '', 'mid': '', 'ig_pr': '1',
                       'ig_vw': '1920', 'csrftoken': '',
                       's_network': '', 'ds_user_id': ''})
login_post = {'username': username,
                   'password': password}
s.headers.update({'Accept-Encoding': 'gzip, deflate',
                       'Accept-Language': accept_language,
                       'Connection': 'keep-alive',
                       'Content-Length': '0',
                       'Host': 'www.instagram.com',
                       'Origin': 'https://www.instagram.com',
                       'Referer': 'https://www.instagram.com/',
                       'User-Agent': user_agent,
                       'X-Instagram-AJAX': '1',
                       'X-Requested-With': 'XMLHttpRequest'})
r = s.get(url)
s.headers.update({'X-CSRFToken': r.cookies['csrftoken']})
time.sleep(5 * random.random())
login = s.post(url_login, data=login_post,
                    allow_redirects=True)
s.headers.update({'X-CSRFToken': login.cookies['csrftoken']})
csrftoken = login.cookies['csrftoken']
time.sleep(5 * random.random())

if login.status_code == 200:
    r = s.get('https://www.instagram.com/')
    finder = r.text.find(username)
    if finder != -1:
        login_status = True
        log_string = '%s login success!' % (username)
        print log_string
    else:
        login_status = False
        print 'Login error! Check your login data!'
else:
    print 'Login error! Connection error!'
