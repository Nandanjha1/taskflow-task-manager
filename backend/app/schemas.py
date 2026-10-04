from datetime import date, datetime
from typing import Literal

from pydantic import (
    BaseModel,
    ConfigDict,
    Field,
    field_validator
)


PriorityType = Literal["low", "medium", "high"]

StatusType = Literal[
    "todo",
    "in-progress",
    "completed"
]


class TaskBase(BaseModel):
    title: str = Field(
        min_length=3,
        max_length=200
    )

    description: str = Field(
        default="",
        max_length=1000
    )

    dueDate: date

    priority: PriorityType = "medium"

    status: StatusType = "todo"

    category: str = Field(
        default="General",
        max_length=100
    )

    @field_validator("title")
    @classmethod
    def validate_title(cls, value):
        value = value.strip()

        if len(value) < 3:
            raise ValueError(
                "Task title must contain at least 3 characters."
            )

        return value

    @field_validator("dueDate")
    @classmethod
    def validate_due_date(cls, value):
        if value < date.today():
            raise ValueError(
                "Due date cannot be in the past."
            )

        return value


class TaskCreate(TaskBase):
    pass


class TaskUpdate(BaseModel):

    title: str | None = Field(
        default=None,
        min_length=3,
        max_length=200
    )

    description: str | None = Field(
        default=None,
        max_length=1000
    )

    dueDate: date | None = None

    priority: PriorityType | None = None

    status: StatusType | None = None

    category: str | None = Field(
        default=None,
        max_length=100
    )

    @field_validator("title")
    @classmethod
    def validate_title(cls, value):
        if value is None:
            return value

        value = value.strip()

        if len(value) < 3:
            raise ValueError(
                "Task title must contain at least 3 characters."
            )

        return value

    @field_validator("dueDate")
    @classmethod
    def validate_due_date(cls, value):
        if value is not None and value < date.today():
            raise ValueError(
                "Due date cannot be in the past."
            )

        return value


class TaskStatusUpdate(BaseModel):
    status: StatusType


class TaskResponse(BaseModel):

    model_config = ConfigDict(
        from_attributes=True
    )

    id: str
    title: str
    description: str

    dueDate: date = Field(
        validation_alias="due_date",
        serialization_alias="dueDate"
    )

    priority: PriorityType
    status: StatusType
    category: str

    createdAt: datetime = Field(
        validation_alias="created_at",
        serialization_alias="createdAt"
    )

    updatedAt: datetime = Field(
        validation_alias="updated_at",
        serialization_alias="updatedAt"
    )