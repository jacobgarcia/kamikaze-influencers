#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys, os
sys.path.append(os.path.join(sys.path[0],'py'))

from userinfo import UserInfo
import requests
import time
import random
import json

# Login routine without definition
## Username and password as argument
username = sys.argv[1].lower()
password = sys.argv[2]

# Consts definitions
accept_language = 'ru-RU,ru;q=0.8,en-US;q=0.6,en;q=0.4'
url = 'https://www.instagram.com/'
url_login = 'https://www.instagram.com/accounts/login/ajax/'
user_agent = ("Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 "
              "(KHTML, like Gecko) Chrome/48.0.2564.103 Safari/537.36")
s = requests.Session()

# Routine implementation
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
        ui = UserInfo()
        user_info = ui.get_user_info_by_login(username)
        user_info['status'] = 'success'
        user_json = json.dumps(user_info)
        print user_json
    else:
        user_info = {}
        user_info['status'] = 'error'
        user_json = json.dumps(user_info)
        print user_json
else:
    user_info = {}
    user_info['status'] = 'error_connection'
    user_json = json.dumps(user_info)
    print user_json
