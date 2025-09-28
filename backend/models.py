import uuid
from sqlalchemy.orm import Mapped, mapped_column

from db import Base


class Stadium(Base):
    __tablename__ = "stadiums"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    name: Mapped[str]
    country: Mapped[str]
    capacity: Mapped[int]
    primary_sport: Mapped[str]
