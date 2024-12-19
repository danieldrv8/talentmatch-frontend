import { CandidateSkill } from "./candidate-skill";
import { Skill } from "./skill";

export interface Candidate {
  id: number;
  candidateName: string;
  email: string;
  dasId: string;
  candidateSkills: CandidateSkill[];
  skills?: Skill[];
  isSelected?: boolean;
}
