from sqlalchemy import Column, Integer, String, Text, JSON
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class CompanyStrategy(Base):
    __tablename__ = "company_info"

    id = Column(Integer, primary_key=True, index=True)
    wallet_address = Column(String, nullable=False, index=True)
    company_name = Column(String, nullable=False)
    product_name = Column(String, nullable=False)
    core_objectives = Column(JSON, nullable=False)
    target_audience = Column(JSON, nullable=False)
    industry = Column(String, nullable=False)
    core_keywords = Column(JSON, nullable=False)
    technologies_used = Column(JSON, nullable=False)
    business_model = Column(Text, nullable=False)
    notable_quotes = Column(JSON, nullable=False)
