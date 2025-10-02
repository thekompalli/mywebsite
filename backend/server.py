from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import datetime
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import httpx


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactMessage(BaseModel):
    name: str
    email: str
    company: str = ""
    message: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

@api_router.post("/send-email")
async def send_contact_email(contact: ContactMessage):
    try:
        # Email configuration - you can set these in environment variables
        smtp_server = "smtp.gmail.com"
        smtp_port = 587
        sender_email = os.environ.get('SENDER_EMAIL', 'your-email@gmail.com')
        sender_password = os.environ.get('SENDER_PASSWORD', 'your-app-password')
        recipient_email = "thekompalli@gmail.com"
        
        # Create message
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = recipient_email
        msg['Subject'] = f"Portfolio Contact from {contact.name}{' - ' + contact.company if contact.company else ''}"
        
        # Create email body
        body = f"""
New contact form submission from your portfolio website:

Name: {contact.name}
Email: {contact.email}
Company: {contact.company if contact.company else 'Not provided'}

Message:
{contact.message}

---
This email was sent from your portfolio contact form.
Reply directly to: {contact.email}
"""
        
        msg.attach(MIMEText(body, 'plain'))
        
        # Send email using Gmail SMTP
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.send_message(msg)
        
        logger.info(f"Email sent successfully from {contact.email}")
        return {"success": True, "message": "Email sent successfully"}
        
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        return {"success": False, "message": f"Failed to send email: {str(e)}"}

@api_router.get("/news")
async def get_news():
    try:
        # Try NewsAPI.org first
        news_api_key = os.environ.get('NEWS_API_KEY')
        if news_api_key and news_api_key != 'demo':
            async with httpx.AsyncClient() as client:
                try:
                    response = await client.get(
                        f"https://newsapi.org/v2/everything?q=\"artificial intelligence\" OR \"machine learning\" OR \"data science\" OR \"deep learning\" OR \"neural networks\" OR \"AI\" OR \"ML\"&language=en&sortBy=publishedAt&pageSize=15&apiKey={news_api_key}"
                    )
                    if response.status_code == 200:
                        data = response.json()
                        return {"success": True, "articles": data.get("articles", [])}
                except Exception as e:
                    logger.warning(f"NewsAPI failed: {e}")
        
        # Fallback to GNews.io
        gnews_api_key = os.environ.get('GNEWS_API_KEY')
        if gnews_api_key and gnews_api_key != 'demo':
            async with httpx.AsyncClient() as client:
                try:
                    response = await client.get(
                        f"https://gnews.io/api/v4/search?q=\"artificial intelligence\" OR \"machine learning\" OR \"data science\" OR \"deep learning\" OR \"neural networks\" OR \"AI\" OR \"ML\"&lang=en&country=us&max=15&apikey={gnews_api_key}"
                    )
                    if response.status_code == 200:
                        data = response.json()
                        # Transform GNews format to match NewsAPI format
                        articles = []
                        for article in data.get("articles", []):
                            articles.append({
                                "title": article.get("title", ""),
                                "description": article.get("description", ""),
                                "url": article.get("url", ""),
                                "urlToImage": article.get("image", ""),
                                "publishedAt": article.get("publishedAt", ""),
                                "source": {"name": article.get("source", {}).get("name", "")}
                            })
                        return {"success": True, "articles": articles}
                except Exception as e:
                    logger.warning(f"GNews failed: {e}")
        
        raise HTTPException(status_code=503, detail="No valid API keys provided or all news services are unavailable")
        
    except Exception as e:
        logger.error(f"Error fetching news: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch news")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
