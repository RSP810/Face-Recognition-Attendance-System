const K = {
  CURRENT_USER: "sa_current_user",
  COURSES: "sa_courses",
  ENROLL: "sa_enrollments", // { [email]: [courseId] }
  ATT: "sa_attendance", // [{courseId, date, present:[emails]}]
};

const load = (k, def) => JSON.parse(localStorage.getItem(k) || JSON.stringify(def));
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));

// --- Auth (mock) ---
export function login(role, email) {
  const user = { role, email };
  save(K.CURRENT_USER, user);
  return user;
}
export function logout() { localStorage.removeItem(K.CURRENT_USER); }
export function currentUser() { return load(K.CURRENT_USER, null); }

// --- Courses ---
export function createCourse(name, facultyEmail) {
  const courses = load(K.COURSES, []);
  const id = Date.now();
  const code = Math.random().toString(36).slice(2, 8).toUpperCase();
  const course = { id, name, code, facultyEmail };
  courses.push(course); save(K.COURSES, courses);
  return course;
}
export function listCoursesByFaculty(facultyEmail) {
  const courses = load(K.COURSES, []);
  return courses.filter(c => c.facultyEmail === facultyEmail);
}
export function findCourseByCode(code) {
  const courses = load(K.COURSES, []);
  return courses.find(c => c.code === code) || null;
}
export function findCourseById(id) {
  const courses = load(K.COURSES, []);
  return courses.find(c => c.id === Number(id)) || null;
}

// --- Enrollments ---
export function joinCourseByCode(studentEmail, code) {
  const enrol = load(K.ENROLL, {});
  const course = findCourseByCode(code);
  if (!course) throw new Error("Invalid course code");
  enrol[studentEmail] = Array.from(new Set([...(enrol[studentEmail]||[]), course.id]));
  save(K.ENROLL, enrol);
  return course;
}
export function enrolledCourses(studentEmail) {
  const enrol = load(K.ENROLL, {});
  const ids = enrol[studentEmail] || [];
  return load(K.COURSES, []).filter(c => ids.includes(c.id));
}

// --- Attendance ---
const todayISO = () => new Date().toISOString().slice(0,10); // YYYY-MM-DD
export function markAttendanceToday(courseId, presentEmails) {
  const att = load(K.ATT, []);
  const date = todayISO();
  // remove existing record for course+date then add fresh one
  const filtered = att.filter(r => !(r.courseId===courseId && r.date===date));
  filtered.push({ courseId, date, present: Array.from(new Set(presentEmails)) });
  save(K.ATT, filtered);
  return filtered.find(r => r.courseId===courseId && r.date===date);
}
export function todaysAttendanceForStudent(studentEmail) {
  const att = load(K.ATT, []);
  const courses = load(K.COURSES, []);
  const enrol = enrolledCourses(studentEmail);
  const ids = new Set(enrol.map(c=>c.id));
  const date = todayISO();
  // build list of today's enrolled courses with attended boolean
  const todays = courses.filter(c => ids.has(c.id)); // assume all enrolled courses had class today (demo)
  return todays.map(c => ({
    id: c.id,
    name: c.name,
    attended: !!att.find(r => r.courseId===c.id && r.date===date && (r.present||[]).includes(studentEmail))
  }));
}
export function todaysRecordForCourse(courseId) {
  const att = load(K.ATT, []);
  const date = todayISO();
  return att.find(r => r.courseId===Number(courseId) && r.date===date) || { courseId:Number(courseId), date, present:[] };
}