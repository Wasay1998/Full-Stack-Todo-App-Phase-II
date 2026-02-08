import os
from dotenv import load_dotenv

load_dotenv()

DB_TYPE = os.getenv("DB_TYPE", "sqlite")

if DB_TYPE == "sqlite":
    DATABASE_URL = "sqlite:///./todo_app.db"

elif DB_TYPE == "postgresql":
    DATABASE_URL = os.getenv("DATABASE_URL")
    if not DATABASE_URL:
        raise ValueError("DATABASE_URL is required for PostgreSQL")

else:
    raise ValueError("Invalid DB_TYPE. Use 'sqlite' or 'postgresql'")

# JWT config
JWT_SECRET_KEY = os.getenv("BETTER_AUTH_SECRET")
JWT_ALGORITHM = "HS256"
JWT_ACCESS_TOKEN_EXPIRE_MINUTES = 30

# App config
DEBUG = os.getenv("DEBUG", "False").lower() == "true"
APP_TITLE = "Todo Backend API"
APP_VERSION = "1.0.0"
