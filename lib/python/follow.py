#!/usr/bin/env python
# -*- coding: utf-8 -*-

## This python is for the hall of fame follow protocol
import sys, os
sys.path.append(os.path.join(sys.path[0],'py'))

from userinfo import UserInfo
import requests
import time
import random
import json

url_follow = 'https://www.instagram.com/web/friendships/%s/follow/'

## Definition to follow a user based on its id
def follow(user_id):
    """ Send http request to follow """
    global url_follow
    global s
    url_follow = url_follow % (user_id)
    try:
        follow = s.post(url_follow)
        if follow.status_code == 200:
            log_string = "Followed: %s." % (user_id)
            follow_info = {}
            follow_info['status'] = 'success'
            follow_info['id'] = user_id
            follow_json = json.dumps(follow_info)
            print follow_json
            return follow
    except:
        follow_info = {}
        follow_info['status'] = 'error'
        follow_json = json.dumps(follow_info)
        print follow_json
    return False

# Login routine without definition
## Username and password as argument
username = sys.argv[1].lower()
password = sys.argv[2]
user_id = sys.argv[3]

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
        follow(user_id)
    else:
        user_info = {}
        user_info['status'] = 'error' #error in credentials
        user_json = json.dumps(user_info)
        print user_json
else:
    user_info = {}
    user_info['status'] = 'error_connection' #connection error with IG
    user_json = json.dumps(user_info)
    print user_json
