import { State } from "../domain/store/types/state.interface";

type Categories = Omit<State, 'documents'>

export type CategoryState = {
    data: Categories
}