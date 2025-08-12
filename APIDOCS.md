# ML Service API Documentation

## 1. Register Student Face  
**Endpoint:** `/register`  
**Method:** POST  
**Content-Type:** multipart/form-data  

### Parameters:
- `student_id` (string, form field): Unique ID of the student  
- `name` (string, form field): Student's full name  
- `file` (file, form field): Image file containing student's face  

### Response:
```json
{
  "success": true,
  "message": "Student registered"
}
