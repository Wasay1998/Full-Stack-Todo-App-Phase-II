from sqlmodel import create_engine, Session
from typing import Generator
from .config import DATABASE_URL

engine = create_engine(DATABASE_URL, echo=True)

def get_session() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session
