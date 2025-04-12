import os
from datetime import datetime
import re

import praw
from dotenv import load_dotenv


class RedditCrawler:

    load_dotenv()

    REDDIT_ID = os.getenv("REDDIT_ID")
    REDDIT_SECRET = os.getenv("REDDIT_SECRET")
    REDDIT_USERNAME = os.getenv("REDDIT_USERNAME")
    REDDIT_PASSWORD = os.getenv("REDDIT_PASSWORD")

    def __init__(self, search_size=50):
        self.id = self.REDDIT_ID
        self.secret = self.REDDIT_SECRET
        self.username = self.REDDIT_USERNAME
        self.password = self.REDDIT_PASSWORD
        self.search_size = search_size
        self.reddit = praw.Reddit(
            client_id=self.id,
            client_secret=self.secret,
            user_agent="bluecat",
            username=self.username,
            password=self.password
        )
        self.reddit.read_only = True

    @staticmethod
    def clean_text(text):
        text = text.replace('\n', ' ').strip()
        return re.sub(r"[^a-zA-Z0-9.,!?\'\"()\-:; ]", "", text)

    def get_crawl_data(self, search_target):
        subreddit = self.reddit.subreddit(search_target)
        crawl_data = []
        for i, post in enumerate(subreddit.hot(limit=self.search_size), start=1):
            post.comments.replace_more(limit=0)
            comments = []
            for comment in post.comments[:3]:
                cleaned_comment = self.clean_text(comment.body)
                comments.append(cleaned_comment)
            crawl_data.append({
                "title": post.title,
                "comments": comments,
                "created_time": datetime.utcfromtimestamp(post.created_utc).strftime('%Y-%m-%d %H:%M:%S'),
                "selftext": post.selftext,
                "subreddit": str(post.subreddit),
            })
        return crawl_data
