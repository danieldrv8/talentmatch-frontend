import { Candidate } from "./interfaces/candidate";

export interface ApiResponse {
  candidates: Candidate[];
  message: string;
}
