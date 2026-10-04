from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .database import Base, engine
from .routers import tasks

# Import models so SQLAlchemy knows about the tables
from . import models


Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="TaskFlow API",
    description="REST API for TaskFlow Task Management System",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.FRONTEND_URL
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


app.include_router(
    tasks.router,
    prefix="/api"
)


@app.get("/")
def root():
    return {
        "message": "TaskFlow API is running."
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }