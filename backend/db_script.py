from models import Stadium
from db import get_session


async def seed_data():
    async for session in get_session():
        stadiums = [
            Stadium(
                name="Wembley Stadium",
                country="England",
                capacity=90000,
                primary_sport="Football",
            ),
            Stadium(
                name="Camp Nou",
                country="Spain",
                capacity=99354,
                primary_sport="Football",
            ),
            Stadium(
                name="Melbourne Cricket Ground",
                country="Australia",
                capacity=100024,
                primary_sport="Cricket",
            ),
            Stadium(
                name="Maracanã Stadium",
                country="Brazil",
                capacity=78838,
                primary_sport="Football",
            ),
            Stadium(
                name="Yankee Stadium",
                country="USA",
                capacity=47309,
                primary_sport="Baseball",
            ),
            Stadium(
                name="Tokyo Dome",
                country="Japan",
                capacity=55000,
                primary_sport="Baseball",
            ),
            Stadium(
                name="Allianz Arena",
                country="Germany",
                capacity=75000,
                primary_sport="Football",
            ),
            Stadium(
                name="Old Trafford",
                country="England",
                capacity=74879,
                primary_sport="Football",
            ),
        ]

        session.add_all(stadiums)
        await session.commit()
        session.close()
    return


if __name__ == "__main__":
    import asyncio

    asyncio.run(seed_data())
