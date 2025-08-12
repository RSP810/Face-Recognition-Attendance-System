import torch
import numpy as np
from facenet_pytorch import MTCNN, InceptionResnetV1
from PIL import Image

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

mtcnn = MTCNN(keep_all=True, device=device)
resnet = InceptionResnetV1(pretrained='vggface2').eval().to(device)

# In-memory DB substitute: student_id -> {"name": str, "embedding": np.array}
student_db = {}

def register_student(student_id, name, image_path):
    img = Image.open(image_path)
    face_crops, _ = mtcnn(img, return_prob=True)
    if face_crops is None:
        return False, "No face detected"
    # Assume first face is the student
    embedding = resnet(face_crops[0].to(device)).detach().cpu().numpy()
    student_db[student_id] = {"name": name, "embedding": embedding}
    return True, "Student registered"

def recognize_students(image_path, threshold=0.8):
    img = Image.open(image_path)
    face_crops, _ = mtcnn(img, return_prob=True)
    results = []
    if face_crops is None:
        return results
    embeddings = resnet(face_crops.to(device)).detach().cpu().numpy()
    for emb in embeddings:
        best_match = None
        best_score = -1
        for sid, data in student_db.items():
            score = np.dot(emb, data["embedding"]) / (np.linalg.norm(emb) * np.linalg.norm(data["embedding"]))
            if score > best_score:
                best_score = score
                best_match = sid
        if best_score >= threshold:
            results.append({"id": best_match, "name": student_db[best_match]["name"], "confidence": float(best_score)})
    return results
