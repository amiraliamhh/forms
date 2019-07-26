import { IMultichoice } from "../models/questions/multichoice";

export type IQType = 'multichoice'

export interface IQuestion {
    question_type: IQType
    qid: number
}

export interface IResponseGlobalOptions {
    lang?: 'fa'|'en'
}

export interface IStandardResponse {
    error_msg: string|null
    data: any
}

export interface IQuestionBody {
    question_type: IQType
    body: IMultichoice
}
