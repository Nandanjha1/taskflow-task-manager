from sqlalchemy import delete, select
from sqlalchemy.orm import Session
from .models import Task
from .schemas import TaskCreate, TaskUpdate

def get_tasks(db: Session):
    statement = (
        select(Task)
        .order_by(Task.created_at.desc())
    )
    return db.scalars(statement).all()

def get_task(
    db: Session,
    task_id: str
):
    statement = select(Task).where(
        Task.id == task_id
    )
    return db.scalar(statement)

def create_task(
    db: Session,
    task_data: TaskCreate
):
    task = Task(
        title=task_data.title,
        description=task_data.description,
        due_date=task_data.dueDate,
        priority=task_data.priority,
        status=task_data.status,
        category=task_data.category
    )
    db.add(task)
    db.commit()
    db.refresh(task)

    return task

def update_task(
    db: Session,
    task: Task,
    task_data: TaskUpdate
):
    data = task_data.model_dump(
        exclude_unset=True
    )
    if "dueDate" in data:
        data["due_date"] = data.pop("dueDate")
    for field, value in data.items():
        setattr(task, field, value)
    db.commit()
    db.refresh(task)
    return task

def update_task_status(
    db: Session,
    task: Task,
    status: str
):
    task.status = status
    db.commit()
    db.refresh(task)
    return task

def delete_task(
    db: Session,
    task: Task
):
    db.delete(task)
    db.commit()

def clear_completed_tasks(db: Session):
    statement = delete(Task).where(
        Task.status == "completed"
    )
    result = db.execute(statement)
    db.commit()
    return result.rowcount