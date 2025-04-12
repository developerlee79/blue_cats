from sqlalchemy import Column, Integer, String, Text, DateTime, JSON
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class TrendData(Base):
    __tablename__ = "trend_data"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False)
    creation_time = Column(DateTime, nullable=False)
    body = Column(Text, nullable=True)

    sentiment = Column(String, nullable=False)
    key_topics_or_keywords = Column(JSON, nullable=True)
    suggested_marketing_tags = Column(JSON, nullable=True)

    top_3_comments = Column(JSON, nullable=True)
