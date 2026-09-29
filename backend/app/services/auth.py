from sqlalchemy import or_, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import hash_password, verify_password
from app.models.user import User


async def create_user(
    db: AsyncSession,
    *,
    username: str,
    email: str,
    password: str,
) -> User:
    result = await db.execute(
        select(User).where(
            or_(
                User.username == username,
                User.email == email,
            )
        )
    )

    if result.scalar_one_or_none() is not None:
        raise ValueError("Username or email already exists.")

    user = User(
        username=username,
        email=email,
        hashed_password=hash_password(password),
    )

    db.add(user)

    try:
        await db.commit()
    except IntegrityError:
        await db.rollback()
        raise ValueError("Username or email already exists.")

    await db.refresh(user)

    return user


async def authenticate_user(
    db: AsyncSession,
    *,
    username: str,
    password: str,
) -> User | None:
    result = await db.execute(
        select(User).where(User.username == username)
    )

    user = result.scalar_one_or_none()

    if user is None:
        return None

    if not verify_password(password, user.hashed_password):
        return None

    return user