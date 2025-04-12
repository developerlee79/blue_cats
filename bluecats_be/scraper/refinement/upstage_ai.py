import json

from dotenv import load_dotenv
from openai import OpenAI
import os
import base64

class UpstageDataRefiner:

    load_dotenv()

    UPSTAGE_API_KEY = os.getenv("UPSTAGE_API_KEY")

    def extract_info_from_documents(self, image):
        client = OpenAI(
            api_key=self.UPSTAGE_API_KEY,
            base_url="https://api.upstage.ai/v1/information-extraction"
        )

        base64_data = self.encode_file_to_base64(image)

        extraction_response = client.chat.completions.create(
            model="information-extract",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "image_url",
                            "image_url": {"url": f"data:image/pdf;base64,{base64_data}"}
                        }
                    ]
                }
            ],
            response_format={
                "type": "json_schema",
                "json_schema": {
                    "name": "company_strategy_schema",
                    "schema": {
                        "type": "object",
                        "properties": {
                            "company_name": {
                                "type": "string",
                                "description": "The name of the company described in the document"
                            },
                            "product_name": {
                                "type": "string",
                                "description": "The name of the main product or service"
                            },
                            "core_objectives": {
                                "type": "array",
                                "description": "Key goals or missions of the company",
                                "items": {"type": "string"}
                            },
                            "target_audience": {
                                "type": "array",
                                "description": "Intended users or customer types for the product",
                                "items": {"type": "string"}
                            },
                            "industry": {
                                "type": "string",
                                "description": "The industry or market the company belongs to"
                            },
                            "core_keywords": {
                                "type": "array",
                                "description": "Important keywords representing company direction or focus",
                                "items": {"type": "string"}
                            },
                            "technologies_used": {
                                "type": "array",
                                "description": "Major technologies or frameworks mentioned in the document",
                                "items": {"type": "string"}
                            },
                            "business_model": {
                                "type": "string",
                                "description": "Description of how the company plans to generate revenue"
                            },
                            "notable_quotes": {
                                "type": "array",
                                "description": "Key sentences that express the vision or mission",
                                "items": {"type": "string"}
                            }
                        },
                        "required": [
                            "company_name",
                            "product_name",
                            "core_objectives",
                            "target_audience",
                            "industry",
                            "core_keywords",
                            "technologies_used",
                            "business_model",
                            "notable_quotes"
                        ]
                    }
                }
            }
        )

        data = extraction_response.choices[0].message.content
        parsed = json.loads(data)
        return parsed

    @staticmethod
    def encode_file_to_base64(file):
        content = file.file.read()
        return base64.b64encode(content).decode("utf-8")

    def get_research_topic_suggest(self, topic, num=5):
        client = OpenAI(
            api_key=self.UPSTAGE_API_KEY,
            base_url="https://api.upstage.ai/v1"
        )

        prompt = f"""
            I'm planning a marketing campaign about: "{topic}".
        
            Please suggest {num} of the most relevant and active subreddits (just the names, no /r/) where users are discussing this topic.
        
            Return ONLY a JSON array (e.g. ["CryptoCurrency", "Bitcoin", "ethdev"]) with no explanation, no extra text, and no formatting. The output must be a valid JSON array.
        """

        try:
            response = client.chat.completions.create(
                model="solar-mini",
                messages=[
                    {"role": "system",
                     "content": "You are a helpful assistant that recommends subreddit names for a given marketing topic."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.5
            )

            content = response.choices[0].message.content.strip()
            subreddits = json.loads(content)
            return subreddits
        except Exception as e:
            print(f"[ERROR] Subreddit recommandation fail: {e}")
            return []

    def extract_trend_keywords_from_data(self, research_data):
        client = OpenAI(
            api_key=self.UPSTAGE_API_KEY,
            base_url="https://api.upstage.ai/v1"
        )

        try:
            response = client.chat.completions.create(
                model="solar-mini",
                messages=[
                    {
                        "role": "system",
                        "content": "You are a helpful assistant that extracts structured marketing data from Reddit posts."
                    },
                    {
                        "role": "user",
                        "content": f"""Here is a Reddit post:

                        {research_data}

                        Please extract and return a single JSON object with the following keys:

                        - title
                        - creation_time  
                        - body
                        - sentiment
                        - key_topics_or_keywords  
                        - suggested_marketing_tags
                        - top_3_comments
                        
                        **Return only subreddit names that actually exist on Reddit.** 
                        Return only **one valid JSON object**, no explanations or additional text."""
                    }
                ],
                temperature=0.7
            )

            return response.choices[0].message.content.strip()
        except Exception as e:
            print(f"[ERROR] extract trend keywords error: {e}")
            return None
