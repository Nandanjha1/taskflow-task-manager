from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status
)

from sqlalchemy.orm import Session

from .. import crud
from ..database import get_db
from ..schemas import (
    TaskCreate,
    TaskResponse,
    TaskStatusUpdate,
    TaskUpdate
)


router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"]
)


@router.get(
    "",
    response_model=list[TaskResponse]
)
def get_all_tasks(
    db: Session = Depends(get_db)
):
    return crud.get_tasks(db)


@router.post(
    "",
    response_model=TaskResponse,
    status_code=status.HTTP_201_CREATED
)
def create_new_task(
    task_data: TaskCreate,
    db: Session = Depends(get_db)
):
    return crud.create_task(
        db,
        task_data
    )


@router.delete(
    "/completed"
)
def clear_completed_tasks(
    db: Session = Depends(get_db)
):
    deleted_count = crud.clear_completed_tasks(db)

    return {
        "message": "Completed tasks cleared successfully.",
        "deleted": deleted_count
    }


@router.get(
    "/{task_id}",
    response_model=TaskResponse
)
def get_single_task(
    task_id: str,
    db: Session = Depends(get_db)
):
    task = crud.get_task(
        db,
        task_id
    )

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found."
        )

    return task


@router.put(
    "/{task_id}",
    response_model=TaskResponse
)
def update_existing_task(
    task_id: str,
    task_data: TaskUpdate,
    db: Session = Depends(get_db)
):
    task = crud.get_task(
        db,
        task_id
    )

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found."
        )

    return crud.update_task(
        db,
        task,
        task_data
    )


@router.patch(
    "/{task_id}/status",
    response_model=TaskResponse
)
def change_task_status(
    task_id: str,
    status_data: TaskStatusUpdate,
    db: Session = Depends(get_db)
):
    task = crud.get_task(
        db,
        task_id
    )

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found."
        )

    return crud.update_task_status(
        db,
        task,
        status_data.status
    )


@router.delete(
    "/{task_id}"
)
def delete_existing_task(
    task_id: str,
    db: Session = Depends(get_db)
):
    task = crud.get_task(
        db,
        task_id
    )

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found."
        )

    crud.delete_task(
        db,
        task
    )

    return {
        "message": "Task deleted successfully."
    }