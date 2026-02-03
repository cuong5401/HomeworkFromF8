import { Student, type StudentI } from "./student";

export interface ClassRoomI {
    name: string;
    students: StudentI[];
    addStudent(student: string): void;
    removeStudent(student: string): void;
    notify(message: string): void;
    postAnnouncement(message: string): void;
}

export class ClassRoom implements ClassRoomI {
    name: string;
    students: StudentI[] = [];

    constructor(name: string) {
        this.name = name;
        console.log(`Đã tạo thành công lơp ${this.name}`);
    }

    addStudent(studentName: string): void {
        const newStudent = new Student(studentName, this.name);
        this.students.push(newStudent);
    }

    removeStudent(studentName: string): void {
        const indexStuden = this.students.findIndex((student) => student.name === studentName);
        if (indexStuden === -1) {
            console.error(`Học sinh ${studentName} chưa được thêm vào lớp ${this.name}`);
            return;
        }
        this.students.splice(indexStuden, 1);
        console.log(`Đã xóa học sinh ${studentName} thành công khỏi lớp ${this.name}`);
    }

    notify(message: string): void {
        if (this.students.length === 0) {
            console.warn(`Lớp ${this.name} chưa có học sinh nào để thông báo`);
            return;
        }
        this.students.forEach((student) => student.update(message));
    }

    postAnnouncement(message: string): void {
        if (!message || message.trim() === "") {
            console.error("Nội dung thông báo không được để trống");
            return;
        }
        console.log(`[Lớp ${this.name}] Đang gửi thông báo: "${message}"`);
        this.notify(message);
    }
}
