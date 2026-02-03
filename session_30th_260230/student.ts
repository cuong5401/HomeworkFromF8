export interface StudentI {
    name: string;
    update(message: string): void;
}

export class Student implements StudentI {
    name: string;
    constructor(name: string, className: string) {
        this.name = name;
        console.log(`Học sinh ${this.name} được thêm vào lớp ${className}`);
    }
    update(message: string): void {
        console.log(`Học sinh ${this.name} nhận được: ${message}`);
    }
}
