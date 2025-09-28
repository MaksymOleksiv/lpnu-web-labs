from typing import Annotated, List
import uuid
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from db import get_session
from models import Stadium
from schemas import SStadium, SStadiumCreate


router = APIRouter()


@router.get("/stadiums", response_model=List[SStadium])
async def get_stadiums(
    session: Annotated[AsyncSession, Depends(get_session)],
) -> List[SStadium]:
    result = await session.execute(select(Stadium))
    stadiums = result.scalars().all()
    return [SStadium.model_validate(stadium) for stadium in stadiums]


@router.post("/stadiums", response_model=SStadium)
async def create_stadium(
    stadium: SStadiumCreate, session: Annotated[AsyncSession, Depends(get_session)]
) -> SStadium:
    db_stadium = Stadium(
        name=stadium.name,
        country=stadium.country,
        capacity=stadium.capacity,
        primary_sport=stadium.primary_sport,
    )
    session.add(db_stadium)
    await session.commit()
    await session.refresh(db_stadium)
    return SStadium.model_validate(db_stadium)


@router.delete("/stadiums/{stadium_id}", response_model=None)
async def delete_stadium(
    stadium_id: uuid.UUID, session: Annotated[AsyncSession, Depends(get_session)]
) -> None:
    stadium = await session.get(Stadium, stadium_id)
    if stadium:
        await session.delete(stadium)
        await session.commit()
    return {"OK": True}


@router.put("/stadiums/{stadium_id}", response_model=SStadium)
async def update_stadium(
    stadium_id: uuid.UUID,
    stadium: SStadium,
    session: Annotated[AsyncSession, Depends(get_session)],
) -> SStadium:
    result = await session.execute(select(Stadium).filter_by(id=stadium_id))
    db_stadium = result.scalar_one()
    db_stadium.name = stadium.name
    db_stadium.country = stadium.country
    db_stadium.capacity = stadium.capacity
    db_stadium.primary_sport = stadium.primary_sport
    session.add(db_stadium)
    await session.commit()
    await session.refresh(db_stadium)
    return SStadium.model_validate(db_stadium)
