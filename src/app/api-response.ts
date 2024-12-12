import { Candidate } from "./candidate";

export interface ApiResponse {
  candidates: Candidate[];
  message: string;
}
