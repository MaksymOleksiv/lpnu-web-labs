import uuid
from pydantic import BaseModel, Field, ConfigDict


class SStadium(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID = Field(..., example="550e8400-e29b-41d4-a716-446655440000")
    name: str = Field(..., example="Wembley Stadium")
    country: str = Field(..., example="England")
    capacity: int = Field(..., example=90000)
    primary_sport: str = Field(..., example="Football")


class SStadiumCreate(BaseModel):
    name: str = Field(..., example="Wembley Stadium")
    country: str = Field(..., example="England")
    capacity: int = Field(..., example=90000)
    primary_sport: str = Field(..., example="Football")