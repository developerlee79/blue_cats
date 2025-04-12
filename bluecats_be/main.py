import json

from fastapi import FastAPI, UploadFile, File, HTTPException, Depends, Query
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
import os
from dotenv import load_dotenv

from agent.near_agent import ask_agent_with_trend_data
from scraper.parser.reddit_parser import RedditCrawler
from scraper.refinement.upstage_ai import UpstageDataRefiner
from scraper.trend_data import TrendData
from user.company_info import CompanyStrategy, Base


app = FastAPI()

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)
Base.metadata.create_all(bind=engine)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/refresh")
async def refresh_trend_data(db: Session = Depends(get_db)):
    main_topic = 'Ethereum'
    crawler = RedditCrawler()
    refiner = UpstageDataRefiner()
    topics = refiner.get_research_topic_suggest(main_topic)

    for topic in topics:
        data = crawler.get_crawl_data(topic)

        trend_data = refiner.extract_trend_keywords_from_data(data)

        try:
            trend_data = trend_data.replace('\\', '\\\\')
            trend_data = json.loads(trend_data)
        except json.JSONDecodeError as e:
            print(f"❌ JSON Decode Error: {e}")
            continue

        post = TrendData(
            title=trend_data["title"],
            creation_time=trend_data["creation_time"],
            body=trend_data["body"],
            sentiment=trend_data["sentiment"],
            key_topics_or_keywords=trend_data["key_topics_or_keywords"],
            suggested_marketing_tags=trend_data["suggested_marketing_tags"],
            top_3_comments=trend_data["top_3_comments"]
        )

        db.add(post)
        db.commit()
        db.refresh(post)

    return {"message": "Refresh Complete"}


@app.get("/trend")
async def get_trend_data(
        wallet_address: str = Query(..., description="지갑 주소"),
        db: Session = Depends(get_db)
):
    company = db.query(CompanyStrategy).filter_by(wallet_address=wallet_address).first()
    if not company:
        raise HTTPException(status_code=404, detail="No company strategy found")

    trends = db.query(TrendData)\
               .order_by(TrendData.creation_time.desc())\
               .limit(5)\
               .all()

    if not trends:
        raise HTTPException(status_code=404, detail="No trend data found")

    try:
        ai_response = ask_agent_with_trend_data(trends)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Agent error: {str(e)}")

    return {
        "wallet_address": wallet_address,
        "ai_recommendation": ai_response
    }


@app.post("/register")
async def register_upload_resume(
        wallet_address: str = Query(..., description="지갑 주소"),
        about_file: UploadFile = File(...),
        db: Session = Depends(get_db)
):
    if not about_file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")

    refiner = UpstageDataRefiner()

    try:
        extracted = refiner.extract_info_from_documents(about_file)

        strategy = CompanyStrategy(
            company_name=extracted["company_name"],
            wallet_address=wallet_address,
            product_name=extracted["product_name"],
            core_objectives=extracted["core_objectives"],
            target_audience=extracted["target_audience"],
            industry=extracted["industry"],
            core_keywords=extracted["core_keywords"],
            technologies_used=extracted["technologies_used"],
            business_model=extracted["business_model"],
            notable_quotes=extracted["notable_quotes"]
        )
        db.add(strategy)
        db.commit()
        db.refresh(strategy)

        print(extracted)
        return {"message": "Successfully saved", "id": strategy.id}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=f"Extraction failed: {str(e)}")

