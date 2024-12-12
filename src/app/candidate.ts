import { Skill } from "./skill";

export interface Candidate {
  id: number;
  candidateName: string;
  email: string;
  dasId: string;
  skillsIds: number[];
  skills: Skill[];
}
