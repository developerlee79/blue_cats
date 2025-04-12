import subprocess
import json
from collections import Counter
from scraper.trend_data import TrendData


def filter_and_extract(trends: list[TrendData]):
    filtered_posts = []
    all_keywords = []

    for post in trends:
        keywords = post.key_topics_or_keywords or []
        comments = post.top_3_comments or []

        if keywords and comments:
            filtered_posts.append({
                "Title": post.title,
                "Created": str(post.creation_time),
                "Keywords": keywords,
                "Sentiment": post.sentiment,
                "SuggestedTags": post.suggested_marketing_tags or [],
                "Comment Summary": comments,
                "Insights": post.body[:300] if post.body else ""
            })
            all_keywords.extend(keywords)

    return filtered_posts, all_keywords


def generate_prompt_for_trend_analysis(trends: list[TrendData], main_keyword: str = "crypto") -> str:
    filtered_posts, all_keywords = filter_and_extract(trends)

    if not filtered_posts:
        return "No valid trend data to analyze."

    keyword_counter = Counter(all_keywords)
    top_keywords = [kw for kw, _ in keyword_counter.most_common(10)]

    system_prompt = (
        "You are a trend analysis expert AI.\n"
        "Analyze the given trend keyword and tweet context data.\n\n"
        "Your tasks:\n"
        "1. List the 8~10 most trending related keywords (sub-trends).\n"
        "2. For each keyword, provide a **1-2 line short explanation** of what it is and why it’s trending.\n"
        "3. In a separate **Overview Section**, summarize the overall trend pattern using these keywords.\n\n"
        "Make the output clear, concise, and structured."
    )

    user_prompt = (
        f"Main keyword: {main_keyword}\n"
        f"Trending sub-keywords: {', '.join(top_keywords)}\n\n"
        f"Filtered tweet data:\n{json.dumps(filtered_posts, indent=2)}"
    )

    return system_prompt + "\n\n" + user_prompt


def ask_agent_with_trend_data(trends: list[TrendData], main_keyword: str = "crypto") -> str:
    prompt = generate_prompt_for_trend_analysis(trends, main_keyword)
    return ask_near_agent(prompt)


def ask_near_agent(prompt: str) -> str:
    process = subprocess.Popen(
        ["nearai", "agent", "interactive", "redsite5429.near/bluecats_agent/0.0.1"],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )

    stdout, stderr = process.communicate(input=prompt.encode("utf-8"))

    if process.returncode != 0:
        raise RuntimeError(f"Agent Error: {stderr.decode('utf-8')}")

    return stdout.decode("utf-8").strip()
