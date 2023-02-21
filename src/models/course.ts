import {Entity} from "typeorm";

@Entity({
    name: "COURSES"
})
export class Course {
    id:number;
    seqNo:number;
    title:string;
    iconUrl:string;
    longDescription:string;
    category:string;
}