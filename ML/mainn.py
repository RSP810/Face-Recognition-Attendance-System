from fastapi import FastAPI, File, UploadFile, Form
import shutil
import uuid
from ML.pipeline import register_student, recognize_students

app = FastAPI()

@app.post("/register")
async def register(student_id: str = Form(...), name: str = Form(...), file: UploadFile = File(...)):
    temp_path = f"temp_register_{uuid.uuid4().hex}.jpg"
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    success, message = register_student(student_id, name, temp_path)
    return {"success": success, "message": message}

@app.post("/recognize")
async def recognize(file: UploadFile = File(...)):
    temp_path = f"temp_recognize_{uuid.uuid4().hex}.jpg"
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    results = recognize_students(temp_path)
    return {"recognized_students": results}
