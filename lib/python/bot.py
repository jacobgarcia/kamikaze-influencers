#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys, os
sys.path.append(os.path.join(sys.path[0],'py'))

import pymongo
from pymongo import MongoClient
import datetime
from instabot import InstaBot
from check_status import check_status
from feed_scanner import feed_scanner
from unfollow_protocol import unfollow_protocol
from follow_protocol import follow_protocol
import time
import json

print 'Number of arguments:', len(sys.argv), 'arguments.'
print 'Argument List:', str(sys.argv)
print 'Tag List:', (sys.argv[3]).split(",")

# Connect to mongo database
client = MongoClient()
db = client.influencers
users = db.users

# User blacklist array - Convert it to a dictionary
user_array =  (sys.argv[8]).split(",")
user_dict = {}

# Empty array definition
empty_arr = ['']
if user_array != empty_arr:
    for k in user_array:
        user_dict[k] = ''

# The limit for liking is equal to 1000, for following is 300 and for comments is 50. Else IG could ban the account specified
## The tags must be splitted since all of them come in a single String
### Uses ternary operator to enable or disable feature based on boolean labels
bot = InstaBot(login=sys.argv[1], password=sys.argv[2],
               like_per_day= (1000 if sys.argv[4] == "true" else 0),
               comments_per_day= (50 if sys.argv[6] == "true" else 0),
               tag_list=((sys.argv[3]).split(",") if sys.argv[3] != '' else ['love', 'instagood','photooftheday','beautiful','tbt','happy','cute','fashion','followme','me','follow','like4like','picoftheday','selfie','summer']),
               tag_blacklist=(sys.argv[7]).split(","),
               user_blacklist=user_dict,
               max_like_for_one_tag=50,
               follow_per_day=(300 if sys.argv[5] == "true" else 0),
               follow_time=1*60,
               unfollow_per_day= (150 if sys.argv[10] == "true" else 0),
               unfollow_break_min= (15 if sys.argv[10] == "true" else 0),
               unfollow_break_max= (30 if sys.argv[10] == "true" else 0),
               log_mod=0,
               proxy='',
               # Use unwanted username list to block users which have username contains one of this string
               ## Doesn't have to match entirely example: mozart will be blocked because it contains *art
               ### freefollowers will be blocked because it contains free
               unwanted_username_list=(sys.argv[9]).split(","),
               unfollow_whitelist=['example_user_1','example_user_2'])
end_time = json.loads(json.dumps(users.find_one({"username":sys.argv[1]}, {"timeEnd":1, "_id":0})))
current_time = int(datetime.datetime.now().strftime("%s")) * 1000

while (current_time < int(end_time['timeEnd'])):
    end_time = json.loads(json.dumps(users.find_one({"username":sys.argv[1]}, {"timeEnd":1, "_id":0})))
    current_time = int(datetime.datetime.now().strftime("%s")) * 1000
    #print("# MODE 0 = ORIGINAL MODE BY LEVPASHA")
    #print("## MODE 1 = MODIFIED MODE BY KEMONG")
    #print("### MODE 2 = ORIGINAL MODE + UNFOLLOW WHO DON'T FOLLOW BACK")
    #print("#### MODE 3 = MODIFIED MODE : UNFOLLOW PEOPLE WHO DON'T FOLLOW BACK BASED ON RECENT FEED ONLY")
    #print("##### MODE 4 = MODIFIED MODE : FOLLOW PEOPLE BASED ON RECENT FEED ONLY")
    #print("###### MODE 5 = MODIFIED MODE : JUST UNFOLLOW EVERYBODY, EITHER YOUR FOLLOWER OR NOT")

    ################################
           ##  WARNING   ###
    ################################

    # DON'T USE MODE 5 FOR A LONG PERIOD. YOU RISK YOUR ACCOUNT FROM GETTING BANNED
    ## USE MODE 5 IN BURST MODE, USE IT TO UNFOLLOW PEOPLE AS MANY AS YOU WANT IN SHORT TIME PERIOD

    mode = 0

    #print("You choose mode : %i" %(mode))
    #print("CTRL + C to cancel this operation or wait 30 seconds to start")
    #time.sleep(30)

    if mode == 0 :
        bot.new_auto_mod()

    elif mode == 1 :
        check_status(bot)
        while bot.self_following - bot.self_follower > 200:
            unfollow_protocol(bot)
            time.sleep(10*60)
            check_status(bot)
        while bot.self_following - bot.self_follower < 400:
            while len(bot.user_info_list) <50 :
                feed_scanner(bot)
                time.sleep(5*60)
                follow_protocol(bot)
                time.sleep(10*60)
                check_status(bot)

    elif mode == 2 :
        bot.bot_mode = 1
        bot.new_auto_mod()

    elif mode == 3 :
        unfollow_protocol(bot)
        time.sleep(10*60)

    elif mode == 4 :
        feed_scanner(bot)
        time.sleep(60)
        follow_protocol(bot)
        time.sleep(10*60)

    elif mode == 5 :
        bot.bot_mode=2
        unfollow_protocol(bot)

    else :
        print ("Wrong mode!")
