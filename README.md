# Face Recognition Attendance System

This project is a full-stack student attendance system that uses deep learning for face recognition. It automates attendance marking by detecting and recognizing students from classroom photos.

Key features include:

* **Face Detection** using MTCNN to locate faces in images accurately.
* **Face Embedding Extraction** with a pretrained FaceNet model (InceptionResnetV1) to generate unique 512-dimensional vectors for each student’s face.
* **Recognition Pipeline** compares embeddings from classroom photos with registered students’ embeddings to identify attendees.
* **FastAPI Backend Service** exposing REST API endpoints for:

  * `/register` — register student faces by uploading photos and storing their embeddings.
  * `/recognize` — recognize students from classroom photos and return their identities with confidence scores.
* Easy integration with a Java backend that handles database storage and attendance marking.
* Docker support for containerized deployment to ensure consistency across environments.

This system significantly reduces manual effort in attendance by automatically identifying students in photos with high accuracy. It leverages well-established pretrained models, requiring no training from scratch.
