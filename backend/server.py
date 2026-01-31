from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class ServiceRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    whatsapp: Optional[str] = None
    vehicleType: str
    brand: str
    model: Optional[str] = None
    selectedIssues: List[str]
    location: str
    urgency: str
    status: str = "new"
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ServiceRequestCreate(BaseModel):
    name: str
    phone: str
    whatsapp: Optional[str] = None
    vehicleType: str
    brand: str
    model: Optional[str] = None
    selectedIssues: List[str]
    location: str
    urgency: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "KB Car Clinic API"}

@api_router.post("/service-requests", response_model=ServiceRequest)
async def create_service_request(input: ServiceRequestCreate):
    request_dict = input.model_dump()
    request_obj = ServiceRequest(**request_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = request_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.service_requests.insert_one(doc)
    return request_obj

@api_router.get("/service-requests", response_model=List[ServiceRequest])
async def get_service_requests():
    # Exclude MongoDB's _id field from the query results
    requests = await db.service_requests.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for req in requests:
        if isinstance(req.get('timestamp'), str):
            req['timestamp'] = datetime.fromisoformat(req['timestamp'])
    
    return requests

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()