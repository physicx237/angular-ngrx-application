import { State } from "../domain/store/types/state.interface";

type Documents = Omit<State, 'categories'>

export type DocumentState = {
    data: Documents
}