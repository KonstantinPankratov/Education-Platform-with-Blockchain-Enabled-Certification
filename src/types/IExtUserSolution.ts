import { IUserSolution } from "@/db/models/UserSolution";

export default interface IExtUserSolution extends IUserSolution {
  stdout?: string[]
}